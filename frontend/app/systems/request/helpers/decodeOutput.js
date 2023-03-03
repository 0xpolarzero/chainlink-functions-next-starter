const decodeOutput = (result, returnType) => {
  let decodedOutput
  if (returnType && returnType !== "Buffer") {
    switch (returnType) {
      case "uint256":
        decodedOutput = BigInt("0x" + result.slice(2).slice(-64))
        break
      case "int256":
        decodedOutput = signedInt256toBigInt("0x" + result.slice(2).slice(-64))
        break
      case "string":
        decodedOutput = Buffer.from(result.slice(2), "hex").toString()
        break
      default:
        const end = returnType
        throw new Error(`unused expectedReturnType ${end}`)
    }
  }
  return decodedOutput
}

const signedInt256toBigInt = (hex) => {
  const binary = BigInt(hex).toString(2).padStart(256, "0")
  // if the first bit is 0, number is positive
  if (binary[0] === "0") {
    return BigInt(hex)
  }
  return -(BigInt(2) ** BigInt(255)) + BigInt(`0b${binary.slice(1)}`)
}

module.exports = decodeOutput
