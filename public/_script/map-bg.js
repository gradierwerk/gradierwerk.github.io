/**
 * 海岸線SVGの読み込み
 * @returns {Promise<string>} SVGテキスト
 */
async function loadCoastline() {
  const response = await fetch("/_assets/coastline.svg");
  if (!response.ok) {
    throw new Error();
  }
  return response.text();
}

/**
 * SVGを折れ線群に変換
 * @param {string} svgText
 * @returns {{x1: number, y1: number, x2: number, y2: number, length: number}[]}
 */
function parseSVGtoPolyline(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const polyline = [];

  doc.querySelectorAll("polygon, polyline").forEach(el => {
    const points = el.getAttribute("points").trim().split(/[\s,]+/).map(Number);

    for (let i = 0; i < points.length - 2; i += 2) {
      const x1 = points[i], y1 = points[i + 1];
      const x2 = points[i + 2], y2 = points[i + 3];
      polyline.push({ x1, y1, x2, y2, length: Math.hypot(x2 - x1, y2 - y1) });
    }

    // 閉じる線分を追加
    if (el.tagName.toLowerCase() === "polygon") {
      const x1 = points[points.length - 2], y1 = points[points.length - 1];
      const x2 = points[0], y2 = points[1];
      polyline.push({ x1, y1, x2, y2, length: Math.hypot(x2 - x1, y2 - y1) });
    }
  });

  return polyline;
}

/**
 * 線分群上の一様乱数
 * @param {{x1: number, y1: number, x2: number, y2: number, length: number}[]} polyline
 * @returns {{x: number, y: number}}
 */
function randomOnPolyline(polyline) {
  const totalLength = polyline.reduce((sum, seg) => sum + seg.length, 0);
  let r = Math.random() * totalLength;
  for (const segment of polyline) {
    if (r < segment.length) {
      const t = r / segment.length;
      const x = segment.x1 + t * (segment.x2 - segment.x1);
      const y = segment.y1 + t * (segment.y2 - segment.y1);
      return { x, y };
    }
    r -= segment.length;
  }
}

/**
 * 円盤上の一様乱数
 * @param {number} radius
 * @returns {{x: number, y: number}}
 */
function randomOnCircle(radius) {
  const r = Math.sqrt(Math.random()) * radius;
  const t = Math.random() * Math.PI * 2;
  return { x:Math.cos(t) * r, y:Math.sin(t) * r };
}

/**
 * 剰余演算（JavaScript の % は負の数に対して期待通りに動作しない）
 * @param {number} a
 * @param {number} b
 * @returns {number} a mod b
 */
function fmod(a, b) {
  return a - b * Math.floor(a / b);
}

async function initMap() {
  const svgText = await loadCoastline();
  const polyline = parseSVGtoPolyline(svgText);

  // 極地を避けるため、ランダムに位置を選び直すためのループ
  while (true) {
    const randomPos = randomOnPolyline(polyline);
    const zitter = randomOnCircle(2);
    randomPos.x += zitter.x;
    randomPos.y += zitter.y;

    // coastline.svgは正距円筒図法なので、複雑な座標変換は不要
    const latitude = -randomPos.y;
    const longitude = fmod(randomPos.x, 360);
    const zoomlevel = 8;

    // 極地は地図がバグりやすいので除外
    if (latitude < -60 || latitude > 60) continue;

    console.log(`${latitude}, ${longitude}`);

    const map = L.map("map", { attributionControl: false, zoomControl: false }).setView([latitude, longitude], zoomlevel);
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png").addTo(map);
    break;
  }
}

window.addEventListener("load", initMap);
