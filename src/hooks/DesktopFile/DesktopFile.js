import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import './DesktopFile.css';

export default function ReadMeFile(props) {
  const [isActive, setIsActive] = useState(false);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const thisElement = useRef();
  const dragControls = useDragControls()
  const fileIcon = props.fileIcon;
  const FileContents = props.contents;
  const name = props.name;
  const fileId = props.fileId

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickListener);
    setOriginalHeight(thisElement.current.getBoundingClientRect().y);
    setOriginalWidth(thisElement.current.getBoundingClientRect().x);

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
        "borderWidth": "1px",
        "overflow": "hidden"
      })}

  const handleClick = () => {
    setIsActive(true);
  }

  const handleDoubleClick = () => {
    var desktopIconX = 0;
    var desktopIconY = 0;
    var initialWindowWidth = props.initialWidth == null ? window.innerWidth * 3 / 4 : props.initialWidth;
    var initialWindowHeight = props.initialHeight == null ? window.innerHeight * 3 / 4 : props.initialHeight;


    // const addWindow = (activeID,
    //     initialWindowWidth,
    //     initialWindowHeight,
    //     minWindowWidth, 
    //     minWindowHeight, 
    //     initialLeft, 
    //     initialTop, 
    //     windowTitle, 
    //     component, 
    //     icon,
    //     desktopIconX,
    //     desktopIconY,
    //     menuIconX,
    //     menuIconY)
    props.onOpen(fileId, 
                 initialWindowWidth, 
                 initialWindowHeight, 
                 200, 
                 200, 
                 window.innerWidth/2 - initialWindowWidth / 2, 
                 window.innerHeight/2 - initialWindowHeight / 2, 
                 name, 
                 FileContents, 
                 fileIcon,
                 desktopIconX,
                 desktopIconY,
                 0,
                 0);
  }

  function startDrag(event) {
    dragControls.start(event, { snapToCursor: false })
  }

  const dragConstraints = () => {
    return (
      {
        top: -originalHeight,
        left: -originalWidth
      }
    )

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
      dragConstraints={dragConstraints()}
      id={props.id}
      >
      <motion.img
        draggable={false}
        height="60px"
        width="60px"
        src={fileIcon}
        alt="File Icon"
        onPointerDown={startDrag} />
      <p className="icon-text mb-0">{name}</p>
    </motion.div>
  )
}
