import './styles/App.css'
import React, { useState } from "react"
// import { ethers } from "ethers"
import abi from "./utils/PetsNFTVRF.json"
// import Home from './components/Home/Home'
import UserPage from './components/UserPage/UserPage'
import { motion } from 'framer-motion'

export default function App() {
  // Constants
  const rinkebyChainId = "0x4"
  const [currentAccount, setCurrentAccount] = useState()
  const contractAddress = '0x2a7859d36190ad6578a4dB4fa041603236E07f7d'
  const contractABI = abi.abi
  // const [contract, setContract] = useState(null)


  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert("Download Metamask and join Web3")
        return;
      }
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      if(chainId !== rinkebyChainId){
        alert('You are not connected to the Rinkeby Test Network!')
        return
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentAccount = async () => {

    try {
      const { ethereum } = window

      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length !== 0) {
        return accounts[0]
      } else {
        console.log("No accounts there")
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }



  return (
    <div className='App'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0, 1], y: [100, 50, 0] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="container">
        <div className="header-container">
          <h1 className="header gradient-text">Pets NFT Collection</h1>
          <h2 className="sub-text">
            My Pets. With silly phrases. For fun.
          </h2>
        </div>
        {!currentAccount ?
          <>
            <p className='p-text'>Connect a Wallet using the Rinkeby testnet to check your NFTs or to mint a new one.</p>
            <button className="cta-button connect-wallet-button button_hover" onClick={connectWallet}>
              Connect Wallet
            </button>
          </>
          : <UserPage currentAccount={currentAccount} getCurrentAccount={getCurrentAccount}  contractAddress={contractAddress} contractABI={contractABI}/>}

      </motion.div>
    </div>
  )
}


