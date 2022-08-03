import React, { useState, useEffect, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import "./DesktopFile.css";

export default function ReadMeFile(props) {
  const [isActive, setIsActive] = useState(false);
  const [initialY, setInitialY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [xOffset, setXOffset] = useState(props.initialX);
  const [yOffset, setYOffset] = useState(props.initialY);
  const [currentX, setCurrentX] = useState(props.initialX);
  const [currentY, setCurrentY] = useState(props.initialY);
  const thisElement = useRef();
  const dragControls = useDragControls();
  const fileIcon = props.fileIcon;
  const FileContents = props.contents;
  const name = props.name;
  const fileId = props.fileId;

  /**
   * Triggered upon component mount
   * Sets the initial x and initial y positions of the file
   * Sets the initial width and initial height of the file
   */
  useEffect(() => {
    document.addEventListener("mousedown", outsideClickListener);

    setInitialY(thisElement.current.getBoundingClientRect().y);
    setInitialX(thisElement.current.getBoundingClientRect().x);

    return function cleanup() {
      document.removeEventListener("mousedown", outsideClickListener);
    };
  }, []);

  /**
   * Handler function for the outside click listener. Sets the file to active
   * when clicked, otherwise
   * @param {React.MouseEvent} e
   */
  const outsideClickListener = (e) => {
    if (thisElement.current.contains(e.target)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  /**
   * @returns Style prop object, changing based on the active state, dragging status, x position,
   * and y position of the component.
   */
  const styleProps = () => {
    return {
      width: "80px",
      borderStyle: "solid",
      borderColor: isActive ? "white" : "transparent",
      zIndex: dragging ? 1000 : 2,
      borderWidth: "1px",
      overflow: "hidden",
      transform: "translate3d(" + currentX + "px," + currentY + "px,0px)",
    };
  };

  /**
   * Handler function to set the active status oc the component to true when clicked on.
   */
  const handleClick = () => {
    setIsActive(true);
  };

  /**
   * Handler function for a double click event.
   */
  const handleDoubleClick = () => {
    var desktopIconX = 0;
    var desktopIconY = 0;
    var initialWindowWidth =
      props.initialWidth == null
        ? (window.innerWidth * 3) / 4
        : props.initialWidth;
    var initialWindowHeight =
      props.initialHeight == null
        ? (window.innerHeight * 3) / 4
        : props.initialHeight;
    var initialTop = window.innerHeight / 2 - initialWindowHeight / 2;
    var initialLeft = window.innerWidth / 2 - initialWindowWidth / 2;

    var data = {
      activeID: fileId,
      initialWindowWidth: initialWindowWidth,
      initialWindowHeight: initialWindowHeight,
      minWindowWidth: 200,
      minWindowHeight: 200,
      initialLeft: initialLeft,
      initialTop: initialTop,
      windowTitle: name,
      component: FileContents,
      icon: fileIcon,
      desktopIconX: desktopIconX,
      desktopIconY: desktopIconY,
      menuIconX: 0,
      menuIconY: 0,
    };

    props.onOpen(data);
  };

  /**
   * Handler function for a drag start event. Sets the initial X and Y positions of the component.
   * @param {React.DragEvent} e
   */
  const dragStart = (e) => {
    dragControls.start(e, { snapToCursor: false });

    if (e.type == "touchstart") {
      setInitialX(e.touches[0].clientX - xOffset);
      setInitialY(e.touches[0].clientY - yOffset);
    } else {
      e.dataTransfer.setData("drag-item", props.fileId);
      setInitialX(e.clientX - xOffset);
      setInitialY(e.clientY - yOffset);
    }
    setTimeout(handleDragStart, 10);
  };

  /**
   * Handler function for a drag start event. Sets the dragging flag to true.
   */
  const handleDragStart = () => {
    setDragging(true);
  };

  /**
   * Handler function for the end of a drag event. Sets the initial X and initial Y positions
   * to the current X and Y positions. Sets the dragging state flag to false.
   * @param {React.DragEvent} e
   */
  const dragEnd = (e) => {
    setInitialX(currentX);
    setInitialY(currentY);
    setDragging(false);
  };

  /**
   * Handler function for a drag event. Sets the current X and Y position the
   * X and Y offsets from the original positions.
   * @param {React.DragEvent} e
   */
  const drag = (e) => {
    if (dragging) {
      if (e.type === "touchmove") {
        setCurrentX(e.touches[0].clientX - initialX);
        setCurrentY(e.touches[0].clientY - initialY);
      } else {
        e.preventDefault();
        setCurrentX(e.clientX - initialX);
        setCurrentY(e.clientY - initialY);
      }
      setXOffset(currentX);
      setYOffset(currentY);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && isActive) {
      handleDoubleClick();
    }
  };

  return (
    <div
      draggable={true}
      style={styleProps()}
      onClick={handleClick}
      ref={thisElement}
      className="my-2 mx-2 desktop-file"
      onDoubleClick={handleDoubleClick}
      onDragStart={dragStart}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onDragEnd={dragEnd}
      onTouchMove={drag}
      onDrag={drag}
      id={props.id}
      tabindex="0"
      onFocus={handleClick}
      onBlur={() => setIsActive(false)}
      onKeyDown={handleKeyDown}
    >
      <motion.img
        draggable={false}
        height="60px"
        width="60px"
        src={fileIcon}
        alt="File Icon"
        // onPointerDown={startDrag}
      />
      <p className="icon-text mb-0">{name}</p>
    </div>
  );
}
