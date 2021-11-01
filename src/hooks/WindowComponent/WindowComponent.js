import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import './WindowComponent.css';
import WindowTopBar from './windowTopBar.js';
import WindowBottomBar from './WindowBottomBar.js';
import WindowLeftBar from './WindowLeftBar.js';
import WindowRightBar from './WindowRightBar.js';
import WindowBottomRightCorner from './WindowBottomRightCorner.js';

export default function WindowComponent(props) {
  const initialWindowWidth = props.initialWindowWidth;
  const initialWindowHeight = props.initialWindowHeight;
  const minWindowWidth = props.minWindowWidth;
  const minWindowHeight = props.minWindowHeight;
  const initialLeft = props.initialLeft;
  const initialTop = props.initialTop;
  const windowTitle = props.windowTitle;

  const [windowTop, setWindowTop] = useState(initialTop);
  const [draggingWindowTop, setDraggingWindowTop] = useState(initialTop);
  const [windowHeight, setWindowHeight] = useState(initialWindowHeight);
  const [draggingWindowHeight, setDraggingWindowHeight] = useState(initialWindowHeight);
  const [topDragConstraint, setTopDragConstraint] = useState(-initialTop);
  const [topDraggingDragConstraint, setDraggingTopDragConstraint] = useState(-initialTop);

  const [windowWidth, setWindowWidth] = useState(initialWindowWidth);
  const [draggingWindowWidth, setDraggingWindowWidth] = useState(initialWindowWidth);
  const [windowLeft, setWindowLeft] = useState(initialLeft);
  const [draggingWindowLeft, setDraggingWindowLeft] = useState(initialLeft);
  const [leftDragConstraint, setLeftDragConstraint] = useState(-initialLeft);
  const [leftDraggingDragConstraint, setLeftDraggingDragConstraint] = useState(-initialLeft);

  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isActive, setIsActive] = useState(props.activeStatus);
  const [dragging, setDragging] = useState(false);

  const [maximizing, setMaximizing] = useState(false);
  const [maximizedFlag, setMaximizedFlag] = useState(false);

  const [minimizing, setMinimizing] = useState(false);
  const [minimizedFlag, setMinimizedFlag] = useState(props.minimizedFlag);

  const dragControls = useDragControls()
  const thisElement = useRef()

  useEffect(() => {
    setMounted(true);
    document.addEventListener('mousedown', outsideClickListener);
    console.log(props.desktopIconX);
    console.log(props.desktopIconY);

    return function cleanup() {
      document.removeEventListener('mousedown', outsideClickListener)
    }
  }, []);

  useEffect(() => {
    setIsActive(props.activeStatus);
    // if (minimizedFlag == true && props.minimizedFlag == false) {
    //   handleMinimize();
    // }
  }, [props])

  useEffect(() => {
    if (mounted) {
      handleMinimize();
    }
  }, [props.minimizedFlag])

  const outsideClickListener = (e) => {
    if (thisElement.current == null) {
      return
    }
    if (thisElement.current.contains(e.target)) {
      props.handleActiveStatusChange(props.index);
    }
  }

  function startDrag(event) {
    dragControls.start(event, { snapToCursor: false })
  }

  const animateVals = () => {
    return (
    {
      opacity: minimizedFlag ? 0 : (exiting ? 0 : 1),
      height: (dragging ? draggingWindowHeight : windowHeight),
      top: (dragging ? draggingWindowTop : windowTop),
      width: (dragging ? draggingWindowWidth : windowWidth),
      left: (dragging ? draggingWindowLeft : windowLeft),
      scale: minimizedFlag ? 0 : (exiting ? 0 : 1)
  })}

  const initialVals = {
    scale: 0,
    opacity: 0,
    top: windowTop,
    left: windowLeft,
    width: windowWidth,
    height: windowHeight
  }

  const handleMinimize = () => {
    if (!minimizedFlag) {
      setMinimizing(true);
      setMinimizedFlag(true);
      // props.handleMinimize(props.index);
      setTimeout(function() {setMinimizing(false)}, 1000);
    } else {
      setMinimizing(true);
      setMinimizedFlag(false);
      setTimeout(function() {setMinimizing(false)}, 1000);
    }
    
  }

  const updatePropsMinimizedFlag = () => {
    props.handleMinimize(props.index);
  }

  const transitionProps = () => {
    if (!mounted || exiting || maximizing || minimizing) {
      return (
        {
          duration: 0.3
        })}
    return (
      {
        ease: "linear",
        duration: 0
      })}

  const handleClose = () => {
    setExiting(true);
    setTimeout(function() {props.test(props.index);}, 300);
  }

  const handleDragTopBar = (diff, dragging) => {
    if (windowHeight + diff >= minWindowHeight) {
      setDraggingWindowHeight(windowHeight + diff);
      setDraggingWindowTop(windowTop - diff);
      setDraggingTopDragConstraint(topDragConstraint + diff);
    }
    setDragging(dragging);
  }

  const handleDragTopBarEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setWindowTop(draggingWindowTop);
    setTopDragConstraint(topDraggingDragConstraint);
    setDragging(false);
  }

  const handleDragBottomBar = (diff, dragging) => {
    if (windowHeight + diff >= minWindowHeight) {
      setDraggingWindowHeight(windowHeight + diff);
    }
    setDragging(dragging);
  }

  const handleDragBottomBarEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setDragging(false);
  }

  const handleDragRightBar = (diff, dragging) => {
    if (windowWidth + diff >= minWindowWidth) {
      setDraggingWindowWidth(windowWidth + diff);
    }
    setDragging(dragging);
  }

  const handleDragRightBarEnd = () => {
    setWindowWidth(draggingWindowWidth);
    setDragging(false);
  }

  const handleDragLeftBar = (diff, dragging) => {
    if (windowWidth + diff >= minWindowWidth) {
      setDraggingWindowWidth(windowWidth + diff);
      setDraggingWindowLeft(windowLeft - diff);
      setLeftDraggingDragConstraint(leftDragConstraint + diff);
    }
    setDragging(dragging);
  }

  const handleDragLeftBarEnd = () => {
    setWindowWidth(draggingWindowWidth);
    setWindowLeft(draggingWindowLeft);
    setLeftDragConstraint(leftDraggingDragConstraint);
    setDragging(false);
  }

  const handleDragBottomRightCorner = (xDiff, yDiff, dragging) => {
    if ((windowHeight - yDiff) > minWindowHeight) {
      setDraggingWindowHeight(windowHeight - yDiff);
    }

    if ((windowWidth - xDiff) > minWindowWidth) {
      setDraggingWindowWidth(windowWidth - xDiff);
    }
    setDragging(dragging);
  }

  const handleDragBottomRightCornerEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setWindowWidth(draggingWindowWidth);
    setDragging(false);
  }

  const handleMaximize = () => {
    if (!maximizedFlag) {
      setMaximizing(true);
      setMaximizedFlag(true);
      setWindowTop(windowTop - thisElement.current.getBoundingClientRect().top);
      setWindowHeight(window.innerHeight - 40);
      setWindowLeft(windowLeft - thisElement.current.getBoundingClientRect().left);
      setWindowWidth(window.innerWidth);
      
    } else {
      setMaximizedFlag(false);
      setWindowTop(draggingWindowTop);
      setWindowHeight(draggingWindowHeight);
      setWindowLeft(draggingWindowLeft);
      setWindowWidth(draggingWindowWidth);
      setTimeout(function() {
        setMaximizing(false)
      }, 500)
    }
  }

  const dragConstraintsProps = () => {
    return (
    {
    left: dragging ? leftDraggingDragConstraint : leftDragConstraint,
    top: dragging ? topDraggingDragConstraint : topDragConstraint
    })}

  const componentStyle = () => {
    return (
      {
        "zIndex": isActive ? 100: 1,
        "filter": isActive ? "brightness(100%) grayscale(0%) drop-shadow(3px 3px 3px black)" : "brightness(80%) grayscale(30%) drop-shadow(0 0)"
      })}

  return (
    <motion.div
      drag
      dragPropagation={true}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={dragConstraintsProps()}
      dragElastic={0}
      initial={initialVals}
      animate={animateVals()}
      transition={transitionProps()}
      className="test-component-main"
      style={componentStyle()}
      id={props.id}
      ref={thisElement}
      >
        <WindowTopBar isActive={isActive} onDragBar={handleDragTopBar} onDragTopBarEnd={handleDragTopBarEnd}/>
        <WindowLeftBar isActive={isActive} onDragBar={handleDragLeftBar} onDragLeftBarEnd={handleDragLeftBarEnd}/>
        <div className="container-fluid px-0">
        <motion.div onPointerDown={maximizedFlag ? null : startDrag} className="header-bar row mx-0">
            <div className="col-6 px-0 d-flex justify-content-start">
              <img className="mt-1" height="20px" src={props.icon} />
              <p className="font-header-bar my-0 mx-2">{windowTitle}</p>
            </div>
            <div className="col-6 px-0 d-flex justify-content-end">
              <div>
                <button className="window-button" onClick={updatePropsMinimizedFlag}>_</button>
                <button className="window-button" onClick={handleMaximize}>❏</button>
                <button className="window-button" onClick={handleClose}>✕</button>
              </div>
            </div>
        </motion.div>
            <div className="py-2 px-2 window-component-contents-border">
            {props.passedComponent()}
            </div>
        </div>
        <WindowRightBar isActive={isActive} onDragBar={handleDragRightBar} onDragRightBarEnd={handleDragRightBarEnd}/>
        <WindowBottomRightCorner isActive={isActive} onDragBottomRightCorner={handleDragBottomRightCorner} onDragBottomRightCornerEnd={handleDragBottomRightCornerEnd} />
        <WindowBottomBar isActive={isActive} onDragBar={handleDragBottomBar} onDragBottomBarEnd={handleDragBottomBarEnd} windowHeight={draggingWindowHeight}/>

    </motion.div>
  )
}
