import React, { useState, useRef } from 'react';

export default function WindowRightBar(props) {
  const [currentX, setCurrentX] = useState(props.windowWidth);
  const [startingX, setStartingX] = useState(props.windowWidth);
  const barRef = useRef();

  const styleProps = () => {
    return ({
    "height": "100%",
    "width": props.isActive ? "2px" : "1px",
    "backgroundColor": "#808080",
    "position": "absolute",
    "cursor": "ew-resize",
    "right": "0px"
    })
  }

  const handleDrag = (e) => {
    var diff = currentX - startingX;
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

  const handleDragEnd = (e) => {
    props.onDragRightBarEnd();
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
