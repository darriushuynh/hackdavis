const sendMessage = (action) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: changeTextSize,
        args: [action]
      });
    });
  };
  
  const changeTextSize = (action) => {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (action === 'increase') {
      body.style.fontSize = (currentSize + 2) + 'px';
    } else if (action === 'decrease') {
      body.style.fontSize = (currentSize - 2) + 'px';
    } else {
      body.style.fontSize = ''; // reset to default
    }
  };
  
  document.getElementById('increase').onclick = () => sendMessage('increase');
  document.getElementById('decrease').onclick = () => sendMessage('decrease');
  document.getElementById('reset').onclick = () => sendMessage('reset');
  