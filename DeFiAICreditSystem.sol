// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DeFiAICreditSystem {
    address public owner;
    IERC20 public stablecoin;
    AggregatorV3Interface public priceFeed;

    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interest;
        uint256 dueDate;
        bool repaid;
    }

    mapping(address => Loan[]) public loans;
    mapping(address => uint256) public creditScores;

    event LoanRequested(address indexed borrower, uint256 amount, uint256 interest);
    event LoanRepaid(address indexed borrower, uint256 amount);

    constructor(address _stablecoin, address _priceFeed) {
        owner = msg.sender;
        stablecoin = IERC20(_stablecoin);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function requestLoan(uint256 amount) public {
        require(amount > 0, "Loan amount must be greater than zero");
        uint256 interest = (amount * 5) / 100; // 5% interest
        uint256 dueDate = block.timestamp + 30 days;
        
        loans[msg.sender].push(Loan(msg.sender, amount, interest, dueDate, false));
        require(stablecoin.transfer(msg.sender, amount), "Loan transfer failed");

        emit LoanRequested(msg.sender, amount, interest);
    }

    function repayLoan(uint256 index) public {
        require(index < loans[msg.sender].length, "Invalid loan index");
        Loan storage loan = loans[msg.sender][index];
        require(!loan.repaid, "Loan already repaid");
        require(block.timestamp <= loan.dueDate, "Loan overdue");
        
        require(stablecoin.transferFrom(msg.sender, address(this), loan.amount + loan.interest), "Repayment failed");
        loan.repaid = true;
        creditScores[msg.sender] += 10; // Increase credit score on successful repayment

        emit LoanRepaid(msg.sender, loan.amount);
    }

    function getCreditScore(address user) public view returns (uint256) {
        return creditScores[user];
    }
}
