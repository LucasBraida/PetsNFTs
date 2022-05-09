import React, { useState, useEffect } from 'react'
import image from '../../assets/sharknado.png'
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
                <div key = {index} className='gallery__item'>
                    <img className='gallery__img' src={src} placeHolder='../../assets/sharknado.png'></img>
                </div>
            )
        })
        setImage(imgOBJ)
        console.log('images array')
        console.log(images)
    }, [jsonData])
    return (
        <div  className='gallery'>Gallery
            <button onClick={async () => {
                const uri = await props.contract.tokenURI(5)
                const ipfsFilePath = ipfsIoGateway + uri.split('//')[1]
                fetch(ipfsFilePath)
                    .then(response => response.json())
                    .then(data => {
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
                <div className='gallery__item'>
                    <img className='gallery__img' src={image} style={!loaded? {} : {display: 'none'}}></img>
                    <img className='gallery__img' 
                    src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/4.jpg' 
                    style={loaded? {} : {display: 'none'}}
                    onLoad={() => setLoaded(true)}></img>
                </div>
                {images.length > 0 ? images : <h1>No nfts</h1>}
            </div>

        </div>
    )
}

export default Gallery
 //{images.length > 0 ? images : <h1>No nfts</h1>}
