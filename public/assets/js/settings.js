const cursorSpeedSlider = document.getElementById("cursorSpeed");
const currentSpeed = document.getElementById("currentSpeed");

cursorSpeedSlider.addEventListener("input", (e) => {
  console.log(e.target.value);
  currentSpeed.textContent = e.target.value;
  localStorage.setItem("cursorSpeed", e.target.value);
});
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cursorSpeed") != null) {
    currentSpeed.textContent = localStorage.getItem("cursorSpeed");
    cursorSpeedSlider.value = localStorage.getItem("cursorSpeed");
  }
});
