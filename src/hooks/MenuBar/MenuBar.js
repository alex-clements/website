import React, { useState, useEffect, useRef} from 'react';
import './MenuBar.css';
import MenuBarMenu from './MenuBarMenu.js';
import MenuBarItem from './MenuBarItem.js';
import MenuBarDateTime from './MenuBarDateTime';



export default function MenuBar(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);


  useEffect(() => {
  }, [props]);



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

  const handleClick = (activeID) => {
    props.onIconSelect(activeID);
  }

  const handleFileIconMount = (topPosition, leftPosition, activeID) => {
    props.onFileIconMount(topPosition, leftPosition, activeID);
  }

  return (
        <div className="menu-bar">
          <button className={buttonActive ? "menu-button-active" : "menu-button-inactive"} onClick={expandMenu}>Menu</button>
          {menuVisible ? <MenuBarMenu  onOffClick={expandMenu} menuClosing={menuClosing} menuVisible={menuVisible} /> : null}
          <div className="icon-row d-flex">
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
