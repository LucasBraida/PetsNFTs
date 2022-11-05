import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import './GalleryItem.css'
import OpenSeaIcon from '../OpenSeaIcon/OpenSeaIcon'
const GalleryItem = (props) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <Tilt tiltMaxAngleX={0} tiltMaxAngleY={10} >
            <div className='gallery__item' >
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
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: [0, 1] }}
                    transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 2 }}
                    className="gallery__link"
                >
                    <a href={props.url} target="_blank" rel="noreferrer">

                        <motion.div
                            whileInView={{ opacity: 1 }}
                            whileHover={{ scale: [1, 0.80] }}
                            transition={{ duration: 0.25 }}
                            className="flex"
                        >
                            <OpenSeaIcon />
                        </motion.div>
                    </a>

                </motion.div>
            </div>
        </Tilt >

    )
}

export default GalleryItem
