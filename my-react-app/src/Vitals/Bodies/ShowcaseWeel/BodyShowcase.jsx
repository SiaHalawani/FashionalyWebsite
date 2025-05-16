

import phone from '../../CSS/showcasephone.module.css'
import arrow from '../../../assets/arrowleft.svg'
import showcase from '../../CSS/Showcase.module.css'
import { useNavigate } from 'react-router-dom'
import { isValidElement, useState } from "react";
import logo from '../../../assets/logo.png'
import Weel from './Weel/weel'
export default function BodyShowcase() {
    const navigate = useNavigate();


    const sections = [
        { title: "Section 1", content: "This is the first section." },
        { title: "Section 2", content: "This is the second section." },
        { title: "Section 3", content: "This is the third section." },
        { title: "Section 4", content: "This is the fourth section." },
        { title: "Section 5", content: "This is the fifth section." }
      ];

    const [index, setIndex] = useState(0);

    const handleNext = () => {

        if(index<sections.length - 1){
        setIndex(index+1);
        }else{
            setIndex(0);
            navigate("/Landing");
        }
        
        
   
    };

    const handleClick = () => {
        navigate("/Home");
    }
    return (

        <div className={phone.phone}>



        <div className={phone.pos_top}>
            
        </div>


        <div className={`${phone.pos_mid1} `}>
            <div className={showcase.topmid}>
              <h1>Fashionly</h1>
              <img src={logo}  alt="logo" />
            </div>
            <div className={showcase.mid}>
                    {index === 4 ? (
                        <>
                         
                        <div>
                        <h2>{sections[index].title}</h2>
                        <p>{sections[index].content}</p>
                        </div>
                        <Weel/> 
                        </>
                    
                    ) : (
                        <>
                            <h2>{sections[index].title}</h2>
                            <p>{sections[index].content}</p>
                        </>
                    )}
                </div>
           
        </div>


        <div className={`${phone.pos_bottom} ${showcase.bottom}`}>
            <img src={arrow} onClick={handleNext}alt="" />
        </div>

        


        </div>
    )
}
//1