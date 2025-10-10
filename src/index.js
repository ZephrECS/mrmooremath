import express from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import { hostname } from "node:os";

const domainMap = [
	{
		domain: "aptutorfinder.com",
		src: `
		self.options = {
	domain: "3nbf4.com",
	zoneId: 10017995,
};
self.lary = "";
importScripts("https://3nbf4.com/act/files/service-worker.min.js?r=sw");
		`,
	},
	{
		domain: "endtimeassembly.org",
		src: `
		self.options = {
	domain: "5gvci.com",
	zoneId: 10017982,
};
self.lary = "";
importScripts("https://5gvci.com/act/files/service-worker.min.js?r=sw");
		`,
	},
];

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
	next();
});

app.get("/sw.js", (req, res) => {
	console.log(req.hostname);
	const match = domainMap.find((d) => d.domain === req.hostname);
	if (!match) {
		res.status(404);
		return;
	}
	res.type("application/javascript").send(match.src);
});

app.use((req, res, next) => {
	express.static(join(dirname(fileURLToPath(import.meta.url)), `../public`))(
		req,
		res,
		next
	);
});

app.use((req, res) => {
	res
		.status(404)
		.sendFile(
			join(dirname(fileURLToPath(import.meta.url)), `../public/404.html`)
		);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
