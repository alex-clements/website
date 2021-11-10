import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import fileIcon from './Notepad.ico';
import './readMeFile.css';
import ReadMeContents from './ReadMeContents.js';
import captureAnalytics from '../../scripts/captureAnalytics.js';

export default function ReadMeFile(props) {
  const [isActive, setIsActive] = useState(false);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const thisElement = useRef();
  const dragControls = useDragControls()

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickListener);
    setOriginalHeight(thisElement.current.getBoundingClientRect().y);
    setOriginalWidth(thisElement.current.getBoundingClientRect().x);
    captureAnalytics("readMe");

    return function cleanup() {
      document.removeEventListener('mousedown', outsideClickListener)
    }
  }, []);

  const outsideClickListener = (e) => {
    if (thisElement.current.contains(e.target)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  const styleProps = () => {
    return (
      {
        "width": "80px",
        "borderStyle": "solid",
        "borderColor": isActive ? "white": "transparent",
        "borderWidth": "2px",
        "overflow": "hidden"
      })}

  const handleClick = () => {
    setIsActive(true);
  }

  const handleDoubleClick = () => {
    var desktopIconX = 0;
    var desktopIconY = 0;
    props.onOpen(1, 
                 300, 
                 400, 
                 200, 
                 200, 
                 window.innerWidth/2 - 150, 
                 window.innerHeight/2 - 200, 
                 "README.TXT", 
                 ReadMeContents, 
                 fileIcon,
                 desktopIconX,
                 desktopIconY,
                 0,
                 0);
  }

  function startDrag(event) {
    dragControls.start(event, { snapToCursor: false })
  }

  const dragConstraints = {
    top: -originalHeight,
    left: -originalWidth
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      style={styleProps()}
      onClick={handleClick}
      ref={thisElement}
      className="my-2 mx-2"
      onDoubleClick={handleDoubleClick}
      dragConstraints={dragConstraints}
      id="readMeFile"
      >
      <motion.img
        draggable={false}
        height="60px"
        width="60px"
        src={fileIcon}
        alt="File Icon"
        onPointerDown={startDrag} />
      <p className="icon-text mb-0">README</p>
    </motion.div>
  )
}
