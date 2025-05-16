
import Aimain from '../MainComponents/AI/AImain';
import OnAiClick from '../MainComponents/AI/OnAiClick';
import { useState } from 'react';
export default function AI() {
    const [change, setChange] = useState(true);
    const changePage = ()=>{
        if(change){
        return <Aimain setChange={setChange} change={change}/>
        }else{
            return <OnAiClick/>
        }
    }
    return (
        <>
        {changePage()}
        </>
    );
    }