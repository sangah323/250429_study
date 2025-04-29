let web3;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    alert("MetaMask가 설치되어있지 않습니다.");
  }
});

const loadABI = async () => {
  const { data } = await axios.get("contracts_Counter_sol_Counter.abi");
  return data;
};

// 컨트랙트 준비
const prepareContract = async () => {
  const contractAddress = document.querySelector("#account").value;
  const resultDiv = document.querySelector("#result");

  if (!contractAddress) {
    resultDiv.innerHTML = "컨트랙트 주소를 입력해주세요.";
    throw new Error("컨트랙트 주소 없음");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const account = window.ethereum.selectedAddress;
  const abi = await loadABI();
  const contract = new web3.eth.Contract(abi, contractAddress);

  return { account, contract, resultDiv };
};

// Wallet Connect => CA 보여줌
const connect = async () => {
  const resultDiv = document.getElementById("result");

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    resultDiv.innerHTML = `Contract Address : ${address}`;
  } catch (error) {
    console.log(`Wallet Connect 중 에러 발생 : ${error.message}`);
  }
};

// 현재 카운트
const getCount = async () => {
  try {
    const { account, contract, resultDiv } = await prepareContract();
    const count = await contract.methods.getCount().call();

    resultDiv.innerHTML = `COUNT : ${count}`;
  } catch (error) {
    console.log(`getCount() 에러 발생 : ${error.message}`);
  }
};

// +1
const increment = async () => {
  try {
    const { account, contract, resultDiv } = await prepareContract();

    const tx = await contract.methods.increment().send({ from: account });

    const count = await contract.methods.getCount().call();

    resultDiv.innerHTML = `COUNT : ${count} / Hash : ${tx.transactionHash}`;
  } catch (error) {
    console.log(`increment() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `increment() 에러 발생 : ${error.message}`;
  }
};

// a + b
const sum = async () => {
  try {
    const { account, contract, resultDiv } = await prepareContract();

    const numberA = document.querySelector("#numberA").value;
    const numberB = document.querySelector("#numberB").value;
    const a = Number(numberA);
    const b = Number(numberB);

    const result = await contract.methods.sum(a, b).call();

    resultDiv.innerHTML = `SUM RESULT : ${result}`;
  } catch (error) {
    console.log(`SUM() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `SUM() 에러 발생 : ${error.message}`;
  }
};

// count > target
const isOver = async () => {
  try {
    const { account, contract, resultDiv } = await prepareContract();

    const number = document.querySelector("#numberA").value;
    const target = Number(number);

    const result = await contract.methods.isOver(target).call();

    resultDiv.innerHTML = `RESULT : ${result}`;
  } catch (error) {
    console.log(`isOver() 에러 발생 : ${error.message}`);
    resultDiv.innerHTML = `isOver() 에러 발생 : ${error.message}`;
  }
};
