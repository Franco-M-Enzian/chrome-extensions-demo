document.addEventListener("DOMContentLoaded", function () {
  // もみじをクリック時の処理
  document.getElementById("momiji").addEventListener("click", () => {
    console.log("onclick: もみじ");
    // sendMessageToContentScript("maple");
  });

  // イチョウをクリック時の処理
  document.getElementById("icho").addEventListener("click", () => {
    console.log("onclick: イチョウ");
    // sendMessageToContentScript("icho");
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
