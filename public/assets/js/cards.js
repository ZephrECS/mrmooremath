const gameFrame = document.querySelector(".gameframe");
const container = document.querySelector(".container");
const searchBar = document.querySelector(".search-bar");
const categoriesSwitcher = document.getElementById("categories");

let activeGames,
	allGames,
	activeCategory = "all";

function loadIframe(path) {
	gameFrame.style.display = "block";
	document.getElementById("actualGameFrame").src = `/assets/storage${path}`;
	console.log("loading:" + path);
}

async function renderGames() {
	if (allGames == null) {
		const response = await fetch("/assets/json/storage.json");
		const data = await response.json();

		data.sort((a, b) => a.name.localeCompare(b.name));

		allGames = data;
		activeGames = allGames;
	}
	container.innerHTML = "";
	for (const game of activeGames) {
		if (
			game.category.toLowerCase() == activeCategory ||
			activeCategory == "all"
		) {
			const card = document.createElement("div");
			card.id = game.id;
			card.classList.add("card");
			const img = document.createElement("img");
			img.src = `/assets/img${game.img}`;
			card.appendChild(img);
			const p = document.createElement("p");
			p.textContent = game.name;
			card.appendChild(p);
			container.appendChild(card);
			card.addEventListener("click", () => {
				loadIframe(game.path);
			});
		}
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	await renderGames();
	searchBar.placeholder = `Search all of our ${activeGames.length} gаmes!`;
});
searchBar.addEventListener("input", (e) => {
	activeGames = allGames.filter(
		(game) =>
			game.name.toLowerCase().trim().includes(e.target.value) ||
			game.id.toLowerCase().trim().includes(e.target.value)
	);
	renderGames();
});
categoriesSwitcher.addEventListener("change", async (e) => {
	activeCategory = e.target.value.toLowerCase();
	await renderGames();
});

document.getElementById("closeFrame").addEventListener("click", () => {
	gameFrame.style.display = "none";
	document.getElementById("actualGameFrame").src = "about:blank";
});
document.getElementById("fullscreen").addEventListener("click", () => {
	document.getElementById("actualGameFrame").requestFullscreen();
});
document.getElementById("reload").addEventListener("click", () => {
	document.getElementById("actualGameFrame").contentWindow.location.reload();
});
