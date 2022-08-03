import React, { useState, useEffect, useRef } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import "./WindowComponent.css";
import WindowTopBar from "./windowTopBar.js";
import WindowBottomBar from "./WindowBottomBar.js";
import WindowLeftBar from "./WindowLeftBar.js";
import WindowRightBar from "./WindowRightBar.js";
import WindowBottomRightCorner from "./WindowBottomRightCorner.js";
import WindowHeaderBarButtons from "./WindowHeaderBarButtons.js";
import WindowHeaderBarTitle from "./WindowHeaderBarTitle.js";

export default function WindowComponent(props) {
  const initialWindowWidth = props.data.initialWindowWidth;
  const initialWindowHeight = props.data.initialWindowHeight;
  const minWindowWidth = props.data.minWindowWidth;
  const minWindowHeight = props.data.minWindowHeight;
  const initialLeft = props.data.initialLeft;
  const initialTop = props.data.initialTop;
  const windowTitle = props.data.windowTitle;

  const [windowTop, setWindowTop] = useState(initialTop);
  const [draggingWindowTop, setDraggingWindowTop] = useState(initialTop);
  const [windowHeight, setWindowHeight] = useState(initialWindowHeight);
  const [draggingWindowHeight, setDraggingWindowHeight] =
    useState(initialWindowHeight);
  const [topDragConstraint, setTopDragConstraint] = useState(-initialTop);
  const [topDraggingDragConstraint, setDraggingTopDragConstraint] = useState(
    -initialTop
  );

  const [windowWidth, setWindowWidth] = useState(initialWindowWidth);
  const [draggingWindowWidth, setDraggingWindowWidth] =
    useState(initialWindowWidth);
  const [windowLeft, setWindowLeft] = useState(initialLeft);
  const [draggingWindowLeft, setDraggingWindowLeft] = useState(initialLeft);
  const [leftDragConstraint, setLeftDragConstraint] = useState(-initialLeft);
  const [leftDraggingDragConstraint, setLeftDraggingDragConstraint] = useState(
    -initialLeft
  );

  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isActive, setIsActive] = useState(props.data.activeStatus);
  const [dragging, setDragging] = useState(false);

  const [maximizing, setMaximizing] = useState(false);
  const [maximizedFlag, setMaximizedFlag] = useState(false);

  const [minimizing, setMinimizing] = useState(false);
  const [minimizedFlag, setMinimizedFlag] = useState(props.data.minimizedFlag);

  const dragControls = useDragControls();
  const thisElement = useRef();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /**
   * Triggered upon component load.
   * Adds a click event listener to to determine if a click was inside or outside the window.
   */
  useEffect(() => {
    setMounted(true);
    document.addEventListener("mousedown", outsideClickListener);

    return function cleanup() {
      document.removeEventListener("mousedown", outsideClickListener);
    };
  }, []);

  /**
   * Triggered upon the update of the data prop.
   * Sets the minimized status of the current window.
   * Updates the active status of the current window.
   */
  useEffect(() => {
    setIsActive(props.data.activeStatus);
    if (mounted && props.data.minimizedFlag != minimizedFlag) {
      handleMinimize();
    }
  }, [props.data]);

  /**
   * Handler function for the outside click listener.
   * @param {React.MouseEvent} e
   */
  const outsideClickListener = (e) => {
    if (thisElement.current == null) {
      return;
    }
    if (thisElement.current.contains(e.target)) {
      props.handleActiveStatusChange(props.data.id);
    }
  };

  /**
   * Function to start a drag event to move the window component.
   * @param {React.DragEvent} event
   */
  function startDrag(event) {
    dragControls.start(event, { snapToCursor: false });
  }

  /**
   * Function to set the animation values for the window component.
   * @returns An object with the animation values.
   */
  const animateVals = () => {
    return {
      opacity: minimizedFlag ? 0 : exiting ? 0 : 1,
      height: dragging ? draggingWindowHeight : windowHeight,
      top: dragging ? draggingWindowTop : windowTop,
      width: dragging ? draggingWindowWidth : windowWidth,
      left: dragging ? draggingWindowLeft : windowLeft,
      scale: minimizedFlag ? 0 : exiting ? 0 : 1,
    };
  };

  /**
   * Object with the initial scale, opacity, top position, left position, width and height of the window.
   */
  const initialAnimationVals = {
    scale: 0,
    opacity: 0,
    top: windowTop,
    left: windowLeft,
    width: windowWidth,
    height: windowHeight,
  };

  /**
   * Handler function to minimize the window.
   */
  const handleMinimize = () => {
    if (!minimizedFlag) {
      setMinimizing(true);
      setMinimizedFlag(true);
      setTimeout(function () {
        setMinimizing(false);
      }, 1000);
    } else {
      setMinimizing(true);
      setMinimizedFlag(false);
      setTimeout(function () {
        setMinimizing(false);
      }, 1000);
    }
  };

  /**
   * Calls the handleMinimize function on the parent component. This makes the window component invisible.
   */
  const updatePropsMinimizedFlag = () => {
    props.handleMinimize(props.data.id);
  };

  /**
   * @returns object with the animation props for mounting, exiting, minimizing, or maximizing the component.
   */
  const transitionProps = () => {
    if (!mounted || exiting || maximizing || minimizing) {
      return { duration: 0.3 };
    }
    return { ease: "linear", duration: 0 };
  };

  /**
   * Handler function for closing a window. This removes the window from the parent's active windows object.
   */
  const handleClose = () => {
    setExiting(true);
    setTimeout(function () {
      props.onRemoveWindow(props.data.id);
    }, 300);
  };

  /**
   * Handler function for an event dragging the top bar of the window component.
   * @param {number} diff
   * @param {boolean} dragging
   */
  const handleDragTopBar = (diff, dragging) => {
    if (windowHeight + diff >= minWindowHeight) {
      setDraggingWindowHeight(windowHeight + diff);
      setDraggingWindowTop(windowTop - diff);
      setDraggingTopDragConstraint(topDragConstraint + diff);
    }
    setDragging(dragging);
  };

  /**
   * Handler function to end the top bar dragging event.
   * Updates the window height, the top position of the window, the top dragging constraint
   * (so the window can not be dragged off the top of the screen), and sets the dragging
   * flag to "false".
   */
  const handleDragTopBarEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setWindowTop(draggingWindowTop);
    setTopDragConstraint(topDraggingDragConstraint);
    setDragging(false);
  };

  /**
   * Handler function for the dragging of the bottom border of the window component.
   * @param {number} diff
   * @param {boolean} dragging
   */
  const handleDragBottomBar = (diff, dragging) => {
    if (windowHeight + diff >= minWindowHeight) {
      setDraggingWindowHeight(windowHeight + diff);
    }
    setDragging(dragging);
  };

  /**
   * Handler function to end the bottom bar dragging event.
   * Updates the window height and sets the dragging flag to false.
   */
  const handleDragBottomBarEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setDragging(false);
  };

  /**
   * Handler function for the right bar dragging event.
   * Ensures that a window is not compressed beyond its minimim width.
   * @param {number} diff
   * @param {boolean} dragging
   */
  const handleDragRightBar = (diff, dragging) => {
    if (windowWidth + diff >= minWindowWidth) {
      setDraggingWindowWidth(windowWidth + diff);
    }
    setDragging(dragging);
  };

  /**
   * Handler function for ending the drag event of the right bar.
   * Updates the window width and sets the dragging state flag to false.
   */
  const handleDragRightBarEnd = () => {
    setWindowWidth(draggingWindowWidth);
    setDragging(false);
  };

  /**
   * Handler function for an event dragging the left bar of the window component.
   * Does not allow the window to be compressed beyond its minimum width.
   * @param {number} diff
   * @param {boolean} dragging
   */
  const handleDragLeftBar = (diff, dragging) => {
    if (windowWidth + diff >= minWindowWidth) {
      setDraggingWindowWidth(windowWidth + diff);
      setDraggingWindowLeft(windowLeft - diff);
      setLeftDraggingDragConstraint(leftDragConstraint + diff);
    }
    setDragging(dragging);
  };

  /**
   * Handler function for ending the left border dragging event.
   * Updates the window width, the window left position, the left dragging constraint (so
   * the window can't be dragged off the left edge of the screen).
   * Sets the dragging state flag to false.
   */
  const handleDragLeftBarEnd = () => {
    setWindowWidth(draggingWindowWidth);
    setWindowLeft(draggingWindowLeft);
    setLeftDragConstraint(leftDraggingDragConstraint);
    setDragging(false);
  };

  /**
   * Handler function for the drag event on the bottom right corner of the window.
   * Prevents the window from being compressed beyond its minimum width and height.
   * Updates the dragging state flag.
   * @param {number} xDiff
   * @param {number} yDiff
   * @param {boolean} dragging
   */
  const handleDragBottomRightCorner = (xDiff, yDiff, dragging) => {
    if (windowHeight - yDiff > minWindowHeight) {
      setDraggingWindowHeight(windowHeight - yDiff);
    }

    if (windowWidth - xDiff > minWindowWidth) {
      setDraggingWindowWidth(windowWidth - xDiff);
    }
    setDragging(dragging);
  };

  /**
   * Handler function to end the drag event on the bottom right corner of the window.
   * Updates the window height, the window width, and sets the dragging state flag to false.
   */
  const handleDragBottomRightCornerEnd = () => {
    setWindowHeight(draggingWindowHeight);
    setWindowWidth(draggingWindowWidth);
    setDragging(false);
  };

  /**
   * Handler function to maximize the window component.
   */
  const handleMaximize = () => {
    if (!maximizedFlag) {
      setMaximizing(true);
      setMaximizedFlag(true);
      setWindowTop(windowTop - thisElement.current.getBoundingClientRect().top);
      setWindowHeight(window.innerHeight - 40);
      setWindowLeft(
        windowLeft - thisElement.current.getBoundingClientRect().left
      );
      setWindowWidth(window.innerWidth);
    } else {
      setMaximizedFlag(false);
      setWindowTop(draggingWindowTop);
      setWindowHeight(draggingWindowHeight);
      setWindowLeft(draggingWindowLeft);
      setWindowWidth(draggingWindowWidth);
      setTimeout(function () {
        setMaximizing(false);
      }, 500);
    }
  };

  /**
   * @returns an object with the dragging constraints on the window, to prevent it from being
   * dragged off the left of the screen or the top of the screen.
   */
  const dragConstraintsProps = () => {
    return {
      left: dragging ? leftDraggingDragConstraint : leftDragConstraint,
      top: dragging ? topDraggingDragConstraint : topDragConstraint,
    };
  };

  /**
   * @returns an object with styling for the window component. Styling changes depending on whether the
   * window is active or not.
   */
  const componentStyle = () => {
    return {
      zIndex: isActive || minimizing ? 100 : 1,
      filter: isActive
        ? "brightness(100%) grayscale(0%) drop-shadow(3px 3px 3px black)"
        : "brightness(80%) grayscale(30%) drop-shadow(0 0)",
      position: "absolute",
      x: x,
      y: y,
    };
  };

  /**
   * Function for launching a new application. To be used with components containing folders listing
   * other applications.
   * @param {Object} data application data object
   */
  function openNewApplication(data) {
    props.onOpenFile(data);
  }

  /**
   * Obejct containing props for the border of the inner component.
   */
  const contentsBorderStyleProps = {
    height: "calc(100% - 30px)",
    width: "100%",
  };

  const handleDragWindow = (e, { delta }) => {
    x.set(x.get() + delta.x);
    y.set(y.get() + delta.y);
  };

  return (
    <motion.div
      dragPropagation={true}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={dragConstraintsProps()}
      dragElastic={0}
      onDrag={handleDragWindow}
      initial={initialAnimationVals}
      animate={animateVals()}
      transition={transitionProps()}
      className="test-component-main"
      style={componentStyle()}
      id={props.data.id}
      ref={thisElement}
    >
      <WindowTopBar
        isActive={isActive}
        onDragBar={handleDragTopBar}
        onDragTopBarEnd={handleDragTopBarEnd}
      />
      <WindowLeftBar
        isActive={isActive}
        onDragBar={handleDragLeftBar}
        onDragLeftBarEnd={handleDragLeftBarEnd}
      />
      <div className="container-fluid px-0">
        <motion.div
          onPointerDown={maximizedFlag ? null : startDrag}
          className="header-bar row mx-0"
        >
          <WindowHeaderBarTitle
            icon={props.data.icon}
            windowTitle={windowTitle}
          />
          <WindowHeaderBarButtons
            onMinimize={updatePropsMinimizedFlag}
            onMaximize={handleMaximize}
            onClose={handleClose}
          />
        </motion.div>
        <div
          className="py-2 px-2 window-component-contents-border"
          style={contentsBorderStyleProps}
        >
          <div className="window-component-contents-inner-border">
            {props.data.component != null
              ? props.data.component(openNewApplication, props.fileStructure)
              : null}
          </div>
        </div>
      </div>
      <WindowRightBar
        isActive={isActive}
        onDragBar={handleDragRightBar}
        onDragRightBarEnd={handleDragRightBarEnd}
      />
      <WindowBottomRightCorner
        isActive={isActive}
        onDragBottomRightCorner={handleDragBottomRightCorner}
        onDragBottomRightCornerEnd={handleDragBottomRightCornerEnd}
      />
      <WindowBottomBar
        isActive={isActive}
        onDragBar={handleDragBottomBar}
        onDragBottomBarEnd={handleDragBottomBarEnd}
        windowHeight={draggingWindowHeight}
      />
    </motion.div>
  );
}
