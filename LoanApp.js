import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbi from '../artifacts/contracts/DeFiAICreditSystem.json'; // Ensure ABI is correctly referenced

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

export default function LoanApp() {
    const [creditScore, setCreditScore] = useState(0);
    const [loanAmount, setLoanAmount] = useState('');
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadAccount() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);
                fetchCreditScore(accounts[0]);
            }
        }
        loadAccount();
    }, []);

    async function fetchCreditScore(user) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, provider);
            const score = await contract.getCreditScore(user);
            setCreditScore(score.toNumber());
        } catch (error) {
            console.error("Error fetching credit score:", error);
        }
    }

    async function requestLoan() {
        if (!loanAmount || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
            alert("Please enter a valid loan amount.");
            return;
        }

        setLoading(true);
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
            const tx = await contract.requestLoan(ethers.utils.parseEther(loanAmount));
            await tx.wait();
            fetchCreditScore(account);
        } catch (error) {
            console.error("Loan request failed", error);
            alert("Transaction failed.");
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>AI-Powered DeFi Loan System</h1>
            <p>Credit Score: {creditScore}</p>
            <input type="text" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
            <button onClick={requestLoan} disabled={loading}>
                {loading ? "Processing..." : "Request Loan"}
            </button>
        </div>
    );
}
