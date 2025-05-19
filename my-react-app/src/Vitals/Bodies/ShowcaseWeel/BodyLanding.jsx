

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
     const handleChangetw = () => {
        navigate("/Login");
    }

    return (
<div className={landing.landing}>
  <div className={landing.leftSection}>
    
  </div>

  <div className={landing.rightSection}>
    <div className={landing.containerBox}>
     
      <div className={landing.pos_mid1}>
        <img src={logo} alt="logo" />
        <h1>
          <span className={landing.gradientTitle}>Unleash Style.</span><br />
          <span className={landing.gradientSubtitle}>Your Imagination. Your Wardrobe.</span>
        </h1>
     
    </div>
      <div className={landing.pos_bottom}>
        <button onClick={handleChange} className={landing.authButton}>
          Sign up for free
        </button>
        <span className={landing.loginText}>
          Already have an account? <Link to='/Login'>Log In</Link>
        </span>
      </div>
    </div>
  </div>
</div>



    )
}