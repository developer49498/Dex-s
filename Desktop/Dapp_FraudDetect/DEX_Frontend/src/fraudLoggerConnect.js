import { ethers } from "ethers";
import contractAbi from "./FraudLoggerABI.json";

async function getFraudLoggerContract() {
  // Request access to the user's Ethereum account
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create a provider and signer (ethers v6)
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Deployed contract address
  const contractAddress = "0x7D369EeBb531A7EEaDEA3133f451b5a354F72368";

  // Create contract instance
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
}

// Example: Call setReporter (onlyOwner)
async function setReporter(reporterAddress, value) {
  const contract = await getFraudLoggerContract();
  const tx = await contract.setReporter(reporterAddress, value);
  await tx.wait();
  return tx;
}

// Example: Call logFraud (must be reporter)
async function logFraud({
  txHash,
  sender,
  score,
  fraudType,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut
}) {
  const contract = await getFraudLoggerContract();
  const tx = await contract.logFraud(
    txHash,
    sender,
    score,
    fraudType,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut
  );
  await tx.wait();
  return tx;
}

export { getFraudLoggerContract, setReporter, logFraud };



