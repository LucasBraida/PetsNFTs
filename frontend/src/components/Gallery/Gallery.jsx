import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryItem from '../GalleryItem/GalleryItem'
import './Gallery.css'
const Gallery = (props) => {
    const containerVariant = {
        hidden: { opacity: 0 },
        show: {
            opacity: [0, 0, 1],
            y: [100, 50, 0],
            transition: { duration: 1, ease: 'easeInOut', staggerChildren: 2 }
        }
    }
    const variantItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }
    return (
        <motion.div
            variants={containerVariant}
            initial='hidden'
            animate='show'
            className='gallery'
        >
            {(props.data.length > 0) ?
                // <motion.div
                //     variants={containerVariant}
                // >
                <>
                    {props.data.map(nft => (
                        <GalleryItem key={nft.token} src={nft.src} name={nft.name} description={nft.description} />
                    ))}
                </>

                // </motion.div>
                : <motion.h2 className="sub-text gallery__soldout">Your gallery is empty</motion.h2>}

        </motion.div>

    )
}

export default Gallery
