import './styles/App.css'
import React, { useState, useEffect } from "react"
import abi from "./utils/PetsNFTVRF.json"
import UserPage from './components/UserPage/UserPage'
import { motion } from 'framer-motion'
import { ethers } from "ethers"

export default function App() {
  // Constants
  const rinkebyChainId = "0x4"
  const [currentAccount, setCurrentAccount] = useState()
  const contractAddress = '0xE5e4D944e2256Fa5157bc3Df6deF34Ea4d280530'
  const contractABI = abi.abi
  const [contract, setContract] = useState()


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


  useEffect(() => {

  const getContract = () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const petsNFTContract = new ethers.Contract(contractAddress, contractABI, signer)
        setContract(petsNFTContract)
        return petsNFTContract
      } else {
        console.log("No wallet found")
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
    getContract()
  },[contractABI])


  return (
    <div className='App'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0, 1], y: [100, 50, 0] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="container">
        <div className="header-container">
          <h1 className="header gradient-text">Lazy Pets NFT Collection</h1>
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
          : <UserPage currentAccount={currentAccount} getCurrentAccount={getCurrentAccount}  contractAddress={contractAddress} contractABI={contractABI} contract={contract}/>}

      </motion.div>
    </div>
  )
}


