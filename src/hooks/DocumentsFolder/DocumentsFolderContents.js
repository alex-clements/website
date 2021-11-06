import React, {useState, useEffect} from 'react';
import instantiateFileStructure from '../../instantiateFileStructure.js';
import instantiateFileStructureFromData from '../../instantiateFileStructureFromData.js';
import DocumentsFolderRow from './DocumentsFolderRow.js';

export default function DocumentsFolderContents(props) {
    const [fileStructure, setFileStructure] = useState(null);

    useEffect(() => {
        setFileStructure(instantiateFileStructure());
    }, [])

    const handleOpenFile = (a, b, c, d, e, f, g, h, i, j, k, l, m, n) => {
        props(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
    }

    const renderFiles = () => {
        if (fileStructure != null) {
            var fs = instantiateFileStructureFromData(fileStructure);
            return ( 
                <table className="table table-borderless">
                    <thead className="documents-table-heading">
                        <tr>
                            <td scope="col">
                                <div className="d-flex flex-row">
                                <p className="mb-0">Filename</p>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {fs.getChildren()[0].getData().map((item, index) => (
                        <DocumentsFolderRow key={index} onOpenFile={handleOpenFile} name={item.name} icon={item.icon} fileId={item.fileId}
                        initialWidth={item.initialWidth} initialHeight={item.initialHeight} contents={item.contents} />
                    ))}
                    </tbody>
                </table>
            )
        } else {
            return (<div></div>)
        }
    }

    return (
    <div>
        {renderFiles()}
    </div>
    )
}