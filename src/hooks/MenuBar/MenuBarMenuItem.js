import React, {useState} from 'react';
import './MenuBar.css';
import offIcon from './turnOffComputer.ico';

export default function MenuBarMenuItem(props) {
    const [hoverState, setHoverState] = useState(false);

    const handleHover = () => {
        setHoverState(!hoverState);
    }

    const imageStyle = {
        "position": "relative",
        "float": "left",
        "padding-top": "10px",
        "padding-left": "5px"
    }

    const textStyle = {
        "padding-top": "10px"
    }

  return (
        <div 
        className={hoverState ? "w-auto menu-bar-menu-item menu-bar-menu-item-active" : "w-auto menu-bar-menu-item"}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}>
            <img style={imageStyle} src={offIcon} height="40px" width="40px" />
            <p style={textStyle}>
                {props.item}
            </p>
        </div>
  )
}