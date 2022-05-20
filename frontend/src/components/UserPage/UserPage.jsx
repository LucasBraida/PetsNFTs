import React, { useState, useEffect } from 'react'
import { motion, Tilt_container } from 'framer-motion'
import { ethers } from "ethers"
import { VscRefresh } from 'react-icons/vsc'
import ReactTooltip from 'react-tooltip'
import Spinner from '../Spinner/Spinner'
import './UserPage.css'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
import { MotionWrap } from '../wrapper'
//import abi from '../../utils/PetsNFT.json'
import abi from '../../utils/PetsNFTVRF.json'
import Gallery from '../Gallery/Gallery'
import { containerVariant, variantItem } from '../../variants/variants'
import OpenSeaIcon from '../OpenSeaIcon/OpenSeaIcon'
//import './Home.css'
const UserPage = (props) => {
  //const contractAddress = "0x3d2e1Dc9F73B670c8EB8C6Ba1e41a277a8b30d8a" VElho
  //const contractAddress = '0x1Bbbbc673175f13B43301E2e08E9E4d7cbad467d' Sem VRF
  const contractAddress = '0x7B4E0ad04B1557C00d82b3f14CcF596B2C18f5b9'
  const contractABI = abi.abi
  const [contract, setContract] = useState(null)
  const [mintWaiting, setMintWaiting] = useState(false)
  const [mintNumAvailable, setMintNumAvailable] = useState()
  const [userNFT, setUserNFT] = useState(null)
  const [fetchNFTLoading, setFetchNFTLoading] = useState(false)
  const [maxSupply, setMaxSupply] = useState(null)
  const ipfsIoGateway = 'https://ipfs.io/ipfs/'

  //Function to make sure the current connected account is being used
  //This ensures that, even if the user changes the account in theis wallet, the application will use the current account
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

  const onNewMint = async (address, tokenId) => {
    getMintNumAvailable()
    const currentAccount = await getCurrentAccount()
    if (address.toUpperCase() === currentAccount.toUpperCase()) {
      console.log(address, tokenId.toNumber())
      alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
      fetchUserNFTs()
    }
  }

  const onNewRandomRequest = async (address, requestId) => {
    //getMintNumAvailable()
    alert(`RequestId for your NFT: ${address}  ${requestId}`)
    // const currentAccount = await getCurrentAccount()
    // if (address.toUpperCase() === currentAccount.toUpperCase()) {
    //   console.log(address, tokenId.toNumber())
    //   alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
    //   fetchUserNFTs()
    // }
  }
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

  const getMintNumAvailable = async () => {
    const cont = getContract()
    const numAv = await cont.getNumberOfAvailableNFTs()
    setMintNumAvailable(numAv.toNumber())
    return numAv
  }
  const getMaxSupply = async () => {
    const cont = getContract()
    const numAv = await cont.getMaxSupply()
    setMaxSupply(numAv.toNumber())
    return numAv
  }


  const fetchUserNFTs = async () => {
    setFetchNFTLoading(true)
    const currentAccount = await getCurrentAccount()
    const contract = getContract()
    const userTokens = await contract.getOwnersTokens(currentAccount)
    if (userTokens) {
      let tempNFTs = []
      for (let i = 0; i < userTokens.length; i++) {
        const uri = await contract.tokenURI(userTokens[i].toNumber())
        const ipfsFilePath = ipfsIoGateway + uri.split('//')[1]
        await fetch(ipfsFilePath)
          .then(response => response.json())
          .then(data => {
            const ipfsImage = ipfsIoGateway + data.image.split('//')[1]
            tempNFTs.push(
              { src: ipfsImage,
                name: data.name,
                description: data.description,
                token: userTokens[i],
                openSeaUrl: `https://testnets.opensea.io/assets/${contractAddress}/${userTokens[i].toNumber()}` })
          })
      }
      setUserNFT(tempNFTs)
      setFetchNFTLoading(false)
    } else {
      console.log('No tokens')
    }
  }

  const mintNFT = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        let mint = await contract.mintNFT()
        setMintWaiting(true)
        await mint.wait()
        setMintWaiting(false)

      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
      setMintWaiting(false)
    }
  }

  useEffect(() => {
    const petsNFTContract = getContract()
    petsNFTContract.on("NewTokenMinted", onNewMint)
    petsNFTContract.on('NewRandomNumberRequest', onNewRandomRequest)
    getMintNumAvailable()
    getMaxSupply()
    fetchUserNFTs()
    return () => {
      if (petsNFTContract) {
        petsNFTContract.off("NewTokenMinted", onNewMint)
        petsNFTContract.off('NewRandomNumberRequest', onNewRandomRequest)
      }
    }

  }, [])

  return (
    <motion.div className='userpage'
      variants={containerVariant}
      initial='hidden'
      animate='show'>
      <motion.div variants={variantItem}>
        {mintNumAvailable ?
          <motion.div
            variants={variantItem}
            className='flex'>
            <h3 className='sub-text gallery__available'>NFTs Available: {mintNumAvailable}/{maxSupply}</h3>
            {mintWaiting ?
              <div className="cta-button connect-wallet-button button_hover userpage__loading" onClick={() =>{setMintWaiting(false)}}>
                <ThreeDotsWave size='0.7rem' />
              </div>
              : <button className="cta-button connect-wallet-button button_hover" onClick={mintNFT}>
                Mint NFT
              </button>
            }

          </motion.div>
          :
          <>
            {(mintNumAvailable === 0) && <motion.div
              variants={variantItem}>
              <h1 className="header gradient-text">We are Sold out. Sorry!</h1>
            </motion.div>}
          </>
        }
      </motion.div>
      {/* {mintNumAvailable ?
        <motion.div
          variants={variantItem}>
          <h3 className='sub-text gallery__available'>NFTs Available: {mintNumAvailable}/10</h3>
          {mintWaiting ?
            <div className="cta-button connect-wallet-button button_hover flex userpage__loading">
              <ThreeDotsWave size='0.7rem' />
            </div>
            : <button className="cta-button connect-wallet-button button_hover" onClick={mintNFT}>
              Mint NFT
            </button>
          }

        </motion.div>
        :
        <>
          {(mintNumAvailable === 0) && <motion.div
            variants={variantItem}>
            <h1 className="header gradient-text">We are Sold out. Sorry!</h1>
          </motion.div>}
        </>
      } */}

      <motion.div className='flex' style={{ width: '100%' }} variants={containerVariant}>
        {fetchNFTLoading && <motion.div className='userpage__fetch-loading'
          variants={variantItem}>
          <Spinner color1="#35aee2" color2="#60c657" text='' textColor="none" />
        </motion.div>}
        {(userNFT && !fetchNFTLoading) && <Gallery contract={contract} getCurrentAccount={getCurrentAccount} data={userNFT} />}
        {/* {(userNFT && !fetchNFTLoading) ?
          <Gallery contract={contract} getCurrentAccount={getCurrentAccount} data={userNFT} />

          : <motion.div className='userpage__fetch-loading'
            variants={variantItem}>
            <Spinner color1="#35aee2" color2="#60c657" text='' textColor="none" />
          </motion.div>} */}
      </motion.div>
      <motion.div variants={variantItem}>
        <motion.button
          variants={variantItem}
          className='userpage__refresh button_hover'
          onClick={fetchUserNFTs}
          data-tip
          data-for='refreshButton'>
          <VscRefresh />
        </motion.button>
        <ReactTooltip
          id='refreshButton'
          effect='solid'
          arrowColor='white'
          place='left'
          className='skills-tooltip'>
          Refresh User's NFTs
        </ReactTooltip>
      </motion.div>
      {/* <motion.button
      variants={variantItem}
      className='userpage__refresh button_hover'
      onClick={fetchUserNFTs}
      data-tip
      data-for='refreshButton'>
        <VscRefresh />
      </motion.button>
      <ReactTooltip
        id='refreshButton'
        effect='solid'
        arrowColor='white'
        place='left'
        className='skills-tooltip'>
        Refresh User's NFTs
      </ReactTooltip> */}
    </motion.div>

  )
}

export default UserPage

/*
  const [currentAccount, setCurrentAccount] = useState()
  const [contract, setContract] = useState()


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
    if (address.toUpperCase() === getCurrentAccount().toUpperCase()) {
      console.log(address, tokenId.toNumber())
      alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
    }
  }


  const mintNFT = async () => {
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

  React.useEffect(getContract, [])


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
            My Pets. With silly phares. For fun.
          </h2>
          {!currentAccount ?
            <>
              <p className='p-text'>Connect a Wallet using the Rinkeby testnet to check yout NFTs or to mint a new one.</p>
              <button className="cta-button connect-wallet-button" onClick={connectWallet}>
                Connect Wallet
              </button>
            </>
            : <UserPage />}
        </div>
      </motion.div>
    </div>
  )
} */
