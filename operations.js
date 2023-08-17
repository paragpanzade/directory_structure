import {getUniqueFileName, getUniqueFolderName} from './utils.js';
import data from './store.js';
import { fileExplorer } from './index.js';

let fileNames = ["File 1.1", "File 2.1"];
let folderNames = ["Folder 1", "Folder 2"];
function createItem(item) {
  const listItem = document.createElement("div");
  listItem.classList.add(item.type);

  const itemName = document.createElement("span");
  itemName.textContent = item.name;
  listItem.appendChild(itemName);

  if (item.type === "folder") {
    const expandIcon = document.createElement("button");
    expandIcon.classList.add("expand-icon");
    expandIcon.title = "Expand/ Collapse";
    expandIcon.textContent = item.expanded ? "▼" : "▶";
    expandIcon.onclick = () => expandFolder(item);
    listItem.appendChild(expandIcon);

    const addFolder = document.createElement("button");
    addFolder.textContent = "+  ";
    addFolder.title = "Create File";
    addFolder.classList.add("add-folder-button");
    addFolder.onclick = () => addFileToFolder(item);
    listItem.appendChild(addFolder);

    const addFile = document.createElement("button");
    addFile.textContent = "*  ";
    addFile.title = "Create Folder";
    addFile.classList.add("add-file-button");
    addFile.onclick = () => addFolderItem(item);
    listItem.appendChild(addFile);

    const remove = document.createElement("button");
    remove.textContent = "-  ";
    remove.title = "Remove Folder";
    remove.classList.add("remove-button");
    remove.onclick = () => removefolder(item);
    listItem.appendChild(remove);

    const childrenList = document.createElement("ul");
    if (item.expanded) {
      item.children.forEach((child) => {
        const childItem = createItem(child);
        childrenList.appendChild(childItem);
      });
    }
    listItem.appendChild(childrenList);
  }
  return listItem;
}

function expandFolder(item) {
  item.expanded = !item.expanded; // Toggle the expanded state
  // Re-render the file structure to reflect the changes
  fileExplorer.innerHTML = "";
  data.forEach((item) => {
    const listItem = createItem(item);
    fileExplorer.appendChild(listItem);
  });
}

function removefolder(item) {
  // Find the index of the item to be removed
  let index = data.findIndex((i) => i.id === item.id);

  if (index !== -1) {
    data.splice(index, 1); // Remove the folder from the data array

    // Re-render the file structure to reflect the changes
    fileExplorer.innerHTML = "";
    data.forEach((item) => {
      const listItem = createItem(item);
      fileExplorer.appendChild(listItem);
    });
  }
}

function addFileToFolder(file) {
  const getFileName = getUniqueFileName();
  fileNames.push(getFileName);
  const newFile = { id: getFileName, name: getFileName, type: "file" };
  file.children.push(newFile);
  // Re-render the file structure to reflect the changes
  fileExplorer.innerHTML = "";
  data.forEach((item) => {
    const listItem = createItem(item);
    fileExplorer.appendChild(listItem);
  });
}

function addFolderItem(folder) {
  const getFolderName = getUniqueFolderName();
  folderNames.push(getFolderName);
  const newFile = {
    id: getFolderName,
    name: getFolderName,
    type: "folder",
    children: [],
  };
  folder.children.push(newFile);
  // Re-render the file structure to reflect the changes
  fileExplorer.innerHTML = "";
  data.forEach((item) => {
    const listItem = createItem(item);
    fileExplorer.appendChild(listItem);
  });
}

export {createItem, expandFolder,removefolder,addFileToFolder,addFolderItem,fileNames,folderNames};