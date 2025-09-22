import express from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import "dotenv/config";
import helmet from "helmet";

app.use(helmet({ hsts: false }));

const app = express();

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);

app.use((req, res, next) => {
	const folder = req.cookies.token === "quasar" ? "public" : "homepage";
	express.static(join(__dirname, "..", folder))(req, res, next);
});

app.use((req, res) => {
	const folder = req.cookies.token === "quasar" ? "public" : "homepage";
	res.status(404).sendFile(join(__dirname, "..", folder, "404.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
