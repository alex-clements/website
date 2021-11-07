import fileStructure from './fileStructureClass.js';

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