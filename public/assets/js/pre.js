"use strict";
const stockSW = "./sw.js";

const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");

		throw new Error("Your browser doesn't support service workers.");
	}

	await navigator.serviceWorker.register(stockSW);
}

function search(input, template) {
	try {
		return new URL(input).toString();
	} catch (err) {}

	try {
		const url = new URL(`http://${input}`);
		if (url.hostname.includes(".")) return url.toString();
	} catch (err) {}
	return template.replace("%s", encodeURIComponent(input));
}
("use strict");
const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: "/marcs/scramjet.wasm.wasm",
		all: "/marcs/scramjet.all.js",
		sync: "/marcs/scramjet.sync.js",
	},
});

scramjet.init();

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");

const connection = new BareMux.BareMuxConnection("/mux/worker.js");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		throw err;
	}

	const url = search(address.value, "https://duckduckgo.com/?q=%s");

	let frame = document.getElementById("sj-frame");
	frame.style.display = "block";
	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";
	if ((await connection.getTransport()) !== "/ep/index.mjs") {
		await connection.setTransport("/ep/index.mjs", [{ wisp: wispUrl }]);
	}
	const sjEncode = scramjet.encodeUrl.bind(scramjet);
	frame.src = sjEncode(url);
});
