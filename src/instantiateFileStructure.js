import fileStructure from './fileStructureClass.js';
import ReadMeContents from './hooks/readMeFile/ReadMeContents.js';
import ResumeContents from './hooks/resumeFile/ResumeContents.js';
import DocumentsFolderContents from './hooks/DocumentsFolder/DocumentsFolderContents.js';
import readMeFileIcon from './hooks/readMeFile/Notepad.ico';
import resumeFileIcon from './hooks/resumeFile/WordPad document.ico';
import fileFolderIcon from './data/Folder.ico';
import imageIcon from './data/Painting.ico';
import CosmoFileContents from './hooks/CosmoFile/CosmoFileContents.js';

export default function instantiateFileStructure() {

    var cDrive = new fileStructure();
    var documents = new fileStructure();
    var desktop = new fileStructure();

    cDrive.addChildNoParent(documents);
    cDrive.addChildNoParent(desktop);

    const readMeFileData = {
        'fileId': 1,
        'name': 'README',
        'dataType' : "file",
        'contents' : ReadMeContents,
        'icon' : readMeFileIcon,
        'id' : 'readMeFile',
        'initialWidth' : 200,
        'initialHeight' : 300
    }

    const resumeFileData = {
        'fileId': 2,
        'name' : 'RESUME',
        'dataType' : 'file',
        'contents' : ResumeContents,
        'icon' : resumeFileIcon,
        'id' : 'resumeFile',
        'initialWidth' : null,
        'initialHeight' : null
    }

    const fileFolder = {
        'fileId' : 3,
        'name' : 'DOCUMENTS',
        'dataType' : 'folder',
        'contents' : DocumentsFolderContents,
        'icon' : fileFolderIcon,
        'id' : 'fileFolder',
        'initialWidth' : null,
        'initialHeight' : null
    }

    const cosmoFileData = {
        'fileId' : 4,
        'name' : 'COSMO',
        'dataType' : 'file',
        'contents' : CosmoFileContents,
        'icon' : imageIcon,
        'id' : 'cosmoFile',
        'initialWidth' : 300,
        'initialHeight' : 425
    }

    desktop.addData(readMeFileData);
    desktop.addData(resumeFileData);
    desktop.addData(fileFolder);

    documents.addData(cosmoFileData);

    return cDrive;

}