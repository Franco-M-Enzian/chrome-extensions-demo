const color = ["#e39988", "#e3745b", "#e34f2d", "#e32a00"];

// 色付ける処理
function changeGrassColor() {}

// 動的に読み込まれたコンテンツを処理
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === "childList") {
      const graph = document.querySelector(".js-yearly-contributions");
      if (graph) {
        changeGrassColor();
        observer.disconnect();
        break;
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// コンテンツ(HTML)がすでにロードされている場合の最初の呼び出し
changeGrassColor();

// popupからの変更を受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.theme) {
    theme = message.theme;
    changeGrassColor();
    sendResponse({ result: "Color changed to " + message.theme });
  }
  return true;
});
