import React from 'react'
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

                </div>
            </div>
        </div>
    )
}

export default Home
