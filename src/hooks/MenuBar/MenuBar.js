import React, { useState, useEffect, useRef} from 'react';
import './MenuBar.css';
import MenuBarMenu from './MenuBarMenu.js';
import MenuBarItem from './MenuBarItem.js';
import MenuBarDateTime from './MenuBarDateTime';

export default function MenuBar(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  /**
   * Triggered by prop updates.
   */
  useEffect(() => {
  }, [props]);

  /**
   * Function for expanding the menu bar menu.
   */
  const expandMenu = () => {
    if (!menuVisible) {
      setButtonActive(!buttonActive);
      setMenuVisible(!menuVisible);
    } else {
      setMenuClosing(true);
      setButtonActive(false);
      setTimeout(function () {setMenuVisible(!menuVisible); setMenuClosing(false)}, 500);
    }
    
  }

  /**
   * Handler function for a click event.
   * Calls the onIconSelect function in the parent component.
   * @param {React.MouseEvent} activeID 
   */
  const handleClick = (activeID) => {
    props.onIconSelect(activeID);
  }

  /**
   * Handler function for a file mount. MAY BE REDUNDANT. CHECK TO SEE IF THIS CAN BE REMOVED.
   * @param {number} topPosition  top position 
   * @param {number} leftPosition 
   * @param {number} activeID 
   */
  const handleFileIconMount = (topPosition, leftPosition, activeID) => {
    props.onFileIconMount(topPosition, leftPosition, activeID);
  }

  /**
   * Handler function for the shut down button. Calls the onShutDown function in the parent
   * component.
   */
  const handleShutDown = () => {
    props.onShutDown();
  }

  return (
        <div className="menu-bar">
          {menuVisible ? <MenuBarMenu  onShutDown={handleShutDown} onOffClick={expandMenu} menuClosing={menuClosing} menuVisible={menuVisible} /> : null}
          <div className="icon-row d-flex">
            <button className={buttonActive ? "menu-button menu-button-active" : "menu-button menu-button-inactive"} onClick={expandMenu}>Menu</button>
            {props.menuItems.map((item) => 
            <MenuBarItem 
            src={item["icon"]} 
            activeID={item["activeID"]} 
            key={item["activeID"]}
            windowTitle={item["windowTitle"]}
            onSelect={handleClick} 
            activeStatus={item["activeStatus"]}
            onFileIconMount={handleFileIconMount}
            
            />)}
          </div>
          <MenuBarDateTime />
        </div>
  )
}
