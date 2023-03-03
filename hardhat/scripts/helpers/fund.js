const { network, ethers } = require("hardhat")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")
const { getParams } = require("../../helper-hardhat-config")

const FUND_AMOUNT = "1" // 1 LINK

const fund = async () => {
  if (network.name === "hardhat") {
    throw Error("This command cannot be used on a local hardhat chain.  Specify a valid network.")
  }

  const { subId: subscriptionId } = getParams().sub[network.name]
  const linkAmount = FUND_AMOUNT

  const RegistryFactory = await ethers.getContractFactory(
    "contracts/dev/functions/FunctionsBillingRegistry.sol:FunctionsBillingRegistry"
  )
  const registry = await RegistryFactory.attach(networkConfig[network.name]["functionsBillingRegistryProxy"])

  // Check that the subscription is valid
  let preSubInfo
  try {
    preSubInfo = await registry.getSubscription(subscriptionId)
  } catch (error) {
    if (error.errorName === "InvalidSubscription") {
      throw Error(`Subscription ID "${subscriptionId}" is invalid or does not exist`)
    }
    throw error
  }

  // Convert LINK to Juels
  const juelsAmount = ethers.utils.parseUnits(linkAmount)
  console.log(`Funding subscription ${subscriptionId} with ${ethers.utils.formatEther(juelsAmount)} LINK`)

  const LinkTokenFactory = await ethers.getContractFactory("LinkToken")
  const linkToken = await LinkTokenFactory.attach(networkConfig[network.name].linkToken)

  const accounts = await ethers.getSigners()
  const signer = accounts[0]

  // Ensure sufficient balance
  const balance = await linkToken.balanceOf(signer.address)
  if (juelsAmount.gt(balance)) {
    throw Error(
      `Insufficient LINK balance. Trying to fund subscription with ${ethers.utils.formatEther(
        juelsAmount
      )} LINK, but wallet only has ${ethers.utils.formatEther(balance)}.`
    )
  }

  // Fund the subscription with LINK
  const fundTx = await linkToken.transferAndCall(
    networkConfig[network.name]["functionsBillingRegistryProxy"],
    juelsAmount,
    ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
  )

  console.log(`Waiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${fundTx.hash} to be confirmed...`)
  await fundTx.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

  const postSubInfo = await registry.getSubscription(subscriptionId)

  console.log(
    `\nSubscription ${subscriptionId} has a total balance of ${ethers.utils.formatEther(postSubInfo[0])} LINK`
  )
}

fund()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
