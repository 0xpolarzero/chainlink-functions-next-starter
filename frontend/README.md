# Chainlink Functions Next Starter - frontend

The following will explain how to setup the frontend, **after having deployed the contracts, and followed [all the previous steps](https://github.com/0xpolarzero/chainlink-functions-next-starter/tree/main/hardhat)**.

## How to setup

1. Clone the repo

```bash
git clone git@github.com:0xpolarzero/chainlink-functions-next-starter.git
```

2. Install dependencies

```bash
cd chainlink-functions-next-starter/frontend
yarn
```

3. Copy the `.env.example` file to `.env` and fill in the required variables

```bash
cp .env.example .env
```

4. Update the parameters in `./app/systems/constants/index.js`.

5. Make any changes to the frontend (see `./app/components/Main/Request.jsx` for the request example, and for customizing the arguments).

6. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

This is a personal adaptation of Chainlink Functions in a different environment, which means that it is highly prone to errors. Please keep in mind that everything in this repository is intended for testing purposes.
