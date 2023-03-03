const { ethers, network } = require("hardhat")
const fs = require("fs")
const { sourceLocation } = require("../../helper-hardhat-config")

const frontendConstantsFolder = "../frontend/app/api/request/constants/"
const frontendConfigFile = `${frontendConstantsFolder}networkMapping.json`
const frontendAbiFolder = `${frontendConstantsFolder}abi/`
const sourceFile = sourceLocation
const localConfigFile = "./sub-config.json"

module.exports = async function (contractAddress, subId) {
  if (!contractAddress) {
    console.log("No contract address provided, only updating source code")
    await updateSource()
    return
  }

  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend config")
    await updateConfig(contractAddress, subId)
    await updateAbi(contractAddress)
    await updateSource()
  } else {
    console.log("UPDATE_FRONT_END not set, skipping update of frontend config")
  }

  updateLocalConfig(contractAddress, subId)
}

const updateConfig = async (contractAddress, subId) => {
  const frontendConfig = JSON.parse(fs.readFileSync(frontendConfigFile))
  frontendConfig[network.name] = {
    contractAddress,
    subId,
  }

  fs.writeFileSync(frontendConfigFile, JSON.stringify(frontendConfig, null, 2))
}

const updateAbi = async (contractAddress) => {
  const functionsConsumer = await ethers.getContractAt("FunctionsConsumer", contractAddress)
  fs.writeFileSync(
    `${frontendAbiFolder}FunctionsConsumer.json`,
    functionsConsumer.interface.format(ethers.utils.FormatTypes.json)
  )
}

const updateSource = async () => {
  const source = fs.readFileSync(sourceFile, "utf8")
  fs.writeFileSync(`${frontendConstantsFolder}source.js`, "export default source = `" + source + "`")
}

const updateLocalConfig = async (contractAddress, subId) => {
  const localConfig = JSON.parse(fs.readFileSync(localConfigFile))
  localConfig[network.name] = {
    contractAddress,
    subId,
  }

  fs.writeFileSync(localConfigFile, JSON.stringify(localConfig, null, 2))
}
