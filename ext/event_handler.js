console.log('[Udemy Control] content script loaded on:', window.location.href);

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    console.log('[Udemy Control] Message received in content script:', message);
    if (message.command) {
      simulateKeypress(message.command);
      sendResponse({ ok: true });
    }
  }
);

function simulateKeypress(command) {
  let key, keyCode;

  switch (command) {
    case 'play-pause':    key = ' ';          keyCode = 32; break;
    case 'seek-forward':  key = 'ArrowRight'; keyCode = 39; break;
    case 'seek-backward': key = 'ArrowLeft';  keyCode = 37; break;
    default:
      console.warn('[Udemy Control] Unknown command:', command);
      return;
  }

  const event = new KeyboardEvent('keydown', {
    key,
    keyCode,
    which: keyCode,
    code: key === ' ' ? 'Space' : key,
    bubbles: true,
    cancelable: true,
  });

  const target =
    document.querySelector('video') ||
    document.querySelector('[data-purpose="video-player"]') ||
    document.querySelector('[class*="vjs-tech"]') ||
    document.querySelector('[tabindex="0"]') ||
    document.body;

  console.log('[Udemy Control] Dispatching', command, 'on:', target?.tagName, target?.className?.substring(0, 60));

  if (target && typeof target.focus === 'function') target.focus();

  const dispatched = target.dispatchEvent(event);
  console.log('[Udemy Control] dispatchEvent result:', dispatched);
}
