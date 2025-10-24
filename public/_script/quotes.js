/**
 * @returns {Promise<{author: string, source: string, date: string, content: string}[]>}
 */
async function loadQuotes() {
  // 本当はJSON Modulesを使いたいが、新しい機能ゆえブラウザでのサポートが狭すぎるので`fetch`を使う
  const response = await fetch("/_script/quotes.json");
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}

async function getQuote() {
  const quotes = await loadQuotes();
  const now = new Date().getTime();
  return quotes[now % quotes.length];
}

/**
 * @param {{author: string, source: string, date: string, content: string}} quote
 */
function showQuote(quote) {
  const qTag = document.querySelector("[name=quote]");
  const authorTag = document.querySelector("[name=author]");
  const dateTag = document.querySelector("[name=date]");
  qTag.textContent = quote.content;
  authorTag.textContent = quote.author;
  dateTag.textContent = quote.date.split("T")[0].replaceAll("-", "/");
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const quote = await getQuote();
    showQuote(quote);
  } catch (e) {
    console.error(e);
  }
});