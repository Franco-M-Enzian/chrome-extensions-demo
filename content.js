const colors = {
  momiji: ["#e39988", "#e3745b", "#e34f2d", "#e32a00"],
  icho: ["#f7dd94", "#f7d063", "#f7c331", "#f8b500"],
};
let theme = "momiji"; //初期はもみじ

// 色付ける処理
function changeGrassColor() {
  const days = document.querySelectorAll(".ContributionCalendar-day");
  const selectedColor = (() => {
    switch (theme) {
      case "momiji":
        return colors.momiji;
      case "icho":
        return colors.icho;
      default:
        return colors.momiji;
    }
  })();

  days.forEach((day) => {
    const level = day.getAttribute("data-level");
    if (level > 0 && level <= 4) {
      day.style.fill = selectedColor[level - 1];
      day.style.backgroundColor = selectedColor[level - 1];
    }
  });
}

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
