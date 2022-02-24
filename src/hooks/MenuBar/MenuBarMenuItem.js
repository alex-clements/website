import React, {useState} from 'react';
import './MenuBar.css';
import offIcon from './turnOffComputer.ico';

export default function MenuBarMenuItem(props) {
    const [hoverState, setHoverState] = useState(false);

    /**
     * Handler function for a hover event over the component.
     */
    const handleHover = () => {
        setHoverState(!hoverState);
    }

    /**
     * Style props for the image to be displayed with the menu bar menu item component.
     */
    const imageStyle = {
        "position": "relative",
        "float": "left",
        "paddingTop": "10px",
        "paddingLeft": "5px"
    }

    /**
     * Style props for the text displayed in teh menu bar menu item component.
     */
    const textStyle = {
        "padding-top": "10px"
    }

    /**
     * Handler function for a click event on the component.
     * Calls the handleMenyItemClick function in the parent component.
     */
    const handleClick = () => {
        props.handleMenuItemClick(props.item);
    }

  return (
        <div 
        className={hoverState ? "w-auto menu-bar-menu-item menu-bar-menu-item-active" : "w-auto menu-bar-menu-item"}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleClick}>
            <img style={imageStyle} src={offIcon} height="40px" width="40px" />
            <p style={textStyle}>
                {props.item}
            </p>
        </div>
  )
}