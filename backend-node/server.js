import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tracks = ["React JS", "Node.js", "Python", "Java"];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "node-api" });
});

app.get("/api/tracks", (_req, res) => {
  res.json({ tracks });
});

app.listen(port, () => {
  console.log(`Node API running on http://localhost:${port}`);
});
