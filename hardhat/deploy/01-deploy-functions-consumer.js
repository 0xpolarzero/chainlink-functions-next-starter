const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { networkConfig } = require("../network-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const functionsOracleAddress = !developmentChains.includes(network.name)
    ? networkConfig[network.name]["functionsOracleProxy"]
    : null

  if (!functionsOracleAddress) {
    throw new Error(
      `No functions oracle address found in this deployment network (${network.name}), skipping deployment`
    )
  }

  const functionsConsumer = await deploy("FunctionsConsumer", {
    from: deployer,
    args: [functionsOracleAddress],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract...")
    await verify(functionsConsumer.address, [functionsOracleAddress])
  }
}

module.exports.tags = ["all", "functions-consumer", "main"]
