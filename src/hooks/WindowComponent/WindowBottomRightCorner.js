import React, {useState, useRef} from 'react';

export default function WindowBottomRightCorner(props) {
    const [currentY, setCurrentY] = useState(0);
    const [startingY, setStartingY] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [startingX, setStartingX] = useState(0);
    const cornerRef = useRef();

    /**
     * Sets the style of the component depending on whether it is active or not.
     * @returns 
     */
    const secondStyle = () => {
        return ({"borderWidth": props.isActive ? "2px" : "1px"})
      }

      /**
       * Starts a drag event. Sets the current Y and X positions of the dragged element.
       * Calculates the difference between the starting Y and X positions and the current positions.
       * Calls the onDragBottomRightCorner function in the parent component.
       * @param {React.DragEvent} e 
       */
    const handleDrag = (e) => {
        var yDiff = startingY - currentY;
        var xDiff = startingX - currentX;
        props.onDragBottomRightCorner(xDiff, yDiff, true);
        setCurrentY(e.nativeEvent.clientY);
        setCurrentX(e.nativeEvent.clientX)
      }
    
      /**
       * Sets the current and starting Y and X positions of the corner elements. 
       * Makes the ghost dragging image invisible.
       * @param {React.DragEvent} e 
       */
      const handleDragStart = (e) => {
        setCurrentY(e.nativeEvent.clientY);
        setStartingY(cornerRef.current.getBoundingClientRect().bottom);

        setCurrentX(e.nativeEvent.clientX);
        setStartingX(cornerRef.current.getBoundingClientRect().right)
    
        var crt = e.target.cloneNode(true);
        crt.style.backgroundColor = "red";
        crt.style.opacity = 0;
        document.body.appendChild(crt);
        e.dataTransfer.setDragImage(crt, 0, 0);
      }

      /**
       * Sets the current Y and X position on a touch event.
       * @param {React.TouchEvent} e 
       */
      const handleDragStartTouch = (e) => {
        setCurrentY(e.touches[0].clientY);
        setStartingY(cornerRef.current.getBoundingClientRect().bottom);

        setCurrentX(e.touches[0].clientX);
        setStartingX(cornerRef.current.getBoundingClientRect().right)
      }
    
      /**
       * Ends the drag event by calling the onDragBottomRightCornerEnd method on the parent component.
       */
      const handleDragEnd = () => {
        props.onDragBottomRightCornerEnd();
      }

  return (
    <div
    ref={cornerRef}
    draggable={true}
    onDrag={handleDrag}
    onTouchMove={handleDrag}
    onDragStart={handleDragStart}
    onTouchStart={handleDragStartTouch}
    onDragEnd={handleDragEnd}
    onTouchEnd={handleDragEnd}
    style={secondStyle()}
    className="window-component-bottom-right-corner"
    >
  </div>
  )
}
