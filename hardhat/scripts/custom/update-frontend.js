const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontendConfigFile = "../frontend/src/constants/networkMapping.json"
const frontendAbiFolder = "../frontend/src/constants/abi/"

module.exports = async function (contractAddress, subId) {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend config")
    await updateConfig(contractAddress, subId)
    await updateAbi(contractAddress)
  } else {
    console.log("UPDATE_FRONT_END not set, skipping update of frontend config")
  }
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
