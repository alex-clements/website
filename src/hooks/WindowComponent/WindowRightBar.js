import React, { useState, useRef } from 'react';

export default function WindowRightBar(props) {
  const [currentX, setCurrentX] = useState(props.windowWidth);
  const [startingX, setStartingX] = useState(props.windowWidth);
  const barRef = useRef();

  /**
   * @returns An object with the component styling. Styling changes depending on whether
   * the window component is active or not.
   */
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

  /**
   * Handler function for a drag event on the right border of the window component.
   * Updates the current X position of the element and calls the onDragBar function 
   * on the parent component.
   * @param {React.DragEvent} e 
   */
  const handleDrag = (e) => {
    var diff = currentX - startingX;
    props.onDragBar(diff, true);
    setCurrentX(e.nativeEvent.clientX);
  }

  /**
   * Handler function to start the drag event on the component.
   * Updates the current and starting X positions of the component.
   * Makes the dragging ghost image invisible.
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
   * Handler function for ending the drag event on the right bar. 
   * Calls the onDragRightBarEnd function in the parent component.
   * @param {React.DragEvent} e 
   */
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
