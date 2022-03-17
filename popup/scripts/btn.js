const JSONdownloader = (filename, dataObjToWrite) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], {
    type: 'text/json',
  });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
};

const downloadBtn = document.getElementById('download-btn');

chrome.storage.local.get(['downloadItem'], (res) => {
  if (res.downloadItem.length === 0) {
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Nothing Selected Yet';
  } else {
    downloadBtn.textContent = 'Download Ready';
  }
});

downloadBtn.addEventListener('click', () => {
  chrome.storage.local.get(['downloadItem'], (res) => {
    JSONdownloader('menuItem.json', res.downloadItem);
  });
});
