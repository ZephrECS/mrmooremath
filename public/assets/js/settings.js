const cursorSpeedSlider = document.getElementById("cursorSpeed");
const currentSpeed = document.getElementById("currentSpeed");
const panicButton = document.getElementById("panicKey");
const panicURL = document.getElementById("panicURL");
let listening = false;

if (cursorSpeedSlider != null) {
	cursorSpeedSlider.addEventListener("input", (e) => {
		console.log(e.target.value);
		currentSpeed.textContent = e.target.value;
		localStorage.setItem("cursorSpeed", e.target.value);
	});
}

window.addEventListener("keypress", (e) => {
	if (listening) {
		localStorage.setItem("panicKey", e.key);
		console.log(e.key);
		listening = false;
		if (panicButton) {
			panicButton.textContent = `Panic Key set to ${e.key}`;
			setTimeout(() => {
				panicButton.textContent = `Panic Key: ${localStorage.getItem(
					"panicKey"
				)}`;
			}, 3000);
		}
	} else {
		if (e.key == localStorage.getItem("panicKey")) {
			window.open(localStorage.getItem("panicURL"));
		}
	}
});
document.addEventListener("DOMContentLoaded", () => {
	if (
		localStorage.getItem("cursorSpeed") != null &&
		currentSpeed != null &&
		cursorSpeedSlider != null
	) {
		currentSpeed.textContent = localStorage.getItem("cursorSpeed");
		cursorSpeedSlider.value = localStorage.getItem("cursorSpeed");
	}
	if (localStorage.getItem("panicKey") == null) {
		localStorage.setItem("panicKey", "`");
	}
	if (localStorage.getItem("panicURL") == null) {
		localStorage.setItem("panicURL", "https://classroom.google.com");
	}
	if (panicButton != null) {
		panicButton.textContent = `Panic Key: "${localStorage.getItem(
			"panicKey"
		)}"`;
		panicButton.addEventListener("click", (e) => {
			listening = !listening;
			if (listening) {
				panicButton.textContent = "Listening...";
			} else {
				panicButton.textContent = `Panic Key: ${localStorage.getItem(
					"panicKey"
				)}`;
			}
		});
	}
	if (panicURL != null) {
		panicURL.value = localStorage.getItem("panicURL");
		panicURL.addEventListener("change", (e) => {
			let url = e.target.value.trim();
			if (
				!e.target.value.includes("https://") ||
				!e.target.value.includes("http://")
			)
				url = "https://" + url;
			localStorage.setItem("panicURL", url);
		});
	}
});
