document.querySelectorAll(".code-wrapper").forEach((codeBlock) => {
  codeBlock.addEventListener("click", async function () {
    try {
      text = this.querySelector("code").textContent;
      await navigator.clipboard.writeText(text);
      this.classList.add("clicked");
      setTimeout(() => this.classList.remove("clicked"), 1500);
    } catch (err) {
      console.error("copy failed", err);
    }
  });
});