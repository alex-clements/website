import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import './DesktopFile.css';

export default function ReadMeFile(props) {
  const [isActive, setIsActive] = useState(false);
  const [initialY, setInitialY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const thisElement = useRef();
  const dragControls = useDragControls()
  const fileIcon = props.fileIcon;
  const FileContents = props.contents;
  const name = props.name;
  const fileId = props.fileId

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickListener);

    const box = thisElement.current.getBoundingClientRect();

    setInitialY(thisElement.current.getBoundingClientRect().y);
    setInitialX(thisElement.current.getBoundingClientRect().x);

    setOriginalWidth(box.width);
    setOriginalHeight(box.height);

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
        "zIndex" : dragging ? 1000 : 2,
        "borderWidth": "1px",
        "overflow": "hidden",
        "transform": "translate3d(" + currentX + "px," + currentY + "px,0px)"
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

  const dragStart = (e) => {
    dragControls.start(e, { snapToCursor: false })
    
    if (e.type == "touchstart") {
      setInitialX(e.touches[0].clientX - xOffset);
      setInitialY(e.touches[0].clientY - yOffset);
    } else {
      e.dataTransfer.setData("drag-item", props.fileId);
      setInitialX(e.clientX - xOffset);
      setInitialY(e.clientY - yOffset);
    }
    setTimeout(handleDragStart, 10);
  }

  const handleDragStart = () => {
    setDragging(true);
  }

  const dragEnd = (e) => {
    setInitialX(currentX);
    setInitialY(currentY);

    setDragging(false);
  }

  const drag = (e) => {
    if (dragging) {
      

      if (e.type === "touchmove") {
        setCurrentX(e.touches[0].clientX - initialX);
        setCurrentY(e.touches[0].clientY - initialY);
      } else {
        e.preventDefault();
        setCurrentX(e.clientX - initialX);
        setCurrentY(e.clientY - initialY);
      }

      setXOffset(currentX);
      setYOffset(currentY);
    }
  }

  return (
    <div
      draggable={true}
      style={styleProps()}
      onClick={handleClick}
      ref={thisElement}
      className="my-2 mx-2 desktop-file"
      onDoubleClick={handleDoubleClick}
      onDragStart={dragStart}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onDragEnd={dragEnd}
      onTouchMove={drag}
      onDrag={drag}
      id={props.id}
      >
      <motion.img
        draggable={false}
        height="60px"
        width="60px"
        src={fileIcon}
        alt="File Icon"
        // onPointerDown={startDrag} 
        />
      <p className="icon-text mb-0">{name}</p>
    </div>
  )
}
