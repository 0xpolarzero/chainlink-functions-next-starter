# Chainlink Functions Next Starter - hardhat

The following steps will explain how to deploy the contracts & create and fund a subscription to be able to interact with the DON. Any modification to the consumer contract or the source code will be reflected in the frontend when deploying.

**Do not use any backsticks (``) in the source code (`./request-example.js`), as it will prematurely end the code in the frontend.**

## How to setup

1. Clone the repo

```bash
git clone git@github.com:0xpolarzero/chainlink-functions-next-starter.git
```

2. Install dependencies

```bash
cd chainlink-functions-next-starter/hardhat
yarn
```

3. Copy the `.env.example` file to `.env` and fill in the required variables

```bash
cp .env.example .env
```

4. Customize the source code in `./request-example.js` and the consumer contract in `./contracts/FunctionsConsumer.sol` to your needs.

5. Update the parameters for the request and the funding amount in `./helper-hardhat-config.js`.

## How to use

The deployment setup is different from the one provided in the Chainlink repository, to allow for a more streamlined experience. You can still use the commands detailed in the [Chainlink Functions repository](https://github.com/smartcontractkit/functions-hardhat-starter-kit).

### Deploy and fund a subscription

```bash
# Set ETHERSCAN_API_KEY/POLYGONSCAN_API_KEY in .env if you would like to verify the contract
yarn hardhat deploy --network network_name_here
# If you don't want to update the files in the frontend (abi, address, subId):
yarn hardhat deploy --network network_name_here --tags main
```

This will deploy the contract, create and fund a subscription. The contract address and subscription ID will be written in `./sub-config.json`.

### Execute a request

```bash
yarn hardhat run scripts/helpers/request.js --network network_name_here
```

### Modifications

Any modifications can be made to the consumer contract or the source code. The frontend will automatically update when deploying (only if including the second script, with no tags or with the `all` tag).

If you would like to update the frontend without deploying the contract, you can run the following command:

```bash
yarn hardhat deploy --network network_name_here --tags update
```
