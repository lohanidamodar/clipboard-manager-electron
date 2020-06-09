const ipcRenderer = window.require('electron').ipcRenderer

function createDiv(text, index) {
  var div = document.createElement('div')
  div.id = 'clip_' + index
  div.className = 'item'
  var truncated = truncate(text, 100, "...")
  div.nodeValue = truncated
  if (!text.trim()) {
    div.style.height = "15px";
  }
  div.onclick = function () {
    ipcRenderer.invoke('setClipboard', text)
  }
  div.appendChild(document.createTextNode(truncated))
  return div
}


function truncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

window.onload = function () {
  ipcRenderer.on('clipboardContents', (event, message) => {
    var clipDiv = document.getElementById('clipHistory')
    var clipList = message.copied

    var docFrag = document.createDocumentFragment()
    for (var i = clipList.length - 1; i >= 0; i--) {
      docFrag.appendChild(createDiv(clipList[i], i))
    }
    clipDiv.appendChild(docFrag)
  })
}
