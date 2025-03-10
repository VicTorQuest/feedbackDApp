# Feedback DApp

A decentralized application (DApp) that allows users to submit and view feedback on the blockchain. Built with Solidity, Hardhat, Ethers.js, and deployed on the Sepolia testnet.

## Features
- Users can submit feedback on the blockchain.
- Feedback is stored in a smart contract and retrieved in real-time.
- Users can connect their MetaMask wallet to interact with the DApp.

## Tech Stack
- **Solidity** – Smart contract development
- **Hardhat** – Development environment for Ethereum
- **Ethers.js** – Interfacing with the blockchain
- **HTML, CSS, JavaScript** – Frontend development

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MetaMask browser extension
- Hardhat installed globally:
  ```sh
  npm install -g hardhat
  ```

### Clone the Repository
```sh
git clone https://github.com/VicTorQuest/feedbackDApp.git
cd feedbackDApp
```

### Install Dependencies
```sh
npm install
```

### Compile the Smart Contract
```sh
npx hardhat compile
```

### Deploy to Sepolia Testnet
1. Create a `.env` file in the project root and add your **Alchemy/QuickNode RPC URL** and **private key**:
    ```env
    SEPOLIA_RPC_URL=<YOUR_SEPOLIA_RPC_URL>
    PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
    ```
2. Run the deployment script:
    ```sh
    npx hardhat run scripts/deploy.js --network sepolia
    ```
3. The contract address will be displayed in the terminal.

### Move ABI to Frontend
```sh
mkdir -p frontend/artifacts
cp artifacts/contracts/Feedback.sol/Feedback.json frontend/artifacts/
```

### Run the Frontend
```sh
npx serve frontend
```

## How to Use
1. Open the DApp in your browser.
2. Connect your MetaMask wallet.
3. Submit feedback and view previous submissions on the blockchain.

## Troubleshooting
- **`window.ethereum` returns undefined:** Ensure MetaMask is installed and the browser supports it.
- **CORS error when loading `app.js`:** Serve the frontend using an HTTP server like `serve`.
- **Timestamp conversion error:** Ensure `fb.timestamp` is converted using `Number(fb.timestamp) * 1000`.

## Author
Developed by **[VicTorQuest](https://github.com/VicTorQuest)**.

