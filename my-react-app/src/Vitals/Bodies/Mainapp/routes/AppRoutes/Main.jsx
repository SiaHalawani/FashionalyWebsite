import components from '../../../../CSS/components.module.css';
import containers from '../../../../CSS/containers.module.css';
import useImageScroll from "../../../../Organs/useImageScroll";
import { useEffect, useRef } from "react";
import Feed from "../MainComponents/Feed";
import { addBulkCategories} from "../../../../../BackendIntegration/AxiosConnections/OnSignUp";
export default function Main() {
    const trackRef = useRef(null);
    const { trackPercentage } = useImageScroll(trackRef);
 
    return (
    <div className={components.mainbg}>
        
        <Feed/>
    </div>
    );
    }