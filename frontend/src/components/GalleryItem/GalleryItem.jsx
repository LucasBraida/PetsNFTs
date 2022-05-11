import React, { useState } from 'react'
import { motion} from 'framer-motion'
import './GalleryItem.css'
import Tilt from 'react-parallax-tilt'
const GalleryItem = (props) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} >
            <div className='gallery__item' onClick={() =>{console.log('tilt clicked')}}>
            <motion.img
                whileInView={{ scale: [0.8, 1] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className='gallery__img'
                src={props.src}
                style={loaded ? {} : { display: 'none' }}
                onLoad={() => setLoaded(true)}
            ></motion.img>
            {!loaded &&
                <div className='gallery__img gallery__placeholder'
                >Pets NFT</div>
            }
            <h3 className='gallery__name'><span className='bold'>Name: </span>{props.name}</h3>
            <p className='gallery__description'><span className='bold'>Description: </span>{props.description}</p>
        </div>
        </Tilt>

    )
}

export default GalleryItem
 //{images.length > 0 ? images : <h1>No nfts</h1>}
/* <div className='gallery__img gallery__placeholder' style={!loaded ? {} : { display: 'none' }}>Pets NFT</div>
                    <img className='gallery__img'
                        src='https://ipfs.io/ipfs/QmRafV2oB9UzSBjWBqcEcnpZhDjAcX1uLAAMBACQBSsMw8/4.jpg'
                        style={loaded ? {} : { display: 'none' }}
                        onLoad={() => setLoaded(true)}></img> */
