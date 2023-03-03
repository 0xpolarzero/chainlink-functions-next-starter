const {
  TWITTER_VERIFIER,
  SUB_ID,
  TWITTER_USERNAME,
  ETHEREUM_ADDRESS,
} = require('../helper-hardhat-config');
const requestConfig = require('../functions/Functions-request-config');
// If you want the console confirmations & simulation
// const request = require('../tasks/request');
// If you don't want the console confirmations & simulation
const request = require('../tasks/recklessRequest');

const executeRequest = async (username, address) => {
  const config = requestConfig(username, address);
  const response = await request(
    {
      contract: TWITTER_VERIFIER,
      subid: SUB_ID,
      // gaslimit: optional
    },
    config,
  );

  /*
  If used with recklessRequest.js, it should return
  response = {
    result: {
      hex: 'result_in_hex',
      decoded: 'result_as_string',
    },
    billing: {
      transmissionCost: 'transmission_cost',
      baseFee: 'base_fee',
      totalCost: 'total_cost',
    },
    error: true / false,
  };
  */

  // response.result.decoded will be a string in the format:
  // result,username,address

  const fields = ['result', 'username', 'address'];
  const obj = response.result.decoded.split(',').reduce((acc, cur, i) => {
    acc[fields[i]] = cur;
    return acc;
  }, {});

  return {
    data: obj,
    billing: response.billing,
    error: response.error,
  };
};

executeRequest(TWITTER_USERNAME, ETHEREUM_ADDRESS)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
