import React, { useState } from 'react';
import imagecolor from "./ImageColor.module.css";
import { useNavigate } from 'react-router-dom';


function ImageColor() {
    
    const [image, setImage] = useState(null);
    const [color, setColor] = useState("#1235");
    const navigate = useNavigate();

    const handleFileInput = (e) => {
        const selectedImage = e.target.files[0];
        if(selectedImage){
        const imageUrl = URL.createObjectURL(selectedImage);
        setImage(imageUrl);
        }else{
            setImage(null)
            alert("you didn't chose the file ")
            
        }
    };
    const clear = () =>{
        setImage(null);
    }
    const startEyeDrop = async () => {
      let eyeDropper = new window.EyeDropper()
      const code = await eyeDropper.open()
      const colorhex = code.sRGBHex
      console.log(colorhex)
      setColor(colorhex)
    }
    const copycolor = () => {
        navigator.clipboard.writeText(color).then(()=>{
            alert("copy the code")
        }).catch((error) => {
            console.error('Unable to copy:', error);
          });
      
    }
    const hextorgb = (hex) => {
        // Remove the hash (#) character, if present
        hex = hex.replace(/^#/, '');
      
        // Parse the hex value into separate R, G, and B values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
      
        return `rgb(${r}, ${g}, ${b})`;
      }
    const rgbcolor = hextorgb(color);
    const copyrgb = () => {
        navigator.clipboard.writeText(rgbcolor).then(()=>{
            alert("copy the RGB code")
        }).catch((error) => {
            console.error("Unable to copy:", error)
        })
    };
    const home = () =>{
        navigate("/")
    }
    return ( 
        <div className={imagecolor.imagecolor}>
            <h2>Image color picker </h2>
            <button onClick={home}>Color picker</button>
            <div className={imagecolor.detial}>
                <div className={imagecolor.left}>
                    <div className={imagecolor.form}>
                        <h2>1.Select image</h2>
                        <input onChange={handleFileInput} type='file' />
                        <br />
                        <button onClick={clear}>clear</button>
                    </div>
                    <div className={imagecolor.form}>
                        <h2> 2. Pick color </h2>
                        <button onClick={startEyeDrop}>Open Eyedropper</button>
                    </div>
                    <div className={imagecolor.form}>
                        <h2>3. View selected </h2>
                        <p>Hex code:</p>
                        <button className={imagecolor.codeb} onClick={copycolor} style={{background: color}}>{color}</button>
                        <br/>
                        <button className={imagecolor.coder} onClick={copyrgb} style={{background: color}}>{rgbcolor}</button>
                        
                    </div>


                </div>
                <div className={imagecolor.right}>
                    <img src={image} alt='selected' />
                </div>
            </div>
        </div>
    );
}

export default ImageColor;
