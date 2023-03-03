# Chainlink Functions Next Starter

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Notes](#notes)
4. [Contributing](#contributing)
5. [Links](#links)

# Overview

A Next.js starter for quickly spinning up Chainlink Functions in a frontend environment.

All the code for this app (both frontend and contracts) is based on the Chainlink Functions repository, but has been adjusted to work with Next.js, in a non-hardhat environment.

**This is not an official Chainlink repository, or a production-ready application.**

Everything is subject to my own interpretation, and is not guaranteed to be fully functional nor best optimized. It is only intended to be used as a starting point for quickly testing out Chainlink Functions with a frontend.

For any information on Chainlink Functions, please refer to the [official documentation](https://docs.chain.link/chainlink-functions). You can request beta access [here](https://chain.link/functions).

# Getting Started

This repository sets up both a Next.js frontend and a Hardhat environment for deploying the contracts. Here are the detailed steps to get started:

1. Follow the instructions in `hardhat/README.md` to deploy the contracts, create and fund a subscription to be able to interact with the DON. Any modification to the consumer contract or the source code will be reflected in the frontend when deploying.

2. Follow the instructions in `frontend/README.md` to set up the frontend environment and the required environment variables.

You can always follow the commands detailed [in the official repository](https://github.com/smartcontractkit/functions-hardhat-starter-kit#steps) for deploying, managing subscriptions, and making requests.

# Notes

- After completing the steps above and filling in the required environment variables, you should be able to interact with the oracle network. The current implementation will use the DON to compute expansive operations, and will return the result to the contract.

- Note that any additional variables can be added from the contract, either before or after making the request. This can enable more complex use cases, such as mixing off-chain and on-chain during the request.

- You can find a similar example of a frontend interacting with Chainlink Functions [here](https://github.com/0xpolarzero/cross-chain-ERC20-balance-verification): a cross-chain token-gated system, which authorizes users to interact with a smart contract based on their token balance on multiple chains.

# Contributing

If you would like to contribute to this repository, please feel free to open a PR or an issue. I will try to review and merge as soon as possible.

I am open to any suggestion, question, or feedback. Please feel free to reach out to me on [Twitter](https://twitter.com/0xpolarzero).

# Links

- [Chainlink Functions Starter Kit](https://github.com/smartcontractkit/functions-hardhat-starter-kit)

- [Chainlink Functions (request beta access here)](https://chain.link/functions)

- [Chainlink Functions Documentation](https://docs.chain.link/chainlink-functions)

- [Functions community examples](https://usechainlinkfunctions.com/)
