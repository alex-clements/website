import React, {useEffect, useRef} from 'react';
import { motion } from 'framer-motion';
import './MenuBar.css';

const initial = {opacity: 0}
const animate = {opacity: 1}

export default function MenuBarItem(props) {
    const thisElement = useRef();

    /**
     * Triggered upon component load.
     * Calls the onFileIconMount function in the parent component.
     */
    useEffect(() => {
        var topPosition = thisElement.current.getBoundingClientRect().top;
        var leftPosition = thisElement.current.getBoundingClientRect().left;
        props.onFileIconMount(topPosition, leftPosition, props.activeID);
      }, [])

    /**
     * Handler function for a click event on the menu bar item.
     * Calls the onSelect function in the parent component with the activeID of the 
     * current component.
     */
    const handleClick = () => {
        props.onSelect(props.activeID);
    }

    /**
     * @returns Style props object for the menu bar item. Style changes depending on whether the 
     * given application is active or not.
     */
    const styleProps = () => {
        return ({
            "borderColor": props.activeStatus ? "#808080 #FFFFFF #FFFFFF #808080" : "#FFFFFF #808080 #808080 #FFFFFF",
            "backgroundColor": props.activeStatus ? "#EBECF0" : "#C0C0C0"
        })
    }

    return (
        <motion.button
        initial={initial}
        animate={animate}
        className="menu-bar-item-box"
        onClick={handleClick}
        style={styleProps()}
        ref={thisElement} >
            
            <img className="menu-bar-item-image mt-0" height="20px" width="20px" src={props.src} />
            <p className="menu-bar-item-text mb-0">{props.windowTitle}</p>
        </motion.button>
    )
}
