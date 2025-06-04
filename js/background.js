chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "closeTab" && sender.tab.id) {
        chrome.tabs.remove(sender.tab.id);
      }
});

chrome.runtime.onInstalled.addListener(() => {

  chrome.storage.local.set({ enabled: false });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: false });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    setProxy(changes.enabled.newValue);
  }
});

function setProxy(enabled) {
  if (enabled) {
    chrome.proxy.settings.set({
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "https",        // 使用しているVPNサーバーのプロトコル（http, https, socks5など）
            host: "219.100.37.22",  // VPNサーバーのIPアドレス
            port: 443  // VPNサーバーのポート
          },
          bypassList: ["<local>"]
        }
      },
      scope: "regular"
    });
  } else {
    chrome.proxy.settings.clear({ scope: "regular" });
  }
}
