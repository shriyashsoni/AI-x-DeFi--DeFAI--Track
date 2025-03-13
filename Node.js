const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const contractAbi = require('./DeFiAICreditSystem.json');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const CONTRACT_ADDRESS = "0x724E34FC6284deCf28596e4a11b32ed9781Ba22F";
const provider = new ethers.providers.JsonRpcProvider("YOUR_INFURA_ALCHEMY_RPC_URL");
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, provider);

app.get('/credit-score/:user', async (req, res) => {
    try {
        const score = await contract.getCreditScore(req.params.user);
        res.json({ creditScore: score.toNumber() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
