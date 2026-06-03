chrome.commands.onCommand.addListener((command) => {
  console.log('[Udemy Control] Command received in background:', command);
  chrome.tabs.query({ url: '*://*.udemy.com/*' }, (tabs) => {
    console.log('[Udemy Control] Udemy tabs found:', tabs.length, tabs.map(t => t.url));
    if (tabs.length > 0) {
      console.log('[Udemy Control] Sending message to tab:', tabs[0].id, tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, { command: command }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('[Udemy Control] sendMessage error:', chrome.runtime.lastError.message);
        } else {
          console.log('[Udemy Control] Message delivered, response:', response);
        }
      });
    } else {
      console.warn('[Udemy Control] No Udemy tabs found — is a Udemy tab open?');
    }
  });
});
