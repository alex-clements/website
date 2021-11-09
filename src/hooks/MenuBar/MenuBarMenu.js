import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './MenuBar.css';
import MenuBarMenuItem from './MenuBarMenuItem.js';


export default function MenuBarMenu(props) {
  const [menuVisible, setMenuVisible] = useState(props.menuVisible);
  const menuElement = useRef();

  useEffect(() => {
    window.addEventListener('click', outsideClickListener);

    return (() => {
      window.removeEventListener('click', outsideClickListener);
    });
  }, [])

  const outsideClickListener = (e) => {
      if (menuElement.current.contains(e.target)) {
        return;
      } else {
        props.onOffClick();
      }
  }


  const initialVals = {
    height: "0px"
  }

  const animateVals = () => {
    return ({
      height: props.menuClosing ? "0px" : "50px"
    })
  }

  const transitionProps = () => {
    return ({
      duration: 0.3,
      ease: "easeInOut"
    })
  }

  const testArray = ["Shut Down"];

  const handleMenuItemClick = (e) => {
    if (e == "Shut Down") {
      props.onShutDown();
    }
    
  }

  const testing = testArray.map((i, index) => <MenuBarMenuItem key={index} item={i} handleMenuItemClick={handleMenuItemClick}/>);

  return (
        <motion.div 
        ref={menuElement}
        initial={initialVals}
        animate={animateVals()}
        transition={transitionProps()}
        className="menu-bar-menu">
          {testing}
        </motion.div>
  )
}
