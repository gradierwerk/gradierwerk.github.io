/**
 * U+10000以降の文字（補助多言語面）に異体字セレクタ U+FE00 を追加する
 * iOSでの絵文字の正常な表示を保証するために使用
 * 
 * @param {string} text 処理対象の文字列
 * @returns {string} 異体字セレクタが追加された文字列
 */
function addVariationSelector(text) {
  const VARIATION_SELECTOR = '\uFE00';
  const SMP_THRESHOLD = 0x10000; // 補助多言語面の開始位置
  return Array.from(text, c => c.codePointAt(0) < SMP_THRESHOLD ? c : c + VARIATION_SELECTOR).join('');
}

/**
 * 指定されたセレクタに一致する全ての要素のテキストに異体字セレクタを追加する
 * **注意！** `textContent`の仕様により、要素内のHTML構造は破壊される
 * 
 * @param {string} selector CSSセレクタ（デフォルト: '.emoji'）
 */
function fixEmojiElements(selector = '.emoji') {
  document.querySelectorAll(selector).forEach(element => {
    element.textContent = addVariationSelector(element.textContent);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fixEmojiElements('.emoji');
});