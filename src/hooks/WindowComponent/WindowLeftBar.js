import React, { useState, useRef } from 'react';

export default function WindowLeftBar(props) {
  const [currentX, setCurrentX] = useState(props.windowHeight);
  const [startingX, setStartingX] = useState(props.windowHeight);
  const barRef = useRef();

  /**
   * @returns Object with styling for the component. Styling changes depending on whether 
   * the window is active or not.
   */
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

  /**
   * Handler function for a drag event on the left border. This calls the onDragBar function 
   * in the parent component.
   * @param {React.DragEvent} e 
   */
  const handleDrag = (e) => {
    var diff = startingX - currentX;
    props.onDragBar(diff, true);
    setCurrentX(e.nativeEvent.clientX);
  }

  /**
   * Handler function to start a drag event. Updates the current and starting X positions, and
   * makes the ghost dragging image invisible.
   * @param {React.DragEvent} e 
   */
  const handleDragStart = (e) => {
    setCurrentX(e.nativeEvent.clientX);
    setStartingX(barRef.current.getBoundingClientRect().x);

    var crt = e.target.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.opacity = 0;
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  }

  /**
   * Handler function to end the drag event. Calls the onDragLeftBarEnd function in the 
   * parent component.
   */
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
