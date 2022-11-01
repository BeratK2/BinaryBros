import React from 'react'

const Nav = ({minimal, setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }

    const authToken = false;
    return (
        <nav className="logo-container">
            <div>
                <img 
                    className="logo" 
                    alt=""
                    src={minimal ? "https://png.pngitem.com/pimgs/s/242-2424520_johns-hopkins-logo-white-hd-png-download.png" : "https://toppng.com/uploads/preview/tinder-logo-transparent-tinder-logo-11563243301zivc1sx84c.png"}
                />
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
