import data from './store.js';
import {createItem,addFolderItem,addFileToFolder,removefolder,expandFolder} from './operations.js';
const fileExplorer = document.getElementById("file-explorer");
data.forEach((item) => {
  const listItem = createItem(item);
  fileExplorer.appendChild(listItem);
});
export {fileExplorer};