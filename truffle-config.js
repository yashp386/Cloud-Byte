
const path = require("path");
require("dotenv").config(); // if you're using environment variables
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Use 8545 if using Ganache CLI
      network_id: "*", // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",   
      settings: {
        optimizer: {
          enabled: true,  
          runs: 200,
        },
      },
    },
  },
};
