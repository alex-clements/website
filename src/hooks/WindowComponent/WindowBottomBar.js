import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function WindowBottomBar(props) {
  const [currentY, setCurrentY] = useState(props.windowHeight);
  const [startingY, setStartingY] = useState(props.windowHeight);
  const barRef = useRef();

  const bottomBarStyle = () => {
    return ({
    "height": props.isActive ? "2px" : "1px",
    "width": "100%",
    "backgroundColor": "#808080",
    "position": "absolute",
    "cursor": "ns-resize",
    "bottom": "0px"
    })
  }

  const handleDrag = (e) => {
    var diff = currentY - startingY;
    props.onDragBar(diff, true);
    setCurrentY(e.nativeEvent.clientY);
  }

  const handleDragStart = (e) => {
    setCurrentY(e.nativeEvent.clientY);
    setStartingY(barRef.current.getBoundingClientRect().y);

    var crt = e.target.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.opacity = 0;
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  }

  const handleDragEnd = () => {
    props.onDragBottomBarEnd();
  }


  return (
        <div
          className="bottom-bar"
          style={bottomBarStyle()}
          ref={barRef}
          draggable={true}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          >
        </div>
  )
}
