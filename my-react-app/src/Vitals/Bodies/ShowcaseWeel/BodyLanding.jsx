

import landing from '../../CSS/Landing.module.css'
import arrow from '../../../assets/arrowleft.svg'
import showcase from '../../CSS/Showcase.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';

export default function BodyLanding() {
    const navigate = useNavigate();
    const handleChange = () => {
        navigate("/Signup");
    }

    return (
        <div className={landing.landing}>
            <div className={landing.pos_mid1}>
                <div className={showcase.topmid}>
                    <img src={logo} alt="logo" />
                    <h1>Your imagination, your wardrobe</h1>
                </div>
            </div>

            <div className={landing.pos_bottom} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button 
                    onClick={handleChange} 
                    style={{
                        padding: '10px 20px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#222',
                        color: 'white',
                        fontSize: '15px',
                        cursor: 'pointer',
                        width: '250px',  // FIXED WIDTH
                        maxWidth: '90%'
                    }}
                >
                    Sign up for free
                </button>

                <button 
                    style={{
                        padding: '10px 20px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        color: '#333',
                        fontSize: '15px',
                        cursor: 'pointer',
                        width: '250px',
                        maxWidth: '90%'
                    }}
                >
                    Continue with Google
                </button>

                <button 
                    style={{
                        padding: '10px 20px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        color: '#333',
                        fontSize: '15px',
                        cursor: 'pointer',
                        width: '250px',
                        maxWidth: '90%'
                    }}
                >
                    Continue with Facebook
                </button>

                <button 
                    style={{
                        padding: '10px 20px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        color: '#333',
                        fontSize: '15px',
                        cursor: 'pointer',
                        width: '250px',
                        maxWidth: '90%'
                    }}
                >
                    Continue with Apple
                </button>

                <span style={{ marginTop: '12px', display: 'block', textAlign: 'center', fontSize: '14px' }}>
                    Already have an account? <Link to='/Login'>Log In</Link>
                </span>
            </div>
        </div>
    )
}