document.addEventListener("DOMContentLoaded", function () {
  // 春をクリック時の処理
  document.getElementById("spring").addEventListener("click", () => {
    console.log("onclick: 春");
    sendMessageToContentScript("spring");
  });

  // 冬をクリック時の処理
  document.getElementById("summer").addEventListener("click", () => {
    console.log("onclick: 夏");
    sendMessageToContentScript("summer");
  });

  // 秋をクリック時の処理
  document.getElementById("autumn").addEventListener("click", () => {
    console.log("onclick: 秋");
    sendMessageToContentScript("autumn");
  });

  // 冬をクリック時の処理
  document.getElementById("winter").addEventListener("click", () => {
    console.log("onclick: 冬");
    sendMessageToContentScript("winter");
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
