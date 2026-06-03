document.getElementById('open-shortcuts').addEventListener('click', () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
});

chrome.commands.getAll((commands) => {
  const list = document.getElementById('shortcuts-list');
  commands.forEach(({ description, shortcut }) => {
    const div = document.createElement('div');
    div.textContent = `${shortcut || 'Not set'} — ${description}`;
    list.appendChild(div);
  });
});
