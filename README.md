### **📜 DeFAI: AI-Powered DeFi Credit & Loan System**
🚀 **Built for Flare x Google Verifiable AI Hackathon**  

#### **🔗 Overview**
DeFAI is a **decentralized, AI-powered credit scoring and loan system** that leverages smart contracts to provide verifiable loans on the blockchain. It integrates **Chainlink oracles** for real-time price feeds and stablecoin transactions, ensuring a transparent and trustless lending system.

---

## **⚡ Features**
✅ **Decentralized Loan System** – Get instant loans with verifiable AI-based credit scores  
✅ **Stablecoin Transactions** – Loans issued and repaid using ERC-20 stablecoins  
✅ **Credit Score Mechanism** – AI calculates borrower risk and adjusts lending conditions  
✅ **Chainlink Oracles** – Fetches live price data for accurate loan calculations  
✅ **Smart Contract Security** – Built using Solidity & OpenZeppelin  

---

## **🛠 Tech Stack**
- **Solidity** – Smart contract development  
- **Ethereum / Flare Blockchain** – Deployed on EVM-compatible networks  
- **Chainlink** – Real-time price feeds  
- **React + Next.js** – Frontend  
- **Ethers.js** – Blockchain interactions  
- **IPFS / Web3 Storage** – Decentralized storage (optional)  

---

## **🚀 Setup Instructions**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_GITHUB/defai-credit-system.git
cd defai-credit-system
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env.local` file in the root directory and add:  
```
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
NEXT_PUBLIC_CHAINLINK_ORACLE=CHAINLINK_PRICE_FEED_ADDRESS
```

### **4️⃣ Compile and Deploy Smart Contracts**
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

### **5️⃣ Start the Frontend**
```bash
npm run dev
```

---

## **📜 Smart Contract Overview**
### **💰 Loan Contract (`DeFiAICreditSystem.sol`)**
Handles loan issuance, repayments, and credit score tracking.
```solidity
function requestLoan(uint256 amount) public;
function repayLoan(uint256 index) public;
function getCreditScore(address user) public view returns (uint256);
```

---

## **📸 Screenshots**
### 🏦 Loan Dashboard  
![Loan Dashboard](https://via.placeholder.com/600x300?text=Loan+Dashboard)  

### 📊 Credit Score Tracking  
![Credit Score](https://via.placeholder.com/600x300?text=Credit+Score+System)  

---

## **🛡 Security Considerations**
- Smart contracts audited for vulnerabilities  
- Uses OpenZeppelin libraries for security  
- Chainlink oracles prevent price manipulation  

---

## **📜 License**
This project is **MIT Licensed**.  

**Made with ❤️ for Flare x Google Verifiable AI Hackathon**  

