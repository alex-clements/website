import React, {useState, useEffect, useRef} from 'react';
import './DocumentsFolder.css';

export default function DocumentsFolderRow(props) {
    const thisElement = useRef(null);
    const [isActive, setIsActive] = useState(false);

    /**
     * Triggered upon component mount.
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
     * Function for opening the selected file in a new application window.
     */
    const handleOpenFile = () => {
        props.onOpenFile(
            props.fileId,
            props.initialWidth != null ? props.initialWidth : window.innerWidth * 3 / 4, 
            props.initialHeight != null ? props.initialHeight : window.innerHeight * 3 / 4, 
            200, 
            200, 
            window.innerWidth/2 - (props.initialWidth != null ? props.initialWidth : window.innerWidth * 3 / 4) / 2, 
            window.innerHeight/2 - (props.initialHeight != null ? props.initialHeight : window.innerHeight * 3 / 4) / 2, 
            props.name, 
            props.contents, 
            props.icon,
            0,
            0,
            0,
            0)
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
        e.dataTransfer.setData("drag-item", props.fileId);
    }

    return (
        <tr className="documents-table-row px-0 mx-0" ref={thisElement} className={styleProps()} draggable="true" onDragStart={onDragStart}>
            <td className="px-0 py-0 mx-0">
                <div className="d-flex flex-row" onDoubleClick={handleOpenFile}>
                    <img height="=20" width="20" className="float-left px-1 py-1" src={props.icon} />
                    <p className="mb-0 float-left">{props.name}</p>
                </div>
            </td>
        </tr>
    )
}