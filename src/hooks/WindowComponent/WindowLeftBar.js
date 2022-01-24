import React, { useState, useRef } from 'react';

export default function WindowLeftBar(props) {
  const [currentX, setCurrentX] = useState(props.windowHeight);
  const [startingX, setStartingX] = useState(props.windowHeight);
  const barRef = useRef();

  const styleProps = () => {
    return ({
    "height": "100%",
    "width": props.isActive ? "2px" : "1px",
    "backgroundColor": "#FFFFFF",
    "position": "absolute",
    "cursor": "ew-resize",
    "float": "left"
  })
  }

  const handleDrag = (e) => {
    var diff = startingX - currentX;
    props.onDragBar(diff, true);
    setCurrentX(e.nativeEvent.clientX);
  }

  const handleDragStart = (e) => {
    setCurrentX(e.nativeEvent.clientX);
    setStartingX(barRef.current.getBoundingClientRect().x);

    var crt = e.target.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.opacity = 0;
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  }

  const handleDragEnd = () => {
    props.onDragLeftBarEnd();
  }

  return (
        <div
          style={styleProps()}
          ref={barRef}
          draggable={true}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          >
        </div>
  )
}
