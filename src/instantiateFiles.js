import ReadMeContents from './hooks/readMeFile/ReadMeContents.js';
import ResumeContents from './hooks/resumeFile/ResumeContents.js';
import DocumentsFolderContents from './hooks/DocumentsFolder/DocumentsFolderContents.js';
import readMeFileIcon from './hooks/readMeFile/Notepad.ico';
import resumeFileIcon from './hooks/resumeFile/WordPad document.ico';
import fileFolderIcon from './data/Folder.ico';
import imageIcon from './data/Painting.ico';
import CosmoFileContents from './hooks/CosmoFile/CosmoFileContents.js';
import SpaceInvadersContents from './hooks/SpaceInvaders/SpaceInvadersContents.js';
import SpaceInvadersIcon from './hooks/SpaceInvaders/Earth.ico';
import SpacestagramContents from './hooks/Spacestagram/SpacestagramContents.js';
import AboutMeFileContents from './hooks/AboutMeFile/AboutMeFileContents.js';
import userIcon from './hooks/AboutMeFile/User.ico';

const readMeFileData = {
    'fileId': 1,
    'name': 'README',
    'dataType' : "file",
    'contents' : ReadMeContents,
    'icon' : readMeFileIcon,
    'id' : 'readMeFile',
    'initialWidth' : 300,
    'initialHeight' : 400
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

const aboutMeData = {
    'fileId' : 5,
    'name' : 'ABOUT ME',
    'dataType' : 'file',
    'contents' : AboutMeFileContents,
    'icon' : userIcon,
    'id' : 'aboutMeFile',
    'initialWidth' : null,
    'initialHeight' : null
}

const spaceInvadersData = {
    'fileId' : 6,
    'name' : 'SPACE INVADERS',
    'dataType' : 'file',
    'contents' : SpaceInvadersContents,
    'icon' : SpaceInvadersIcon,
    'id' : 'spaceInvadersFile',
    'initialWidth' : null,
    'initialHeight' : null
}

const spacestagramData = {
    'fileId' : 7,
    'name' : 'SPACESTAGRAM',
    'dataType' : 'file',
    'contents' : SpacestagramContents,
    'icon' : SpaceInvadersIcon,
    'id' : 'spacestagramFile',
    'initialWidth' : null,
    'initialHeight' : null
}

/**
 * Function to instantiate the map data structure and populate it with data.
 * @returns a Map data structure.
 */
export default function instantiateFiles() {
    var myMap = new Map();

    myMap.set(1, readMeFileData);
    myMap.set(2, resumeFileData);
    myMap.set(3, fileFolder);
    myMap.set(4, cosmoFileData);
    myMap.set(5, aboutMeData);
    myMap.set(6, spaceInvadersData);
    myMap.set(7, spacestagramData);

    return myMap;
}