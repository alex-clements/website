import fileStructure from './fileStructureClass.js';

/**
 * Function for creating a new "FileStructure" object with data stored in a flattened
 * "FileStructure" object.
 * @param {FileStructure} data flattened "FileStructure" object.
 * @returns Newly populated FileStructure class.
 */
export default function instantiateFileStructureFromData(data) {
    var structure = new fileStructure();
    structure.setName(data['name']);

    data['children'].forEach((x) => {
        structure.addChild(instantiateFileStructureFromData(x));
    })

    data['data'].forEach((x) => {
        structure.addData(x);
    })
    
    return structure;

}