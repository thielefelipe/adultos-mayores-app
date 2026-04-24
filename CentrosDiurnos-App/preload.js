const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (filename, content, filters) =>
    ipcRenderer.invoke('save-file', filename, content, filters),
  loadJson: () => ipcRenderer.invoke('load-json'),
  db: {
    getConfig: () => ipcRenderer.invoke('db:getConfig'),
    setConfig: (cfg) => ipcRenderer.invoke('db:setConfig', cfg),
    detectOneDrive: () => ipcRenderer.invoke('db:detectOneDrive'),
    selectFolder: () => ipcRenderer.invoke('db:selectFolder'),
    read: () => ipcRenderer.invoke('db:read'),
    write: (pacientes) => ipcRenderer.invoke('db:write', pacientes),
    onChange: (callback) => ipcRenderer.on('db:changed', () => callback()),
  },
});
