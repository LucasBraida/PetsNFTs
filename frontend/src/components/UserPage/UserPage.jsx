import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ethers } from "ethers"
import './UserPage.css'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
import { MotionWrap } from '../wrapper'
import abi from '../../utils/PetsNFT.json'
import Gallery from '../Gallery/Gallery'
//import './Home.css'
const UserPage = (props) => {
    const contractAddress = "0x3d2e1Dc9F73B670c8EB8C6Ba1e41a277a8b30d8a"
    const contractABI = abi.abi
    const [contract, setContract] = useState({})
    const [mintWaiting, setMintWaiting] = useState(false)
    const [mintNumAvailable, setMintNumAvailable] = useState()

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
        }
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
        const numAv = await cont.getNumberOfAvailableTokens()
        setMintNumAvailable(numAv.toNumber())
        return numAv
    }
    // const getContract = () => {
    //     let petsNFTContract
    //     try {
    //         const { ethereum } = window
    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(ethereum)
    //             const signer = provider.getSigner()
    //             petsNFTContract = new ethers.Contract(contractAddress, contractABI, signer)
    //             setContract(petsNFTContract)
    //             setMintNumAvailable(await petsNFTContract.getNumberOfAvailableTokens())
    //             petsNFTContract.on("NewTokenMinted", onNewMint);
    //         } else {
    //             console.log("No wallet found")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     return () => {
    //         if (petsNFTContract) {
    //             petsNFTContract.off("NewTokenMinted", onNewMint)
    //         }
    //     };


    // }
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
        getMintNumAvailable()
        return () => {
            if (petsNFTContract) {
                petsNFTContract.off("NewTokenMinted", onNewMint)
            }
        }
    }, [])

    return (
        <div className='userpage'>
            {mintNumAvailable > 0 ? <>
                <h3 className='sub-text'>NFTs Available: {mintNumAvailable}/10</h3>
                {mintWaiting ?
                    <div className="cta-button connect-wallet-button flex userpage__loading">
                        <ThreeDotsWave size='0.7rem' />
                    </div>
                    : <button className="cta-button connect-wallet-button" onClick={() => setMintNumAvailable(0)}>
                        Mint NFT
                    </button>
                }
            </> :
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0, 1], y: [100, 50, 0] }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}>
                    <h1 className="header gradient-text">We are Sold out. Sorry!</h1>
                </motion.div>
            }
            <Gallery contract={contract} getCurrentAccount={getCurrentAccount}/>
        </div>

    )
}

export default MotionWrap(UserPage)

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
