import React, { useState, useEffect } from 'react'
import { Search, Wallet, User, TrendingUp, AlertTriangle, CheckCircle, XCircle, Activity, BarChart3, Shield, Zap, Globe, Network, Clock, Hash, ArrowRight, RefreshCw, Edit3, LogOut, Users, Chrome, AlertCircle } from 'lucide-react'
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

  // Filter transactions for the connected wallet
  const userTransactions = walletAddress
    ? transactions.filter(
        tx =>
          tx.from?.toLowerCase() === walletAddress.toLowerCase() ||
          tx.to?.toLowerCase() === walletAddress.toLowerCase()
      )
    : transactions;
  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User rejected wallet connection");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };


  // Mock transaction data
  useEffect(() => {
    // Mock transactions, including a fraudulent transaction for the connected wallet
    const mockTransactions = [
      {
        id: 'TX006',
        transactionId: '0xfraudbeef...',
        date: '2024-01-18',
        timestamp: '17:00:00',
        successful: true, // Mark as successful
        fraudulentActivity: 'EMERGENCY ALERT', // Force fraudulent status
        amount: '5.0 ETH',
        from: '0xFd9EbB184C893F3cadc4C134FDCdf4c742E3c838',
        to: '0xabcdef1234567890',
        gasUsed: '30000',
        blockNumber: '18456792',
        network: 'Ethereum',
        gasPrice: '30 Gwei'
      },
      {
        id: 'TX005',
        transactionId: '0xfeedbeef...',
        date: '2024-01-17',
        timestamp: '16:00:00',
        successful: true,
        fraudulentActivity: 'None detected',
        amount: '4.2 ETH',
        from: '0xFd9EbB184C893F3cadc4C134FDCdf4c742E3c838',
        to: '0xdef456...',
        gasUsed: '21000',
        blockNumber: '18456791',
        network: 'Ethereum',
        gasPrice: '22 Gwei'
      },
      {
        id: 'TX004',
        transactionId: '0xdeadbeef...',
        date: '2024-01-16',
        timestamp: '15:00:00',
        successful: true,
        fraudulentActivity: 'None detected',
        amount: '3.0 ETH',
        from: '0x1234567890abcdef',
        to: '0xdef456...',
        gasUsed: '21000',
        blockNumber: '18456790',
        network: 'Ethereum',
        gasPrice: '20 Gwei'
      },
      {
        id: 'TX001',
        transactionId: '0x1234567890abcdef...',
        date: '2024-01-15',
        timestamp: '14:30:25',
        successful: true,
        fraudulentActivity: 'None detected',
        amount: '2.5 ETH',
        from: '0xabc123...',
        to: '0xdef456...',
        gasUsed: '21000',
        blockNumber: '18456789',
        network: 'Ethereum',
        gasPrice: '25 Gwei'
      },
      {
        id: 'TX002',
        transactionId: '0x9876543210fedcba...',
        date: '2024-01-15',
        timestamp: '14:25:10',
        successful: false,
        fraudulentActivity: 'Suspicious pattern detected',
        amount: '1.8 ETH',
        from: '0x789def...',
        to: '0x123abc...',
        gasUsed: '45000',
        blockNumber: '18456788',
        network: 'Polygon',
        gasPrice: '30 Gwei'
      },
      {
        id: 'TX003',
        transactionId: '0xabcdef1234567890...',
        date: '2024-01-15',
        timestamp: '14:20:45',
        successful: true,
        fraudulentActivity: 'None detected',
        amount: '0.5 ETH',
        from: '0x456def...',
        to: '0x789abc...',
        gasUsed: '21000',
        blockNumber: '18456787',
        network: 'Arbitrum',
        gasPrice: '0.1 Gwei'
      }
    ]
    setTransactions(mockTransactions)
  }, [])

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In real app, this would search blockchain data
    }, 1500)
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
      {/* Header with modern design */}
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
              <span className="text-white/70 text-sm font-mono">Network: Ethereum</span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-accent-yellow via-accent-purple to-accent-pink bg-clip-text text-transparent">
              DEX
            </h1>
            <p className="text-white/60 text-sm font-mono"></p>
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
              <div id="google-login-custom">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    setGoogleUser(credentialResponse);
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  ux_mode="popup"
                  width="160"
                  theme="outline"
                  text="signin_with"
                  shape="pill"
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transition-all duration-200 hover:scale-105 group"
                      style={{ minWidth: '110px' }}
                    >
                      <Chrome className="w-4 h-4 text-white" />
                      <span>Sign in</span>
                    </button>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </header>



      {/* Search Section with enhanced design */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Blockchain Explorer</h2>
          <p className="text-white/60">Search for transactions, addresses, and blocks across multiple networks</p>
        </div>
        
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Enter wallet address, transaction hash, or block number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-modern w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
                             className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200
                 ${activeTab === tab.id
                   ? 'bg-gradient-to-r from-navy-600 to-navy-800 text-white shadow-md scale-105'
                   : 'bg-dark-quaternary/60 text-white/60 hover:text-white hover:bg-dark-quaternary/80'}
                 group`}
              style={{ minWidth: '90px' }}
            >
              <Icon className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:-rotate-12" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex space-x-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Overview tab content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium">Total Volume</p>
                      <p className="text-3xl font-bold text-white">$2.4B</p>
                      <p className="text-accent-green text-sm font-medium">+12.5%</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-yellow/20 rounded-2xl flex items-center justify-center border border-accent-yellow/30">
                      <Activity className="w-8 h-8 text-accent-yellow" />
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium">Active Users</p>
                      <p className="text-3xl font-bold text-white">45.2K</p>
                      <p className="text-accent-green text-sm font-medium">+8.3%</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-green/20 rounded-2xl flex items-center justify-center border border-accent-green/30">
                      <Users className="w-8 h-8 text-accent-green" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                  <button className="text-accent-yellow hover:text-accent-yellow-light transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {userTransactions.slice(0, 3).map((tx, index) => (
                    <div 
                      key={tx.id}
                      onClick={() => handleTransactionClick(tx)}
                      className="flex items-center justify-between p-4 bg-dark-quaternary/30 rounded-xl hover:bg-dark-quaternary/50 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4">
                        {tx.fraudulentActivity && tx.fraudulentActivity !== 'None detected' ? (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-red/80 animate-pulse">
                            <AlertCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-green/80">
                            <CheckCircle className="w-5 h-5 text-accent-green" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium font-mono text-sm">
                            {tx.transactionId.substring(0, 16)}...
                          </p>
                          <p className="text-white/60 text-xs">{tx.network}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-white font-semibold">{tx.amount}</p>
                        <p className="text-white/60 text-xs">{tx.timestamp}</p>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-accent-yellow transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Transaction History</h3>
                <div className="flex items-center space-x-4">
                  {/* Filter button removed */}
                                     <button
                     className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-navy-600 to-navy-800 text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-navy-700 hover:to-navy-900 group"
                     style={{ minWidth: '60px' }}
                   >
                     <RefreshCw className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:animate-spin text-navy-200" />
                     <span>Refresh</span>
                   </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full table-modern rounded-xl overflow-hidden">
                  <thead>
                    <tr>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Status</th>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Transaction ID</th>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Network</th>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Amount</th>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Time</th>
                      <th className="text-left py-4 px-6 text-white/70 font-medium text-sm">Security</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTransactions.map((tx, index) => (
                      <tr 
                        key={tx.id}
                        onClick={() => handleTransactionClick(tx)}
                        className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-200 ${tx.fraudulentActivity !== 'None detected' ? 'bg-accent-red/20' : ''}`}
                      >
                        <td className="py-4 px-6">
                          {tx.fraudulentActivity && tx.fraudulentActivity !== 'None detected' ? (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-red/80 animate-pulse">
                              <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent-green/80">
                              <CheckCircle className="w-5 h-5 text-accent-green" />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-white/80 font-mono text-sm">
                            {tx.transactionId.substring(0, 16)}...
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent-yellow rounded-full" />
                            <span className="text-white/80 text-sm">{tx.network}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-white font-semibold">{tx.amount}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white/80 text-sm">
                            <p>{tx.date}</p>
                            <p className="text-white/60">{tx.timestamp}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {getFraudulentStatus(tx.fraudulentActivity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Analytics Dashboard</h3>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Analytics features coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Security Overview</h3>
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Security dashboard coming soon...</p>
              </div>
            </div>
          )}
        </div>

        {/* Details Panel */}
        {showDetails && (
          <div className="w-96 glass-card rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Transaction Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="w-8 h-8 bg-dark-quaternary/50 rounded-lg flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {selectedTransaction ? (
              <div className="space-y-6">
                {/* Transaction Header */}
                <div className="text-center p-4 bg-dark-quaternary/30 rounded-xl">
                  <div className="mb-3">
                    {getStatusIcon(selectedTransaction.successful, selectedTransaction.fraudulentActivity)}
                  </div>
                  <p className="text-white font-semibold mb-1">
                    {selectedTransaction.successful ? 'Transaction Successful' : 'Transaction Failed'}
                  </p>
                  <p className="text-white/60 text-sm font-mono">ID: {selectedTransaction.id}</p>
                </div>
                
                {/* Transaction Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-dark-quaternary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-accent-yellow" />
                      <span className="text-white/70 text-sm">Amount</span>
                    </div>
                    <span className="text-white font-semibold">{selectedTransaction.amount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-dark-quaternary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-accent-purple" />
                      <span className="text-white/70 text-sm">Network</span>
                    </div>
                    <span className="text-white font-semibold">{selectedTransaction.network}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-dark-quaternary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-accent-green" />
                      <span className="text-white/70 text-sm">Gas Used</span>
                    </div>
                    <span className="text-white font-semibold">{selectedTransaction.gasUsed}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-dark-quaternary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Network className="w-4 h-4 text-accent-orange" />
                      <span className="text-white/70 text-sm">Block</span>
                    </div>
                    <span className="text-white font-semibold">{selectedTransaction.blockNumber}</span>
                  </div>
                </div>
                
                {/* Addresses */}
                <div className="space-y-3">
                  <div>
                    <p className="text-white/70 text-sm mb-2">From Address</p>
                    <p className="text-white font-mono text-sm bg-dark-quaternary/30 p-3 rounded-lg break-all">
                      {selectedTransaction.from}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-white/70 text-sm mb-2">To Address</p>
                    <p className="text-white font-mono text-sm bg-dark-quaternary/30 p-3 rounded-lg break-all">
                      {selectedTransaction.to}
                    </p>
                  </div>
                </div>
                
                {/* Security Status */}
                <div className="p-4 bg-dark-quaternary/20 rounded-xl">
                  <p className="text-white/70 text-sm mb-3">Security Check</p>
                  <div className="flex items-center justify-center">
                    {getFraudulentStatus(selectedTransaction.fraudulentActivity)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60 py-12">
                <User className="w-16 h-16 mx-auto mb-4 text-accent-cyan/50" />
                <p>Select a transaction to view details</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with ML Status */}
      <footer className="mt-12 text-center">
        <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 rounded-full">
          <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">ML Engine Active</span>
          <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
          <span className="text-white/60 text-xs">Real-time Fraud Detection</span>
        </div>
      </footer>
      </div>
    </GoogleOAuthProvider>
  )
}

export default DEXInterface
