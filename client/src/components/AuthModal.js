import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'

const AuthModal = ({setShowModal, isSignUp}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()
    
    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    //Posts sign up data when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError('Passwords need to match')
                return
            }
            
            //Run signup route and store it as a response 
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {email, password})
            
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201

            console.log(response.data)

            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')

            window.location.reload()
        }
        catch(error){
            console.error(error)
        }   
    }

    return (
        <div className="auth-modal">
           <div className="close-icon" onClick={handleClick}>x</div> 
           <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
           <p>Welcome to RoomEase!</p>
           <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
               {isSignUp && <input 
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>

           </form>
        </div>
    )
}

export default AuthModal