import React, {useState} from 'react'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
//import './Home.css'
const UserPage = (props) => {
    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <h1 className="header gradient-text">Pets NFT Collection</h1>
                    <h2 className="sub-text">
                        My Pets. With silly phares. For fun.
                    </h2>
                    <button className="cta-button connect-wallet-button" onClick={() =>{console.log('USerPAge')}}>
                        Mint NFT
                    </button>
                    <button className="cta-button connect-wallet-button flex" onClick={props.connectWallet}>
                        <ThreeDotsWave color='white' size='0.8rem' />
                    </button>
                    <div className='cta-button connect-wallet-button flex'><ThreeDotsWave color='black' size='0.8rem' /></div>


                </div>
            </div>
        </div>
    )
}

export default UserPage
