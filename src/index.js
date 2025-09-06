import express from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
	if (req.cookies.token && req.cookies.token === "quasar") {
		express.static(join(dirname(fileURLToPath(import.meta.url)), "../public"))(
			req,
			res,
			next
		);
	} else {
		express.static(
			join(dirname(fileURLToPath(import.meta.url)), "../homepage")
		)(req, res, next);
	}
});

app.use((req, res, next) => {
	if (req.cookies.token) {
		res
			.status(404)
			.sendFile(
				join(dirname(fileURLToPath(import.meta.url)), "../public/404.html")
			);
	} else {
		res
			.status(404)
			.sendFile(
				join(dirname(fileURLToPath(import.meta.url)), "../homepage/404.html")
			);
	}
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
