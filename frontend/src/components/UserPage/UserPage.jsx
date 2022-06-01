import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { VscRefresh } from 'react-icons/vsc'
import ReactTooltip from 'react-tooltip'
import Spinner from '../Spinner/Spinner'
import './UserPage.css'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
import Gallery from '../Gallery/Gallery'
import { containerVariant, variantItem } from '../../variants/variants'

const UserPage = (props) => {

  const contractAddress = props.contractAddress
  const contract = props.contract
  //const [contract, setContract] = useState(null)
  const [mintWaiting, setMintWaiting] = useState(false)
  const [mintNumAvailable, setMintNumAvailable] = useState()
  const [userNFT, setUserNFT] = useState(null)
  const [fetchNFTLoading, setFetchNFTLoading] = useState(false)
  const [maxSupply, setMaxSupply] = useState(null)
  const ipfsIoGateway = 'https://ipfs.io/ipfs/'

  //Function to make sure the current connected account is being used
  //This ensures that, even if the user changes the account in their wallet, the application will use the current account
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

  // const onNewMint = async (address, tokenId) => {
  //   getMintNumAvailable()
  //   const currentAccount = await getCurrentAccount()
  //   if (address.toUpperCase() === currentAccount.toUpperCase()) {
  //     alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
  //     fetchUserNFTs()
  //   }
  // }

  // const onNewRandomRequest = async (address, requestId) => {
  //   const currentAccount = await getCurrentAccount()
  //   if (address.toUpperCase() === currentAccount.toUpperCase()) {
  //     alert(`Hello, buddy!\r\nWe are using real random numbers to create your NFT with the help of Chainlink. \r\nThat's awesome! But it comes with a little price. Your NFt will take a little longer to be ready. \r\nDon't worry, we will let you know when it's ready!`)
  //   }
  // }
  // const getContract = () => {
  //   try {
  //     const { ethereum } = window
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum)
  //       const signer = provider.getSigner()
  //       const petsNFTContract = new ethers.Contract(contractAddress, contractABI, signer)
  //       setContract(petsNFTContract)
  //       return petsNFTContract
  //     } else {
  //       console.log("No wallet found")
  //       return null
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   }
  // }

  // const getMintNumAvailable = async () => {
  //   // const cont = getContract()
  //   // const numAv = await cont.getNumberOfAvailableNFTs()
  //   // setMintNumAvailable(numAv.toNumber())
  //   // return numAv
  //   //const cont = getContract()
  //   const numAv = await contract.getNumberOfAvailableNFTs()
  //   setMintNumAvailable(numAv.toNumber())
  //   return numAv
  // }
  // const getMaxSupply = async () => {
  //   // const cont = getContract()
  //   // const numAv = await cont.getMaxSupply()
  //   // setMaxSupply(numAv.toNumber())
  //   // return numAv
  //   //const cont = getContract()
  //   const numAv = await contract.getMaxSupply()
  //   setMaxSupply(numAv.toNumber())
  //   return numAv
  // }


  const fetchUserNFTs = useCallback(async () => {
    setFetchNFTLoading(true)
    const currentAccount = await getCurrentAccount()
    //const contract = getContract()
    //const contract = props.contract
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
              {
                src: ipfsImage,
                name: data.name,
                description: data.description,
                token: userTokens[i],
                openSeaUrl: `https://testnets.opensea.io/assets/${contractAddress}/${userTokens[i].toNumber()}`
              })
          })
          .catch(e => {console.log('There has been a problem with your NFT fetch operation: ' + e.message)})
      }
      setUserNFT(tempNFTs)
      setFetchNFTLoading(false)
    } else {
      console.log('No tokens')
    }
  }, [contract, contractAddress])

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
    // const petsNFTContract = getContract()
    // petsNFTContract.on("NewTokenMinted", onNewMint)
    // petsNFTContract.on('NewRandomNumberRequest', onNewRandomRequest)
    const onNewMint = async (address, tokenId) => {
      getMintNumAvailable()
      const currentAccount = await getCurrentAccount()
      if (address.toUpperCase() === currentAccount.toUpperCase()) {
        alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)
        fetchUserNFTs()
      }
    }

    const onNewRandomRequest = async (address, requestId) => {
      const currentAccount = await getCurrentAccount()
      if (address.toUpperCase() === currentAccount.toUpperCase()) {
        alert(`Hello, buddy!\r\nWe are using real random numbers to create your NFT with the help of Chainlink. \r\nThat's awesome! But it comes with a little price. Your NFt will take a little longer to be ready. \r\nDon't worry, we will let you know when it's ready!`)
      }
    }

    const getMaxSupply = async () => {
      // const cont = getContract()
      // const numAv = await cont.getMaxSupply()
      // setMaxSupply(numAv.toNumber())
      // return numAv
      //const cont = getContract()
      const numAv = await contract.getMaxSupply()
      setMaxSupply(numAv.toNumber())
      return numAv
    }

    const getMintNumAvailable = async () => {
      // const cont = getContract()
      // const numAv = await cont.getNumberOfAvailableNFTs()
      // setMintNumAvailable(numAv.toNumber())
      // return numAv
      //const cont = getContract()
      const numAv = await contract.getNumberOfAvailableNFTs()
      setMintNumAvailable(numAv.toNumber())
      return numAv
    }
    contract.on("NewTokenMinted", onNewMint)
    contract.on('NewRandomNumberRequest', onNewRandomRequest)
    getMintNumAvailable()
    getMaxSupply()
    fetchUserNFTs()
    return () => {
      // if (petsNFTContract) {
      //   petsNFTContract.off("NewTokenMinted", onNewMint)
      //   petsNFTContract.off('NewRandomNumberRequest', onNewRandomRequest)
      // }
      if (contract) {
        contract.off("NewTokenMinted", onNewMint)
        contract.off('NewRandomNumberRequest', onNewRandomRequest)
      }
    }

  }, [contract, contractAddress, fetchUserNFTs])

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
              <div className="cta-button connect-wallet-button button_hover userpage__loading" >
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

      <motion.div className='flex' style={{ width: '100%' }} variants={containerVariant}>
        {fetchNFTLoading && <motion.div className='userpage__fetch-loading'
          variants={variantItem}>
          <Spinner color1="#35aee2" color2="#60c657" text='' textColor="none" />
        </motion.div>}
        {(userNFT && !fetchNFTLoading) && <Gallery contract={contract} getCurrentAccount={getCurrentAccount} data={userNFT} />}

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

    </motion.div>

  )
}

export default UserPage

