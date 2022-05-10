import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryItem from '../GalleryItem/GalleryItem'
import './Gallery.css'
const Gallery = (props) => {
    const [images, setImage] = useState([])
    const [jsonData, setJsonData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const pinataGateway = 'https://gateway.pinata.cloud/ipfs/'
    const ipfsIoGateway = 'https://ipfs.io/ipfs/'

    useEffect(() => {
        const imgOBJ = jsonData.map((src, index) => {
            return (
                <div key={index} className='gallery__item'>
                    <img className='gallery__img' src={src} placeHolder='../../assets/sharknado.png'></img>
                </div>
            )
        })
        setImage(imgOBJ)
        console.log('images array')
        console.log(images)
    }, [jsonData])
    return (
        <div className='gallery'>Gallery
            <button onClick={async () => {
                const uri = await props.contract.tokenURI(5)
                const ipfsFilePath = ipfsIoGateway + uri.split('//')[1]
                fetch(ipfsFilePath)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        //console.log(jsonData)
                        console.log('clicked')
                        const datastring = ipfsIoGateway + data.image.split('//')[1]
                        setJsonData([...jsonData, datastring])
                        console.log('jsonData array')
                        console.log(jsonData)
                        //images.push(pinataGateway + data.image.split('//')[1])
                        //console.log(jsonData)
                    })
            }}>Get Token URI</button>
            <div className='gallery'>
                <GalleryItem src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/3.jpg'/>
                {/* <div className='gallery__item'>
                    <div className='gallery__img gallery__placeholder' >Pets NFT</div>
                </div> */}
                {/* <div className='gallery__item'>
                    <motion.img key='image'
                        whileInView={{ scale: [0.8, 1] }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='gallery__img'
                        src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/3.jpg'
                        style={loaded ? {} : { display: 'none' }}
                        onLoad={() => setLoaded(true)}></motion.img>
                    {!loaded &&
                        <motion.div key='placeholder' className='gallery__img gallery__placeholder'
                        >Pets NFT</motion.div>
                    }
                </div> */}
                {/* {images.length > 0 ? images : <h1>No nfts</h1>} */}
            </div>

        </div>
    )
}

export default Gallery
 //{images.length > 0 ? images : <h1>No nfts</h1>}
/* <div className='gallery__img gallery__placeholder' style={!loaded ? {} : { display: 'none' }}>Pets NFT</div>
                    <img className='gallery__img'
                        src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/4.jpg'
                        style={loaded ? {} : { display: 'none' }}
                        onLoad={() => setLoaded(true)}></img> */
