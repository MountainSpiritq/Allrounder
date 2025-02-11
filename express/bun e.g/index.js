import { getFood, getFoods, addFood } from "./database";
import express from "express";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// GET all foods
app.get("/foods", async (req, res) => {
  const foods = await getFoods();
  res.send(foods);
});

// GET food by ID
app.get("/foods/:id", async (req, res) => {
  const id = req.params.id;
  const food = await getFood(id);
  res.send(food);
});

// POST new food
app.post("/foods", async (req, res) => {
  const { name, price } = req.body;
  console.log("Received data:", req.body); // Debugging line
  const sentFood = await addFood(name, price);
  res.json(sentFood);
});




// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
