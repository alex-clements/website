import React, {useState, useEffect} from 'react';
import instantiateFileStructureFromData from '../../scripts/instantiateFileStructureFromData.js';
import DocumentsFolderRow from './DocumentsFolderRow.js';
import CosmoPicture from '../../data/cosmo.jpeg';

export default function DocumentsFolderContents(props, fileStructureProps) {
    const [fileStructure, setFileStructure] = useState(null);

    /**
     * Triggers upon component mount.
     * Instantiates the file structure of the current folder.
     * Adds any image files to the browser cache.
     */
    useEffect(() => {
        setFileStructure(instantiateFileStructureFromData(fileStructureProps));
        addContentsToCache();
    }, [])


    /**
     * Triggers upon change in the File Structure props.
     * Sets the current file structure to the new file structure received in the component props.
     */
    useEffect(() => {
        setFileStructure(instantiateFileStructureFromData(fileStructureProps));
    }, [fileStructureProps])

    /**
     * Function for passing data from a child component through to the application component to open
     * a new file window.
     * @param {Object} data
     */
    const handleOpenFile = (data) => {
        props(data);
    }

    /**
     * Function for adding application contents to the browser cache.
     */
    const addContentsToCache = () => {
        const imgs = [CosmoPicture];
        cacheImages(imgs);
    }
    
    /**
     * Function for adding an array of images to the browser cache.
     * @param {Array} srcArray array of images to load
     */
    const cacheImages = async (srcArray) => {
        const promises = await srcArray.map((src) => {
            return new Promise(function(resolve, reject) {
                const img = new Image();
                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            })
        })

        await Promise.all(promises);
    }

    /**
     * Function for rendering the files within the documents folder.
     * @returns a table with all files rendered in it.
     */
    const renderFiles = () => {
        if (fileStructure != null) {
            var fs = instantiateFileStructureFromData(fileStructure);
            return ( 
                fs.getChildren()[0].getData().map((item, index) => (
                    <DocumentsFolderRow key={index} onOpenFile={handleOpenFile} data={item}/>
                ))
            )
        } else {
            return (<div></div>)
        }
    }

    /**
     * Props for the style of the documents component.
     */
    const styleProps = {
        'height': '100%'
    }

    return (
    <div id="documents" style={styleProps}>
        <table className="table table-borderless documents-table-no-margin mx-0 px-0">
            <thead className="documents-table-heading">
                <tr>
                    <td scope="col">
                        <div className="d-flex flex-row">
                        <p className="mb-0 font-global">Filename</p>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                {renderFiles()}
            </tbody>
        </table>
    </div>
    )
}