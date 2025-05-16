
import components from '../../../CSS/components.module.css';
import containers from '../../../CSS/containers.module.css';
import useImageScroll from "../../../Organs/useImageScroll";
import { useEffect, useRef } from "react";
export default function Weel() {
    const trackRef = useRef(null);
    const { trackPercentage } = useImageScroll(trackRef);
   
    return (
    <div className={components.mainbg}>
    
      <div className={components.imagecontainer}>  
        <div ref={trackRef} className={containers.basicimagecontainer}>
            <img className={components.image_track + " image_track"} src="https://wallpapers.com/images/featured/4k-nature-ztbad1qj8vdjqe0p.jpg" alt="placeholder" draggable="false" onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://cdn.create.vista.com/api/media/small/108270716/stock-photo-imaging-of-beautiful-landscape-with-nice-nature-color" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()} />
            <img className={components.image_track + " image_track"} src="https://cdn.pixabay.com/photo/2016/09/14/19/49/sunset-1670219_640.jpg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>
            <img className={components.image_track + " image_track"} src="https://img.freepik.com/free-photo/vestrahorn-mountains-stokksnes-iceland_335224-667.jpg" alt="placeholder" draggable="false"onDragStart={(e) => e.preventDefault()}
  onMouseDown={(e) => e.preventDefault()}/>

        </div>

        
     </div>


     

    </div>
    );
    }