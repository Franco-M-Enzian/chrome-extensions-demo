const colors = {
  winter: ["#00d5ff", "#00aaff", "#0080ff", "#002bff"],
  spring: ["#ff99ee", "#ff80ea", "#ff66e6", "#ff00ff"],
  autumn: ["#e39988", "#e3745b", "#e34f2d", "#e32a00"],
};
let theme = "winter"; //初期は冬

// 色付ける処理
function changeGrassColor() {
  const days = document.querySelectorAll(".ContributionCalendar-day");
  const selectedColor = (() => {
    switch (theme) {
      case "winter":
        return colors.winter;
      case "spring":
        return colors.spring;
      case "autumn":
        return colors.autumn;
      default:
        return colors.winter;
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
