import React from 'react'

//"https://media.discordapp.net/attachments/1014217500386394112/1021905307649188000/D9C90488-A9E2-444A-A1DB-EE0C73FE2DC4.png" : "https://media.discordapp.net/attachments/1014217500386394112/1021905307649188000/D9C90488-A9E2-444A-A1DB-EE0C73FE2DC4.png"
const Nav = ({minimal, setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }

    const authToken = false;
    return (
        <nav className="logo-container">
            <div>
             
            </div>

            {!authToken && !minimal && <button 
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >
                Log in
            </button>}
        </nav>
    )
}

export default Nav
