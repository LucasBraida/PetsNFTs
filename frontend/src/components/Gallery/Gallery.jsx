import React from 'react'
import { motion} from 'framer-motion'
import GalleryItem from '../GalleryItem/GalleryItem'
import './Gallery.css'
import { containerVariant} from '../../variants/variants'
const Gallery = (props) => {

    return (
        <motion.div
            variants={containerVariant}
            initial='hidden'
            animate='show'
            className='gallery'
        >

            {(props.data.length > 0) ?

                <>
                    {props.data.map(nft => (
                        <motion.div key={nft.token}
                            variants={containerVariant}
                            initial='hidden'
                            animate='show'>
                            <GalleryItem src={nft.src} name={nft.name} description={nft.description} url={nft.openSeaUrl}/>
                        </motion.div>

                    ))}
                </>


                : <motion.h2
                    variants={containerVariant}
                    initial='hidden'
                    animate='show'
                    className="sub-text gallery__soldout">Your gallery is empty</motion.h2>}

        </motion.div>

    )
}

export default Gallery
