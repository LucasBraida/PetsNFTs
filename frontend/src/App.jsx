import './styles/App.css'
import React, { useState } from "react"
import { ethers } from "ethers"
import abi from "./utils/PetsNFT.json"
import Home from './components/Home/Home'

export default function App() {
  // Constants

  const TOTAL_MINT_COUNT = 50
  const [currentAccount, setCurrentAccount] = useState()
  const [contract, setContract] = useState()
  const contractAddress = "0x3d2e1Dc9F73B670c8EB8C6Ba1e41a277a8b30d8a"
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
  const onNewMint = (address, tokenId) => {
    if (address.toUpperCase() === getCurrentAccount().toUpperCase()) {
    console.log(address, tokenId.toNumber())
    alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
  }}
  const getContract = () => {
    let petsNFTContract
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        petsNFTContract = new ethers.Contract(contractAddress, contractABI, signer)
        setContract(petsNFTContract)
        petsNFTContract.on("NewTokenMinted", onNewMint);
      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
    }
    return () => {
      if (petsNFTContract) {
        petsNFTContract.off("NewTokenMinted", onNewMint)
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
        let mint = await contract.mintNFT()
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
    <>
      {!currentAccount ?
      <Home connectWallet={connectWallet}/>
      : <div className="App">
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
      </div>
    </div>}
    </>

  )
}





