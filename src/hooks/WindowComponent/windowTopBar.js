import React, { useState, useRef } from 'react';

export default function WindowTopBar(props) {
  const [currentY, setCurrentY] = useState(0);
  const [startingY, setStartingY] = useState(0)
  const barRef = useRef();

  const secondStyle = () => {
    return ({
    "height": props.isActive ? "2px" : "1px",
    "width": "100%",
    "backgroundColor": "#FFFFFF",
    "position": "absolute",
    "cursor": "ns-resize"
  })
  }

  const handleDrag = (e) => {
    var diff = startingY - currentY;
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
    props.onDragTopBarEnd();
  }

  return (
        <div
          ref={barRef}
          draggable={true}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={secondStyle()}
          >
        </div>
  )
}
