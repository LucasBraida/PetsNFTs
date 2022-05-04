import React from 'react'
import ThreeDotsWave from '../ThreeDotsWave/ThreeDotsWave'
import './Home.css'
const Home = (props) => {
    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <h1 className="header gradient-text">Pets NFT Collection</h1>
                    <h2 className="sub-text">
                        My Pets. With silly phares. For fun.
                    </h2>
                    <p className='p-text'>Connect a Wallet using the Rinkeby testnet to check yout NFTs or to mint a new one.</p>
                    <button className="cta-button connect-wallet-button" onClick={props.connectWallet}>
                        Connect Wallet
                    </button>
                    <button className="cta-button connect-wallet-button" onClick={props.connectWallet}>
                        <ThreeDotsWave color='white' size='0.8rem' />
                    </button>
                    <div className='test'><ThreeDotsWave color='black' size='0.8rem' /></div>


                </div>
            </div>
        </div>
    )
}

export default Home
