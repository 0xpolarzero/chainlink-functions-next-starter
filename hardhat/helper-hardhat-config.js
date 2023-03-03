const subConfig = require("./sub-config.json")

const developmentChains = ["hardhat", "localhost"]

// Subscription
const FUNDING_AMOUNT = "1" // 1.0 LINK

// Request
const REQUEST_ARGS = ["1000000", "450"]
const GAS_LIMIT = 100_000
const SIMULATE = true

module.exports = {
  subConfig,
  developmentChains,
  FUNDING_AMOUNT,
  GAS_LIMIT,
  REQUEST_ARGS,
  SIMULATE,
}
