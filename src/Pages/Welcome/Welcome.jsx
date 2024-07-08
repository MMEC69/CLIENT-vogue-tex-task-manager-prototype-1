// Owner - Kaveesh Jeffry Vershan 
import React from 'react';
import img1 from '../../Components/Assests/1.png';
import img2 from '../../Components/Assests/2.png';
import img3 from '../../Components/Assests/3.png';
import img4 from '../../Components/Assests/4.png';
import { useNavigate } from 'react-router-dom';
import  '../../Components/ComponentCSS/welcome.css';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='background'>
      <div className='sliderFrame'>
            <div className="slideImages">
                <div className='imgContainer'>
                    <img alt='slidningImage1' className='images' src={img1}/>
                </div>
                <div className="imgContainer">
                    <img alt='slidningImage2' className='images"' src={img2}/>
                </div>
                <div className="imgContainer">
                    <img alt='slidningImage3' className='images' src={img3}/>
                </div>
                <div className="imgContainer">
                    <img alt='slidningImage4' className='images' src={img4}/>
                </div>
            </div>
        </div>

        <div className='Direct'>
            <div>
                <button className='Button1' onClick={() => navigate("/login")}>
                    <span>Let's Start</span>
                </button>
            </div>
        </div>
      
    </div>
  );
}

export default Welcome;

