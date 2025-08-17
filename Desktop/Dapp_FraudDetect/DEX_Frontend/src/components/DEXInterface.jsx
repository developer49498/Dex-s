import React, { useState, useEffect } from 'react'
import { 
  Search, Wallet, User, Activity, BarChart3, 
  CheckCircle, XCircle, AlertCircle, ArrowRight, 
  RefreshCw, Users, Globe, Network, Clock, Hash, LogOut, Chrome 
} from 'lucide-react'
import { ethers } from 'ethers'
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

const DEXInterface = () => {

  console.log('DEXInterface rendered');

  const [searchQuery, setSearchQuery] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [googleUser, setGoogleUser] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null);

  // Hardhat blockchain provider
  const provider = new ethers.JsonRpcProvider("http://3.110.170.91:9545");

  // Filter transactions for connected wallet
  const userTransactions = walletAddress
    ? transactions.filter(
        tx =>
          tx.from?.toLowerCase() === walletAddress.toLowerCase() ||
          tx.to?.toLowerCase() === walletAddress.toLowerCase()
      )
    : transactions;

  // Connect to Hardhat blockchain & get first account
  const connectWallet = async () => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0].address);

        const balance = await provider.getBalance(accounts[0].address);
        console.log("Connected Wallet:", accounts[0].address);
        console.log("Balance:", ethers.formatEther(balance), "ETH");
      } else {
        alert("No accounts found in Hardhat node");
      }
    } catch (error) {
      console.error("Error connecting to Hardhat node:", error);
    }
  };

  // Fetch last 20 blocks with transactions
  const fetchTransactions = async () => {
    try {
      const latestBlock = await provider.getBlockNumber();
      let txs = [];

      for (let i = latestBlock; i > latestBlock - 20 && i >= 0; i--) {
        const block = await provider.getBlock(i, true); // include txs
        if (block && block.transactions.length > 0) {
          txs = [...txs, ...block.transactions.map(tx => ({
            id: tx.hash,
            transactionId: tx.hash,
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            timestamp: new Date(block.timestamp * 1000).toLocaleTimeString(),
            successful: true, // Hardhat local txs usually succeed
            fraudulentActivity: 'None detected', // placeholder for ML/fraud check
            amount: tx.value ? ethers.formatEther(tx.value) + " ETH" : "0 ETH",
            from: tx.from,
            to: tx.to,
            gasUsed: tx.gasLimit.toString(),
            blockNumber: block.number.toString(),
            network: "Hardhat",
            gasPrice: tx.gasPrice ? ethers.formatUnits(tx.gasPrice, "gwei") + " Gwei" : "N/A"
          }))];
        }
      }

      setTransactions(txs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Auto-load transactions when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchTransactions();
    }
  }, [walletAddress]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction)
    setShowDetails(true)
  }

  const getStatusIcon = (successful, fraudulentActivity) => {
    if (fraudulentActivity && fraudulentActivity !== 'None detected') {
      return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-red/80 animate-pulse">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
      )
    } else {
      return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-green/80">
          <CheckCircle className="w-5 h-5 text-accent-green" />
        </div>
      )
    }
  }

  const getFraudulentStatus = (fraudulentActivity) => {
    if (fraudulentActivity === 'None detected') {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green/30">
          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
          <span className="text-accent-green text-xs font-medium">Safe</span>
        </div>
      )
    } else {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-red/20 border border-accent-red/30 animate-pulse">
          <AlertCircle className="w-4 h-4 text-accent-red mr-2" />
          <span className="text-accent-red text-xs font-bold">EMERGENCY</span>
        </div>
      )
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: Activity },
  ]

  return (
  <GoogleOAuthProvider clientId="869741573471-ivjll1hmeb9batk0j8bgumkviu08nsb2.apps.googleusercontent.com">
      <div className="min-h-screen bg-gradient-mesh p-6">
      {/* Header */}
      <header className="glass-card rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center space-x-6">
            <button
              className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
              onClick={connectWallet}
            >
              <Wallet className="w-5 h-5" />
              <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
              <span className="text-white/70 text-sm font-mono">Network: Hardhat</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-accent-yellow via-accent-purple to-accent-pink bg-clip-text text-transparent">
              DEX
            </h1>
          </div>
          <div className="flex items-center justify-end space-x-4">
            {googleUser ? (
              <button
                className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                onClick={() => {
                  googleLogout();
                  setGoogleUser(null);
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <GoogleLogin
                onSuccess={credentialResponse => {
                  setGoogleUser(credentialResponse);
                  console.log(credentialResponse);
                }}
                onError={() => console.log('Login Failed')}
              />
            )}
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Enter wallet address or tx hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-modern w-full px-4 py-3 rounded-xl"
          />
          <button onClick={handleSearch} disabled={isLoading} className="btn-primary px-6 py-3 rounded-xl">
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold 
              ${activeTab === tab.id ? 'bg-gradient-to-r from-navy-600 to-navy-800 text-white' : 'bg-dark-quaternary/60 text-white/60'}`}
            >
              <Icon className="w-4 h-4 mr-1" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="flex space-x-8">
        <div className="flex-1">
          {activeTab === 'overview' && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {userTransactions.slice(0, 5).map((tx) => (
                  <div 
                    key={tx.id}
                    onClick={() => handleTransactionClick(tx)}
                    className="flex items-center justify-between p-4 bg-dark-quaternary/30 rounded-xl hover:bg-dark-quaternary/50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(tx.successful, tx.fraudulentActivity)}
                      <div>
                        <p className="text-white font-mono text-sm">{tx.transactionId.substring(0,16)}...</p>
                        <p className="text-white/60 text-xs">{tx.network}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{tx.amount}</p>
                      <p className="text-white/60 text-xs">{tx.timestamp}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Transaction History</h3>
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th>Status</th><th>Tx Hash</th><th>Network</th><th>Amount</th><th>Time</th><th>Security</th>
                  </tr>
                </thead>
                <tbody>
                  {userTransactions.map((tx) => (
                    <tr key={tx.id} onClick={() => handleTransactionClick(tx)} className="hover:bg-dark-quaternary/50 cursor-pointer">
                      <td>{getStatusIcon(tx.successful, tx.fraudulentActivity)}</td>
                      <td>{tx.transactionId.substring(0,16)}...</td>
                      <td>{tx.network}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.date} {tx.timestamp}</td>
                      <td>{getFraudulentStatus(tx.fraudulentActivity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction Details */}
        {showDetails && selectedTransaction && (
          <div className="w-96 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Transaction Details</h3>
              <button onClick={() => setShowDetails(false)}>
                <XCircle className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white font-mono break-all">{selectedTransaction.transactionId}</p>
            <p className="text-white">From: {selectedTransaction.from}</p>
            <p className="text-white">To: {selectedTransaction.to}</p>
            <p className="text-white">Amount: {selectedTransaction.amount}</p>
          </div>
        )}
      </div>
    </div>
  </GoogleOAuthProvider>
  )
}

export default DEXInterface
