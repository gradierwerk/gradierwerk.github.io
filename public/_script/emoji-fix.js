/**
 * U+10000以降の文字（補助多言語面）に異体字セレクタ U+FE0F を追加する関数
 * iOSでの絵文字の正常な表示を保証するために使用
 * 
 * @param {string} text - 処理対象の文字列
 * @returns {string} 異体字セレクタが追加された文字列
 */
function addVariationSelector(text) {
  const VARIATION_SELECTOR = '\uFE0F';
  const SMP_THRESHOLD = 0x10000; // 補助多言語面の開始位置
  
  let result = '';
  
  for (const char of text) {
    const codePoint = char.codePointAt(0);
    result += char;
    
    // U+10000以降の文字に異体字セレクタを追加
    if (codePoint >= SMP_THRESHOLD) {
      result += VARIATION_SELECTOR;
    }
  }
  
  return result;
}

/**
 * 指定されたセレクタに一致する全ての要素のテキストに異体字セレクタを追加
 * 
 * @param {string} selector - CSSセレクタ（デフォルト: '.emoji'）
 */
function fixEmojiElements(selector = '.emoji') {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = addVariationSelector(element.textContent);
  });
}

// DOMContentLoaded時に自動実行
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    fixEmojiElements('.emoji');
  });
}

// モジュールとしてエクスポート（必要に応じて）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addVariationSelector, fixEmojiElements };
}
