import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './MenuBar.css';
import MenuBarMenuItem from './MenuBarMenuItem.js';

export default function MenuBarMenu(props) {
  const [menuVisible, setMenuVisible] = useState(props.menuVisible);
  const menuElement = useRef();

  /**
   * Triggered upon component mount. Adds an outside click listener to the component to 
   * determine if the latest click was outside of the menu bar menu.
   */
  useEffect(() => {
    window.addEventListener('click', outsideClickListener);
    return (() => {
      window.removeEventListener('click', outsideClickListener);
    });
  }, [])

  /**
   * Listener function to update the open status of the menu bar menu.
   * If mouse clicks outside, then the menu will close.
   * @param {React.MouseEvent} e 
   * @returns 
   */
  const outsideClickListener = (e) => {
      if (menuElement.current.contains(e.target)) {
        return;
      } else {
        props.onOffClick();
      }
  }

  /**
   * Object storing the initial animation values for the menu bar menu component.
   */
  const initialVals = {
    height: "0px"
  }

  /**
   * @returns Object of animation props for the menu bar menu component.
   */
  const animateVals = () => {
    return ({
      height: props.menuClosing ? "0px" : "50px"
    })
  }

  /**
   * @returns Object of transition animation props for the menu bar menu component.
   */
  const transitionProps = () => {
    return ({
      duration: 0.3,
      ease: "easeInOut"
    })
  }

  /**
   * Array of options included in the menu bar menu.
   */
  const menuBarMenuItemArray = ["Shut Down"];

  /**
   * Handler function for a click event on the "Start" button at the left of the menu bar.
   * @param {React.MouseEvent} e 
   */
  const handleMenuItemClick = (e) => {
    if (e == "Shut Down") {
      props.onShutDown();
    }
    
  }

  /**
   * Function for rendering menu bar menu components.
   */
  const menuItems = menuBarMenuItemArray.map((i, index) => <MenuBarMenuItem key={index} item={i} handleMenuItemClick={handleMenuItemClick}/>);

  return (
        <motion.div 
        ref={menuElement}
        initial={initialVals}
        animate={animateVals()}
        transition={transitionProps()}
        className="menu-bar-menu">
          {menuItems}
        </motion.div>
  )
}
