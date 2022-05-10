import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryItem from '../GalleryItem/GalleryItem'
import './Gallery.css'
const Gallery = (props) => {
    const [images, setImages] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [jsonData, setJsonData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [nfts, setNfts] = useState([])
    const pinataGateway = 'https://gateway.pinata.cloud/ipfs/'
    const ipfsIoGateway = 'https://ipfs.io/ipfs/'

    // const makeItems = async (tokens) => {
    //     let tmpNFTs = []
    //     tokens.forEach
    //     const uri = await props.contract.tokenURI(token)
    //     const ipfsFilePath = ipfsIoGateway + uri.split('//')[1]
    //     fetch(ipfsFilePath)
    //         .then(response => response.json())
    //         .then(data => {
    //             const ipfsImage = ipfsIoGateway + data.image.split('//')[1]
    //             return <GalleryItem key={token} src={ipfsImage} name={data.name} description={data.description} />
    //         })
    // }
    useEffect(() => {
        const fetchImages = async () => {
            const currentAccount = await props.getCurrentAccount()
            const userTokens = await props.contract.getOwnersTokens(currentAccount)
            //const userURIs = await userTokens.forEach(async (token) =>{})
            //console.log()
            if (userTokens) {
                let tempNFTs = []
                for(const tk in userTokens){
                    const uri = await props.contract.tokenURI(tk)
                    const ipfsFilePath = ipfsIoGateway + uri.split('//')[1]
                    fetch(ipfsFilePath)
                        .then(response => response.json())
                        .then(data => {
                            const ipfsImage = ipfsIoGateway + data.image.split('//')[1]
                            tempNFTs.push(<GalleryItem key={tk} src={ipfsImage} name={data.name} description={data.description} />)
                        })
                }
                // await userTokens.forEach((token) => {
                //     const item = makeItems(token)
                //     tempNFTs.push(item)
                // })
                console.log('tempNFTs')
                console.log(tempNFTs)
                setImages(tempNFTs)
                console.log('images inside fetch')
                console.log(images)
            } else {
                console.log('No tokens')
            }
        }
        fetchImages()
    }, [clicked])
    return (
        <>
            <button onClick={() => setClicked(!clicked)}>Get Token URI</button>
            <div className='gallery'>
                {images}
            </div>
        </>

    )
}

export default Gallery
 //{images.length > 0 ? images : <h1>No nfts</h1>}
/* <div className='gallery__img gallery__placeholder' style={!loaded ? {} : { display: 'none' }}>Pets NFT</div>
                    <img className='gallery__img'
                        src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/4.jpg'
                        style={loaded ? {} : { display: 'none' }}
                        onLoad={() => setLoaded(true)}></img> */

                //         {/* <div className='gallery__item'>
                //     <div className='gallery__img gallery__placeholder' >Pets NFT</div>
                // </div> */}
                // {/* <div className='gallery__item'>
                //     <motion.img key='image'
                //         whileInView={{ scale: [0.8, 1] }}
                //         transition={{ duration: 0.3, ease: 'easeInOut' }}
                //         className='gallery__img'
                //         src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/3.jpg'
                //         style={loaded ? {} : { display: 'none' }}
                //         onLoad={() => setLoaded(true)}></motion.img>
                //     {!loaded &&
                //         <motion.div key='placeholder' className='gallery__img gallery__placeholder'
                //         >Pets NFT</motion.div>
                //     }
                // </div> */}
                // {/* {images.length > 0 ? images : <h1>No nfts</h1>} */}
