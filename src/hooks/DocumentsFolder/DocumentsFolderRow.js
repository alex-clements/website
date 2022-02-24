import React, {useState, useEffect, useRef} from 'react';
import './DocumentsFolder.css';

export default function DocumentsFolderRow(props) {
    const thisElement = useRef(null);
    const [isActive, setIsActive] = useState(false);

    /**
     * Triggered upon component mount.
     * Adds an outside click listener to the component.
     */
    useEffect(() => {
        document.addEventListener('mousedown', outsideClickListener);
        return function cleanup() {
          document.removeEventListener('mousedown', outsideClickListener)
        }
    }, [])

    /**
     * Click listener determining if the last click was within the bounds of this component.
     * @param {React.MouseEvent} e 
     * @returns none
     */
    const outsideClickListener = (e) => {
        if (thisElement.current == null) {
          return
        }
        if (thisElement.current.contains(e.target)) {
          setIsActive(true);
        } else {
            setIsActive(false);
        }
      }

    /**
     * Handler for opening the selected file in a new application window.
     */
    const handleOpenFile = () => {
        const data = {
            'activeID': props.data.fileId,
            'initialWindowWidth': props.data.initialWidth != null ? props.data.initialWidth : window.innerWidth * 3 / 4,
            'initialWindowHeight': props.data.initialHeight != null ? props.data.initialHeight : window.innerHeight * 3 / 4, 
            'minWindowWidth': 200,
            'minWindowHeight': 200,
            'initialLeft': window.innerWidth/2 - (props.data.initialWidth != null ? props.data.initialWidth : window.innerWidth * 3 / 4) / 2,
            'initialTop':  window.innerHeight/2 - (props.data.initialHeight != null ? props.data.initialHeight : window.innerHeight * 3 / 4) / 2, 
            'windowTitle': props.data.name,
            'component': props.data.contents,
            'icon': props.data.icon,
            'desktopIconX': 0,
            'desktopIconY': 0,
            'menuIconX': 0,
            'menuIconY': 0
        }

        props.onOpenFile(data);
    }

    /**
     * Function for determining the style of the given documents folder row
     * @returns string representing class name of active or inactive component
     */
    const styleProps = () => {
        return isActive ? 'documents-table-row mx-0 documents-row-active documents-text' : 'documents-row-inactive documents-table-row mx-0 documents-text';
    }

    /**
     * Function for handling a drag event for when the documents item row is being dragged to another folder.
     * @param {React.DragEvent} e 
     */
    const onDragStart = (e) => {
        e.dataTransfer.setData("drag-item", props.data.fileId);
    }

    return (
        <tr className="documents-table-row px-0 mx-0" ref={thisElement} className={styleProps()} draggable="true" onDragStart={onDragStart}>
            <td className="px-0 py-0 mx-0">
                <div className="d-flex flex-row" onDoubleClick={handleOpenFile}>
                    <img height="=20" width="20" className="float-left px-1 py-1" src={props.data.icon} />
                    <p className="mb-0 float-left">{props.data.name}</p>
                </div>
            </td>
        </tr>
    )
}