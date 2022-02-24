import './App.css';
import WindowComponent from './hooks/WindowComponent/WindowComponent.js'
import React, { useState, useEffect, useRef} from 'react';
import MenuBar from './hooks/MenuBar/MenuBar.js'
import LoadScreen from './hooks/LoadScreen/LoadScreen.js';
import OSScreen from './hooks/osScreen/osScreen.js';
import ShutdownScreen from './hooks/ShutdownScreen/ShutdownScreen.js';
import instantiateFileStructure from './scripts/instantiateFileStructure.js';
import instantiateFileStructureFromData from './scripts/instantiateFileStructureFromData.js';
import instantiateFiles from './scripts/instantiateFiles.js';
import DesktopFile from './hooks/DesktopFile/DesktopFile.js';

function App() {
  const [windows, setWindows] = useState([])
  const [currentKey, setCurrentKey] = useState(1);
  const desktopElement = useRef();
  const [loadComplete, setLoadComplete] = useState(false);
  const [osScreenComplete, setOSScreenComplete] = useState(false);
  const [fileStructure, setFileStructure] = useState(null);
  const [shutDownScreen, setShutDownScreen] = useState(false);

  /**
   * Creates all the windows to add to the screen.
   * @returns React components
   */
  const createWindows = () => {
    return windows.map((item) =>
      <WindowComponent
        key={item['id']}
        index={item['id']}
        test={(e) => RemoveWindow(e)}
        id={"window_" + item['id']}
        passedComponent={item['component']}
        initialWindowWidth={item['initialWindowWidth']}
        initialWindowHeight={item['initialWindowHeight']}
        minWindowWidth={item['minWindowWidth']}
        minWindowHeight={item['minWindowHeight']}
        initialLeft={item['initialLeft']}
        initialTop={item['initialTop']}
        windowTitle={item['windowTitle']}
        activeStatus={item['activeStatus']}
        handleActiveStatusChange={(e) => changeActiveItemIndex(e)}
        icon={item["icon"]}
        desktopIconX={item["desktopIconX"]}
        desktopIconY={item["desktopIconY"]}
        menuIconX={item["menuIconX"]}
        menuIconY={item["menuIconY"]}
        maximizedFlag={item["maximizedFlag"]}
        minimizedFlag={item["minimizedFlag"]}
        handleMinimize={(e) => changeMinimizedStatus(e)}
        onOpenFile={(activeID,initialWindowWidth,initialWindowHeight,minWindowWidth,minWindowHeight, initialLeft, 
          initialTop,windowTitle,component,icon,desktopIconX,desktopIconY,menuIconX,menuIconY) => addWindow(activeID,
          initialWindowWidth,initialWindowHeight,minWindowWidth,minWindowHeight,initialLeft,initialTop,windowTitle,
          component,icon,desktopIconX,desktopIconY,menuIconX,menuIconY)}
        fileStructure={fileStructure}
        />
    )
  }

  /**
   * Adds click event listener to launch the outsideClickListener function
   */
  useEffect(() => {
    document.addEventListener('mousedown', outsideClickListener);
    setFileStructure(instantiateFileStructure());

    return function cleanup() {
      document.removeEventListener('mousedown', outsideClickListener)
    }}, []);

  /**
   * Re-renders the application when the "Windows" object changes
   */
  useEffect(() => {}, [windows]);

  /**
   * Sets all windows to inactive if a user clicks on the desktop
   * @param {React.MouseEvent} e 
   * @returns 
   */
  const outsideClickListener = (e) => {
    if (desktopElement.current == null) {
      return
    }
    if (desktopElement.current == e.target) {
      changeActiveItemIndex(0);
    }
  }

  /**
   * adds a new window object to the array of windows
   * @param {*} activeID 
   * @param {*} initialWindowWidth 
   * @param {*} initialWindowHeight 
   * @param {*} minWindowWidth 
   * @param {*} minWindowHeight 
   * @param {*} initialLeft 
   * @param {*} initialTop 
   * @param {*} windowTitle 
   * @param {*} component 
   * @param {*} icon 
   * @param {*} desktopIconX 
   * @param {*} desktopIconY 
   * @param {*} menuIconX 
   * @param {*} menuIconY 
   * @returns 
   */
  const addWindow = (activeID,
                     initialWindowWidth,
                     initialWindowHeight,
                     minWindowWidth, 
                     minWindowHeight, 
                     initialLeft, 
                     initialTop, 
                     windowTitle, 
                     component, 
                     icon,
                     desktopIconX,
                     desktopIconY,
                     menuIconX,
                     menuIconY) => {
    var lastInt = currentKey;
    var currentWindows = [...windows]

    for (var i=0; i<windows.length; i++) {
      if (windows[i]["activeID"] == activeID) {
        changeActiveItemIndex(windows[i]["id"])
        return
      }
    }

    // current window data:
    // id - index of window open
    // activeId - unique id of open program
    // minWindowWidth - min allowable width of open window
    // minWindowHeight - min allowable height of open window
    // initialLeft - initial left position of the window
    // initialTop - initial top position of the window
    // windowTitle - text appearing in the header bar of the window
    // component - functional component of the window body contents
    // activeStatus - indicates if this is the active top level window
    currentWindows.push({"id": lastInt, 
                         "activeID" : activeID, 
                         "minWindowWidth": minWindowWidth, 
                         "minWindowHeight" : minWindowHeight,
                         "initialWindowWidth": initialWindowWidth,
                         "initialWindowHeight" : initialWindowHeight,
                         "initialLeft" : initialLeft, 
                         "initialTop" : initialTop, 
                         "windowTitle" : windowTitle, 
                         "component" : component, 
                         "activeStatus": true, 
                         "icon" : icon,
                         "desktopIconX" : desktopIconX,
                         "desktopIconY" : desktopIconY,
                         "menuIconX" : menuIconX,
                         "menuIconY" : menuIconY,
                         "maximizedFlag" : false,
                         "minimizedFlag" : false,
                         "fileStructure" : fileStructure
                        });
    setWindows(currentWindows);

    changeActiveItemIndex(lastInt);
    setCurrentKey(lastInt + 1);
  }

  /**
   * removes a window from the active windows at the given index
   * @param {number} index 
   */
  const RemoveWindow = (index) => {
    var currentWindows = [...windows]
    var targetIndex = -1;

    for (var i=0; i<currentWindows.length; i++) {
      if (currentWindows[i]['id'] == index) {
        targetIndex = i;
      }
    }

    if (targetIndex > -1) {
      currentWindows.splice(targetIndex, 1);
    }

    setWindows(currentWindows);
  }

  /**
   * set the window at the provided index to active
   * @param {number} index 
   */
  const changeActiveItemIndex = (index) => {
    const subFunction = (el) => {
      if (el["id"] == index) {
        if (el["minimizedFlag"] == true) {
          return {...el, "activeStatus" : true, "minimizedFlag" : false}
        } else {
          return {...el, "activeStatus" : true}
        }
      } else {
        return {...el, "activeStatus" : false}
      }
    }

    setWindows(windows => (
      windows.map(
        (el) => subFunction(el)
      )
    ))
  }

  /**
   * Flips the minimized status of the window at the given index
   * @param {number} index 
   */
  const changeMinimizedStatus = (index) => {
    const subFunction = (el) => {
      if (el["id"] == index) {
        return {...el, "minimizedFlag": true, "activeStatus" : false}
      } else
      return {...el}
    }

    setWindows(windows => (
      windows.map(
        (el) => subFunction(el)
      )
    ))
  }

  /**
   * Sets the window with the given activeId to active.  Sets all other windows to inactive.
   * @param {number} activeID 
   */
  const changeActiveItemId = (activeID) => {

    const subFunction = (el) => {
      if (el["activeID"] == activeID) {
        if (el["minimizedFlag"] == false && el["activeStatus"] == true) {
          return {...el, "activeStatus" : false, "minimizedFlag" : true}
        } else {
          return {...el, "activeStatus" : true, "minimizedFlag" : false}
        }
      } else {
        return {...el, "activeStatus" : false}
      }
    }

    setWindows(windows => (
      windows.map(
        (el) => subFunction(el)
      )
    ))
  }

  /**
   * creates a menu item for each of the active windows
   * @returns 
   */
  const createMenuItems = () => {
    var iconList = [];
    for (var i=0; i<windows.length; i++) {
      iconList.push({"activeStatus" : windows[i]["activeStatus"], "activeID": windows[i]["activeID"], "icon" : windows[i]["icon"], "windowTitle" : windows[i]["windowTitle"]})
    }
    return iconList;
  }

  /**
   * sets the LoadComplete flag to true once the load screen is complete
   */
  const handleLoadComplete = () => {
    setLoadComplete(true);
  }

  /**
   * Updates the left position and the top position of an active file.
   * @param {number} topPosition top position of the file's menu icon
   * @param {number} leftPosition left position of the file's menu icon
   * @param {number} activeID activeID of the given file
   */
  const handleFileIconMount = (topPosition, leftPosition, activeID) => {
    setWindows(windows => (
      windows.map(
        (el) => el["activeID"] == activeID ? {...el, "menuIconX": leftPosition, "menuIconY": topPosition} : {...el}
      )
    ))
  }

  /**
   * Sets the OSComplete flag to true when the user clicks after prompted.
   * Also opens the readMe file.
   */
  const handleOsComplete = () => {
    setOSScreenComplete(true);
    var target = document.getElementById('readMeFile')

    setTimeout(function() {
      var doubleClickEvent = document.createEvent('MouseEvents');
      doubleClickEvent.initEvent('dblclick', true, true);
      target.dispatchEvent(doubleClickEvent);
    }, 500)
  }

  /**
   * Sets the shutdown screen value to true, displaying the shutdown screen.
   */
  const handleShutdownScreen = () => {
    setShutDownScreen(true);
  }

  /**
   * creates the file icons to be placed on the desktop
   * @returns the file icon components to be placed on the desktop
   */
  const createDesktopFiles = () => {
    if (fileStructure != null) {
      return fileStructure['children'][1]['data'].map((item) => 
      <DesktopFile 
      onOpen={addWindow} 
      fileIcon={item['icon']}
      contents={item['contents']}
      name={item['name']}
      fileId={item['fileId']}
      id={item['id']}
      key={item['fileId']}
      initialWidth={item['initialWidth']}
      initialHeight={item['initialHeight']}
      initialX={0}
      initialY={0}
      />
      )
    } else {
      return (<div></div>)
    }
  }

  /**
   * Updates the file structure upon drag events involving file components.
   * @param {React.DragEvent} e 
   * @returns 
   */
  const dragDropFunction = (e) => {
    var fileId = e.dataTransfer.getData("drag-item");
    var targetId = e.target.id;

    if (!targetId || !fileId) {
      return;
    }

    // TODO: refactor this
    if (targetId == "documents" && fileId == 3) {
      return;
    }

    if (targetId == "desktop" || targetId == "documents") {
      var newFileStructure = instantiateFileStructureFromData(fileStructure);
      var allFiles = instantiateFiles();
      var myFile = allFiles.get(parseInt(fileId));

      for (var i=0; i<newFileStructure.children.length; i++) {
        if (newFileStructure.children[i].name == targetId) {
          for (var j=0; j<newFileStructure.children[i].data.length; j++) {
            if (newFileStructure.children[i].data[j]['fileId'] == parseInt(fileId)) {
              return;
            }
          }
        }
      }

      for (var i=0; i<newFileStructure.children.length; i++) {
        for (var j=0; j<newFileStructure.children[i].data.length; j++) {
          if (newFileStructure.children[i].data[j]['fileId'] == parseInt(fileId)) {
            newFileStructure.children[i].removeData(j);
          }
        }
      }

      for (var i=0; i<newFileStructure.children.length; i++) {
        if (newFileStructure.children[i].name == targetId) {
          newFileStructure.children[i].addData(myFile);
        }
      }

    } else {
      return;
    }
    setFileStructure(newFileStructure);
  }

  return (
    <div className="App">
      {loadComplete ? null : <LoadScreen onComplete={handleLoadComplete} />}
      {osScreenComplete ? null : <OSScreen onComplete={handleOsComplete} />}
      {shutDownScreen ? <ShutdownScreen /> : null}
      <div style={{"zIndex" : 1}} ref={desktopElement} id="desktop" className="background-body" onDragOver={e => e.preventDefault()} onDrop={dragDropFunction}>
          {createWindows()}
          {createDesktopFiles()}
      </div>
      <MenuBar onShutDown={handleShutdownScreen} menuItems={createMenuItems()} onIconSelect={changeActiveItemId} onFileIconMount={handleFileIconMount}/>
    </div>
  );
}

export default App;