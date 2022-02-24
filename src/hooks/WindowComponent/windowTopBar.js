import React, { useState, useRef } from 'react';

export default function WindowTopBar(props) {
  const [currentY, setCurrentY] = useState(0);
  const [startingY, setStartingY] = useState(0)
  const barRef = useRef();

  /**
   * @returns an object with the component styling. Styling changes depending
   * on whether or not the window component is active.
   */
  const secondStyle = () => {
    return ({
    "height": props.isActive ? "2px" : "1px",
    "width": "100%",
    "backgroundColor": "#FFFFFF",
    "position": "absolute",
    "cursor": "ns-resize"
  })
  }

  /**
   * Handler function for a drag event on the window component top border.
   * Updates the current Y position of the component.
   * Calls the onDragBar function in the parent component.
   * @param {React.DragEvent} e 
   */
  const handleDrag = (e) => {
    var diff = startingY - currentY;
    props.onDragBar(diff, true);
    setCurrentY(e.nativeEvent.clientY);
  }

  /**
   * Handler function to begin the dragging event on the window component top border.
   * Updates the current and starting Y positions. 
   * Makes the dragging ghost image invisible.
   * @param {React.DragEvent} e 
   */
  const handleDragStart = (e) => {
    setCurrentY(e.nativeEvent.clientY);
    setStartingY(barRef.current.getBoundingClientRect().y);

    var crt = e.target.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.opacity = 0;
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  }

  /**
   * Handler function to end the drag event on this component.
   * Calls the onDragTopBarEnd function on the parent component.
   */
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
