function isExternalLink(href) {
  try {
    const url = new URL(href, location.href);
    return (url.protocol === "http:" || url.protocol === "https:") && url.origin !== location.origin;
  } catch (e) {
    // URLのパースに失敗した場合は無視
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach(a => {
    if (isExternalLink(a.href)) {
      a.target = "_blank";
    }
  });
});