const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");
require("dotenv").config();

const web3 = new Web3(process.env.STORY_RPC_URL);

const abiPath = path.join(__dirname, "contracts_Counter_sol_Counter.abi");
const bytecodePath = path.join(__dirname, "contracts_Counter_sol_Counter.bin");
const outputPath = path.join(__dirname, "etherscan_links.txt");

async function deployToStory() {
  try {
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    const bytecode = fs.readFileSync(bytecodePath, "utf8");

    const account = web3.eth.accounts.privateKeyToAccount(
      process.env.PRIVATE_KEY
    );

    const contract = new web3.eth.Contract(abi);

    const deployTx = contract.deploy({
      data: bytecode,
      arguments: [2, account.address],
    });

    const deployData = deployTx.encodeABI();
    const gas = await deployTx.estimateGas();
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: account.address,
      data: deployData,
      gas: gas,
      gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.PRIVATE_KEY
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const links = `
        # Contract Address
    https://sepolia.etherscan.io/address/${receipt.contractAddress}

    # Deployment Transaction
    https://sepolia.etherscan.io/tx/${receipt.transactionHash}
    `;

    fs.writeFileSync(outputPath, links, "utf8");
    console.log(`STORY 배포 완료 link : ${outputPath}`);
  } catch (error) {
    console.log(`배포 중 에러 발생 : ${error.message}`);
  }
}

deployToStory();
