import { ethers } from "ethers";
import fetch from "node-fetch";
// Function to send transaction data to /predict_fraud
async function predictFraud(transactionData) {
  try {
    const response = await fetch("https://dex-9vfo.onrender.com/predict_fraud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData)
    });
    const result = await response.json();
    console.log("Fraud prediction result:", result);
    return result;
  } catch (err) {
    console.error("Error calling /predict_fraud:", err);
  }
}
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.WebSocketProvider(process.env.WSS_PROVIDER)

console.log("Listening to mempool transactions...");

provider.on("pending", async (txHash) => {
  setTimeout(async () => {
    try {
      const tx = await provider.getTransaction(txHash);
      if (!tx) return;
      if (tx.value > 0n) {
        console.log(`Pending TX: ${txHash} from ${tx.from} → ${tx.to}`);
       
        const transactionData = {
          wallet_address: tx.from,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          token_pair: "ETH/???", 
          amount: Number(tx.value) / 1e18, 
          total_value_locked_usd: 0, 
          liquidity_change: 0, 
          price_usd: 0, 
          price_change: 0, 
          gasPrice: Number(tx.gasPrice || 0),
          gasUsed: Number(tx.gasLimit || 0),
          value: Number(tx.value) / 1e18,
          from_address: tx.from,
          to_address: tx.to
        };
        await predictFraud(transactionData);
      }
    } catch (err) {
      console.log("Error fetching transaction:", err.code);
    }
  }, 500); 
});
