import './styles/App.css'
import twitterLogo from './assets/twitter-logo.svg'
import React, { useState } from "react"
import { ethers } from "ethers"
import abi from "./utils/MyEpicNFT.json"

export default function App() {
  // Constants
  const TWITTER_HANDLE = '_buildspace'
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
  const OPENSEA_LINK = ''
  const TOTAL_MINT_COUNT = 50
  const [currentAccount, setCurrentAccount] = React.useState()
  const [contract, setContract] = React.useState()
  const contractAddress = "0x2168bA942c7D7CCd3C214fc223261290D43C9bE7"
  const contractABI = abi.abi

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert("Download Metamask and join Web3")
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const onNewMint = (address, tokenId) => {
    if (address.toUpperCase() == currentAccount.toUpperCase()) {
    console.log(from, tokenId.toNumber())
    alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
  }}
  const getContract = () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const epicNFTsContract = new ethers.Contract(contractAddress, contractABI, signer)
        setContract(epicNFTsContract)
        epicNFTsContract.on("NewEpicNFTMinted", onNewMint);
      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
    }
    return () => {
      if (epicNFTsContract) {
        epicNFTsContract.off("NewEpicNFTMinted", onNewMint)
      }
    };


  }

  const mintNFT = async () =>{
    try {
      const { ethereum } = window
      if (ethereum) {
        //const provider = new ethers.providers.Web3Provider(ethereum)
        //const signer = provider.getSigner()
        //const epicNFTContract = new ethers.Contract(contractAddress, contractABI, signer)
        //setContract(epicNFTContract)
        let mint = await contract.makeAnEpicNFT()
        await mint.wait()

      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(getContract,[])
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount ?
            <button className="cta-button connect-wallet-button" onClick={mintNFT}>
              Mint your NFT
            </button>
            : <button className="cta-button connect-wallet-button" onClick={connectWallet}>
              Connect to Wallet
            </button>
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}





