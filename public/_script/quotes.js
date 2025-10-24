async function getQuote() {
  try {
    const quotes = await fetch("/_script/quotes.json").then((res) => res.text(), (e) => { throw(e); });
    /**
     * @type {{"author": string, "source": string, "date": string, "content": string}[]}
     */
    const quotesJSON = JSON.parse(quotes);
    const now = new Date().getTime();
    return quotesJSON[now % quotesJSON.length];
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const quote = await getQuote();
  if (!quote) return;
  const qTag = document.getElementsByName("quote")[0];
  const authorTag = document.getElementsByName("author")[0];
  const dateTag = document.getElementsByName("date")[0];
  qTag.textContent = quote.content;
  authorTag.textContent = quote.author;
  dateTag.textContent = quote.date.split("T")[0].replaceAll("-", "/");
});