import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../CSS/Basic.module.css'
import logo from '../../assets/logo.png'
import components from '../CSS/components.module.css'
export default function BodyOpening() {
     const navigate = useNavigate();
     useEffect(() => {
        
        const handleClick = ()=>
        {
          navigate("/Start");
    
        }
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        };
    
      });
    
    return (
   
        <div className= {styles.background}>
           
           <div className= {styles.center}>
            <h1 className={components.title}>Fashionly</h1>
            <img src={logo}  alt="logo" />
           </div>  

        </div>
    
    )
}
//0