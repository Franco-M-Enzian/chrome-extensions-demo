document.addEventListener("DOMContentLoaded", function () {
  // 冬をクリック時の処理
  document.getElementById("winter").addEventListener("click", () => {
    console.log("onclick: 冬");
    sendMessageToContentScript("maple");
  });

  // 春をクリック時の処理
  document.getElementById("spring").addEventListener("click", () => {
    console.log("onclick: 春");
    sendMessageToContentScript("spring");
  });

  // 秋をクリック時の処理
  document.getElementById("autumn").addEventListener("click", () => {
    console.log("onclick: 秋");
    sendMessageToContentScript("autumn");
  });

  function sendMessageToContentScript(theme) {
    // アクティブなタブを取得してメッセージを送信
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { theme: theme }, (response) => {
          console.log("Response from content script:", response);
        });
      }
    });
  }
});
