import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { Coffee } from "./types/coffees";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const coffeesFilePath = path.join(__dirname, ".", "data", "coffees.json");

app.get("/coffees", (req: Request, res: Response) => {
  try {
    const fileContents = fs.readFileSync(coffeesFilePath, "utf-8");
    const coffees: Coffee[] = JSON.parse(fileContents);
    res.json(coffees);
  } catch (error) {
    console.error("Error reading coffees.json", error);
    res.status(500).json({ message: "Failed to load coffees data" });
  }
});

app.listen(port, () => {
  console.log(`Kofi backend listening on http://localhost:${port}`);
});

