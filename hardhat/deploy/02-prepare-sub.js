const { FUNDING_AMOUNT } = require("../helper-hardhat-config")
const create = require("../scripts/custom/create")
const updateFrontend = require("../scripts/helpers/update-frontend")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const functionsConsumer = await deployments.get("FunctionsConsumer")

  // Create & fund subscription
  const subId = await create({
    amount: FUNDING_AMOUNT,
    contract: functionsConsumer.address,
  })

  // Write contract address and subscription ID to file for the frontend
  await updateFrontend(functionsConsumer.address, subId)
}

module.exports.tags = ["all", "prepare"]
