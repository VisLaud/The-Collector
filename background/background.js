chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    currentMode: '',
    downloadItem: [],
  });
});
