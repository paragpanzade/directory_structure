import { fileNames,folderNames } from "./operations.js";

function  getUniqueFolderName(){
    const getFolderName = prompt("Enter File Name: ");
    if (folderNames.includes(getFolderName)) {
        window.alert("File already exists.");
    } else {
        return getFolderName;
    }
}

function  getUniqueFileName(){
    const getFileName = prompt("Enter File Name: ");
    if (fileNames.includes(getFileName)) {
        window.alert("File already exists.");
    } else {
        return getFileName;
    }
}

export {getUniqueFileName, getUniqueFolderName};