import React, { useState, useRef } from 'react';

export default function WindowBottomBar(props) {
  const [currentY, setCurrentY] = useState(props.windowHeight);
  const [startingY, setStartingY] = useState(props.windowHeight);
  const barRef = useRef();

  /**
   * Styling for the bottom bar component
   * @returns 
   */
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

  /**
   * Calculates the difference between the starting Y position and the current Y position.
   * Sends this difference to the onDragBar function in the parent component.
   * @param {React.DragEvent} e 
   */
  const handleDrag = (e) => {
    var diff = currentY - startingY;
    props.onDragBar(diff, true);
    setCurrentY(e.nativeEvent.clientY);
  }

  /**
   * Starts a drag event for the bottom window bar. Sets the current and starting y positions. 
   * Makes the ghost dragging image invisible.
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
   * Calls the onDragBottomBar end function on the parent component.
   */
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
