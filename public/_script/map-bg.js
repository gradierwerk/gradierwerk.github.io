function initMap() {
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const latitude = randomRange(-75, 75);
  const longitude = randomRange(-180, 180);
  const zoomlevel = 8;
  console.log(`${latitude}, ${longitude}`);
  const map = L.map("map", { attributionControl:false, zoomControl: false }).setView([latitude, longitude], zoomlevel);
  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png").addTo(map);
}

document.addEventListener("DOMContentLoaded", initMap);