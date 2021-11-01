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
      height: props.menuClosing ? "0px" : "200px"
    })
  }

  const transitionProps = () => {
    return ({
      duration: 0.3,
      ease: "easeInOut"
    })
  }

  const testArray = ["Other", "Other", "Other", "Shut Down"];

  const testing = testArray.map(i => <MenuBarMenuItem key={i} item={i}/>);

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
