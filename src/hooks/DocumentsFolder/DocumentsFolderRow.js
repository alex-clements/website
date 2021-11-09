import React, {useState, useEffect, useRef} from 'react';
import './DocumentsFolder.css';

export default function DocumentsFolderRow(props) {
    const thisElement = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', outsideClickListener);
    
        return function cleanup() {
          document.removeEventListener('mousedown', outsideClickListener)
        }
    }, [])

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

    const styleProps = () => {
        return isActive ? 'documents-row-active' : 'documents-row-inactive';
    }



    const onDragStart = (e) => {

        e.dataTransfer.setData("drag-item", props.fileId);
    }


    return (
        <tr className="documents-table-row" ref={thisElement} className={styleProps()} draggable="true" onDragStart={onDragStart}>
            <td className="px-0 py-0">
                <div className="d-flex flex-row" onDoubleClick={handleOpenFile}>
                    <img height="=20" width="20" className="float-left mx-1 my-1" src={props.icon} />
                    <p className="mb-0 float-left">{props.name}</p>
                </div>
            </td>
        </tr>
    )
}