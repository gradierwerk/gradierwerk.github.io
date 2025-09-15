function init(){
    const map = L.map('map', {zoomControl: false}).setView([Math.random() * 75,Math.random() * 360 - 180], 8);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png').addTo(map);
}

function syncHeight() {
    const main = document.querySelector("main");
    const target = document.getElementById("map");
    target.style.height = main.offsetHeight + "px";
}

//ロード時
window.addEventListener("load", () => { init(); syncHeight(); });
// ウィンドウリサイズ時にも同期
window.addEventListener("resize", syncHeight);