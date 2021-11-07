import fileStructure from './fileStructureClass.js';
import instantiateFiles from './instantiateFiles.js';

export default function instantiateFileStructure() {

    var cDrive = new fileStructure();
    cDrive.setName("cDrive");
    var documents = new fileStructure();
    documents.setName("documents");
    var desktop = new fileStructure();
    desktop.setName("desktop");

    cDrive.addChildNoParent(documents);
    cDrive.addChildNoParent(desktop);

    var myMap = instantiateFiles();

    desktop.addData(myMap.get(1));
    desktop.addData(myMap.get(2));
    desktop.addData(myMap.get(3));

    documents.addData(myMap.get(4));

    return cDrive;

}