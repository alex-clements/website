import './App.css';
import WindowComponent from './hooks/WindowComponent/WindowComponent.js'
import React, { useState, useEffect, useRef} from 'react';
import MenuBar from './hooks/MenuBar/MenuBar.js'
import LoadScreen from './hooks/LoadScreen/LoadScreen.js';
import OSScreen from './hooks/osScreen/osScreen.js';
import instantiateFileStructure from './instantiateFileStructure.js';
import instantiateFileStructureFromData from './instantiateFileStructureFromData.js';
import DesktopFile from './hooks/DesktopFile/DesktopFile.js';

function App() {
  const [windows, setWindows] = useState([])
  const [currentKey, setCurrentKey] = useState(1);
  const desktopElement = useRef();
  const [loadComplete, setLoadComplete] = useState(false);
  const [osScreenComplete, setOSScreenComplete] = useState(false);
  const [fileStructure, setFileStructure] = useState(null);

  useEffect(() => {
    setFileStructure(instantiateFileStructure());
  }, []);

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
        />
    )
  }

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickListener);

    return function cleanup() {
      document.removeEventListener('mousedown', outsideClickListener)
    }}, []);

  useEffect(() => {}, [windows]);

  const outsideClickListener = (e) => {
    if (desktopElement.current == null) {
      return
    }
    if (desktopElement.current == e.target) {
      changeActiveItemIndex(0);
    }
  }

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
    console.log(activeID);
    console.log(component);
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
                         "minimizedFlag" : false
                        });
    setWindows(currentWindows);

    changeActiveItemIndex(lastInt);
    setCurrentKey(lastInt + 1);
  }

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

  const createMenuItems = () => {
    var iconList = [];
    for (var i=0; i<windows.length; i++) {
      iconList.push({"activeStatus" : windows[i]["activeStatus"], "activeID": windows[i]["activeID"], "icon" : windows[i]["icon"], "windowTitle" : windows[i]["windowTitle"]})
    }
    return iconList;
  }

  const handleLoadComplete = () => {
    setLoadComplete(true);
  }

  const handleFileIconMount = (topPosition, leftPosition, activeID) => {
    setWindows(windows => (
      windows.map(
        (el) => el["activeID"] == activeID ? {...el, "menuIconX": leftPosition, "menuIconY": topPosition} : {...el}
      )
    ))
  }

  const handleOsComplete = () => {
    setOSScreenComplete(true);
    var target = document.getElementById('readMeFile')

    setTimeout(function() {
      var doubleClickEvent = document.createEvent('MouseEvents');
      doubleClickEvent.initEvent('dblclick', true, true);
      target.dispatchEvent(doubleClickEvent);
    }, 500)

    
  }

  const createDesktopFiles = () => {
    if (fileStructure != null) {
      return fileStructure['children'][1]['data'].map((item, index) => 
      <DesktopFile 
      onOpen={addWindow} 
      fileIcon={item['icon']}
      contents={item['contents']}
      name={item['name']}
      fileId={item['fileId']}
      id={item['id']}
      key={index}
      initialWidth={item['initialWidth']}
      initialHeight={item['initialHeight']}
      />
      )
    } else {
      return (<div></div>)
    }
  }

  const modifyFileStructure = () => {
    setFileStructure(() => {
      let jasper = Object.assign({}, fileStructure);  // creating copy of state variable jasper
      console.log(jasper)
      jasper['children'][1]['data'] = [];
      return jasper
      // jasper['children'][1]['data'] = [];                // update the name property, assign a new value                 
      // return { jasper };   
    })
  }

  return (
    <div className="App">
      {/* {loadComplete ? null : <LoadScreen onComplete={handleLoadComplete} />}
      {osScreenComplete ? null : <OSScreen onComplete={handleOsComplete} />} */}
      <div style={{"zIndex" : 1}} ref={desktopElement} id="background-body" className="background-body">
          {createWindows()}
          {createDesktopFiles()}
      </div>
      <MenuBar menuItems={createMenuItems()} onIconSelect={changeActiveItemId} onFileIconMount={handleFileIconMount}/>
    </div>
  );
}

export default App;
