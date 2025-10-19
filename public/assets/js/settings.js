const cursorSpeedSlider = document.getElementById("cursorSpeed");
const currentSpeed = document.getElementById("currentSpeed");
const panicButton = document.getElementById("panicKey");
const panicURL = document.getElementById("panicURL");
const abCloak = document.getElementById("abCloak");
const themeOptions = document.querySelectorAll(".theme-option");
let listening = false;

if (localStorage.getItem("activeTheme") == null) {
	localStorage.setItem("activeTheme", "theme-classic");
}

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
	if (localStorage.getItem("focusCloaking") == null) {
		localStorage.setItem("focusCloaking", true);
	}
	const allThemes = document.querySelectorAll(".theme-option");
	document.body.classList.add(
		localStorage.getItem("activeTheme") || "theme-classic"
	);
	allThemes.forEach((option) => {
		option.addEventListener("click", () => {
			document.body.classList.remove(localStorage.getItem("activeTheme"));
			const theme = option.getAttribute("data-theme-class");
			localStorage.setItem("activeTheme", theme);
			document.body.classList.add(theme);
		});
	});
	if (document.getElementById("focusCloaking")) {
		document
			.getElementById("focusCloaking")
			.classList.toggle(
				"active",
				localStorage.getItem("focusCloaking") === "true"
			);
		document.getElementById("focusCloaking").addEventListener("click", () => {
			document.getElementById("focusCloaking").classList.toggle("active");
			localStorage.setItem(
				"focusCloaking",
				document.getElementById("focusCloaking").classList.contains("active")
			);
		});
	}
	if (abCloak != null) {
		abCloak.addEventListener("click", (e) => {
			const ab = window.open("about:blank", "_blank");
			if (ab) {
				ab.document.write(`
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; height: 100vh">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body style="margin: 0; padding: 0; height: 100vh; overflow: hidden">
		<iframe
			width="100%"
			height="100%"
			style="margin: 0"
			src="${window.location.origin}"
		></iframe>
	</body>
</html>

					`);
				window.location.href = "https://classroom.google.com";
			}
		});
	}
	if (panicButton != null) {
		panicButton.textContent = `Panic Key: ${localStorage.getItem("panicKey")}`;
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
			if (!e.target.value.includes("https") || !e.target.value.includes("http"))
				url = "https://" + url;
			localStorage.setItem("panicURL", url);
		});
	}
});

let faviconLink = document.querySelector('link[rel*="shortcut icon"]');
document.addEventListener("visibilitychange", (e) => {
	if (document.hidden && localStorage.getItem("focusCloaking") == "true") {
		document.title = "Home";
		faviconLink.href = "/assets/img/gclass.png";
	} else {
		document.title = "Quasar";
		faviconLink.href = "/assets/img/favicon.png";
	}
});
