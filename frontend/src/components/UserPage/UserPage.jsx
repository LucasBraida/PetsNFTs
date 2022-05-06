import React, { useState } from 'react'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
import { MotionWrap } from '../wrapper'
import { motion } from 'framer-motion'
//import './Home.css'
const UserPage = (props) => {
    return (
        <div >
            <button className="cta-button connect-wallet-button" onClick={() => { console.log('USerPAge') }}>
                Mint NFT
            </button>

        </div>

    )
}

export default MotionWrap(UserPage)
