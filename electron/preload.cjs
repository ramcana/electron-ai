const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  selectFile: (fileType) => ipcRenderer.invoke('select-file', fileType),
  processWav2Lip: (data) => ipcRenderer.invoke('process-wav2lip', data),
  checkSystem: () => ipcRenderer.invoke('check-system')
});