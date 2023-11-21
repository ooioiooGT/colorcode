import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import colorcss from './Color.module.css';
import { useNavigate } from 'react-router-dom';

function Color() {
  const [color, setColor] = useState('#ffffff'); // Initial color
  const navigate = useNavigate();
  const handleColorChange = (col) => {
    setColor(col.hex);
    console.log(col)
    console.log(color.r , color.g)
  };
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
  
  const rgbvalue = hextorgb(color);
  const appstyle ={
    backgroundColor: color
  }
  const copyhex = () =>{
    navigator.clipboard.writeText(color).then(() => {
      alert('Color value copied to clipboard!');
    }).catch((error) => {
      console.error('Unable to copy:', error);
    });
  }
  const copyrgb = () =>{
    navigator.clipboard.writeText(rgbvalue).then(() =>{
      alert('Color rgbvalue copied to clipboard!');
    }).catch((error) => {
      console.error('Unable to copy:', error);
    });
  }
  const next = () => {
    navigate("/image")
  }
  return (
    <div className='App' style={appstyle}>
      <h2>Color Picker</h2>
      <button onClick={next}>Image color picker</button>
      <div className={colorcss.content}>
      <div className='picker'>
      <SketchPicker 
      color={color}
      onChangeComplete={handleColorChange}
      />
        </div>
      <div className={colorcss.code}>
        color code: {color} 
        <button onClick={copyhex}>copy</button>
        <br />
        RGB: {rgbvalue}
        <button onClick={copyrgb}>copy</button>
      </div>
      </div>
    </div>
  );
}

export default Color;
