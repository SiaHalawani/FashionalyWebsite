import phone from '../../CSS/showcasephone.module.css'
import arrow from '../../../assets/arrowleft.svg'
import showcase from '../../CSS/Showcase.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
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

    const backgrounds = [
        { left: 'url(/9.png)', right: 'url(/4.png)' },
        { left: 'url(/7.png)', right: 'url(/11.png)' },
        { left: 'url(/10.png)', right: 'url(/4.png)' },
        { left: 'url(/7.png)', right: 'url(/5.png)' },
        { left: 'url(/7.png)', right: 'url(/6.png)' }
    ];

    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < sections.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
            navigate("/Landing");
        }
    };

    const handleClick = () => {
        navigate("/Home");
    };

    const currentBg = backgrounds[index];

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                height: '100vh',
                width: '100vw'
            }}
        >
            <div
                style={{
                    backgroundImage: currentBg.left,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div className={phone.pos_top}></div>

                <div className={phone.pos_mid1}>
                    <div className={showcase.topmid}>
                        <h1>Fashionly</h1>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={showcase.mid}>
                        {index === 4 ? (
                            <>
                                <div>
                                    <h2>{sections[index].title}</h2>
                                    <p>{sections[index].content}</p>
                                </div>
                               
                            </>
                        ) : (
                            <>
                                <h2>{sections[index].title}</h2>
                                <p>{sections[index].content}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div
                style={{
                    backgroundImage: currentBg.right,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}
            >
                <div className={`${phone.pos_bottom} ${showcase.bottom}`}>
                    <img src={arrow} onClick={handleNext} alt="" />
                </div>
            </div>
        </div>
    );
}
