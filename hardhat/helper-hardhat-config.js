const fs = require("fs")

const requestConfig = require("./Functions-request-config.js")
const sourceCode = fs.readFileSync("./request-example.js")
const subConfig = require("./sub-config.json")

const ReturnType = {
  uint: "uint256",
  uint256: "uint256",
  int: "int256",
  int256: "int256",
  string: "string",
  bytes: "Buffer",
  Buffer: "Buffer",
}

/**
 * @notice Update these
 */

// Subscription
const FUNDING_AMOUNT = "1" // 1.0 LINK

// Request
const GAS_LIMIT = 100_000
const SIMULATE = true
const REQUEST_ARGS = ["45", "10000", "1"]
const RETURN_TYPE = ReturnType.uint256
const SECRETS = { apiKey: process.env.COINMARKETCAP_API_KEY ?? "" }

/**
 * @notice Don't change these
 */

const developmentChains = ["hardhat", "localhost"]

const getParams = () => ({
  sub: subConfig,
  fundingAmount: FUNDING_AMOUNT,
  gasLimit: GAS_LIMIT,
  requestGas: 1_500_000,
  simulate: SIMULATE,
  // Will be passed to build the request config
  args: REQUEST_ARGS,
  source: sourceCode,
  secrets: SECRETS,
  returnType: RETURN_TYPE,
})

module.exports = {
  retrieveRequestConfig: requestConfig,
  getParams,
  developmentChains,
}
