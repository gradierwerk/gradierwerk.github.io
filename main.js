function init(){
    const map = L.map('map', {zoomControl: false}).setView([Math.random() * 75,Math.random() * 360 - 180], 8);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png').addTo(map);
}

window.addEventListener("load", init);