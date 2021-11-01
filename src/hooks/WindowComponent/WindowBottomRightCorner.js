import React, {useState, useRef} from 'react';
import {motion} from 'framer-motion';


export default function WIndowBottomRightCorner(props) {
    const [currentY, setCurrentY] = useState(0);
    const [startingY, setStartingY] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [startingX, setStartingX] = useState(0);
    const cornerRef = useRef();

    const secondStyle = () => {
        return ({
        "borderWidth": props.isActive ? "2px" : "1px"
      })
      }

    const handleDrag = (e) => {
        var yDiff = startingY - currentY;
        var xDiff = startingX - currentX;
        props.onDragBottomRightCorner(xDiff, yDiff, true);
        setCurrentY(e.nativeEvent.clientY);
        setCurrentX(e.nativeEvent.clientX)
      }
    
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

      const handleDragStartTouch = (e) => {
        setCurrentY(e.nativeEvent.clientY);
        setStartingY(cornerRef.current.getBoundingClientRect().bottom);

        setCurrentX(e.nativeEvent.clientX);
        setStartingX(cornerRef.current.getBoundingClientRect().right)
      }
    
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
