import express from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
	res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
	next();
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
