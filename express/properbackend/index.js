import express from "express";
import mysql from "mysql2/promise";
import { configDB } from "./configDB.js";
import cors from "cors";

let connection;

try {
  connection = await mysql.createConnection(configDB);
} catch (err) {
  console.log(err);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/names/:day/:month", async (request, response) => {
  const {day, month } = request.params;
  try {
    const sql = `SELECT name from name_days WHERE month=${month} and day=${day}`;
    const values = [day,month];
    const [rows, fields] = await connection.execute(sql, values);
    if (rows.length > 0) {
      response.status(200).send(rows);
    } else {
      response.status(404).send({ msg: "Nincs találat!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/dates/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const sql = `SELECT * FROM name_days WHERE name= "${name}" `;
    console.log(sql);
    
    const values = [name];
    const [rows, fields] = await connection.execute(sql, values);
    if(rows.length>0){
      response.status(200).send(rows);
    }else{
      response.status(404).send({msg:'Nincs találat!'})
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/info/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const sql = `SELECT * FROM name_info WHERE name="${name}" `;
    const values = [name];
    const [rows, fields] = await connection.execute(sql, values);
    if(rows.length>0){

      response.status(200).send(rows);
    }else{
      response.status(404).json({msg:"nincs adat"})
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/info", async (request, response) => {
  const { name,gender,descr } = request.body;
  console.log(name,gender,descr);
  
  try {
    const sql = "INSERT INTO name_info (id,name, gender,descr) VALUES (?, ?, ?, ?)"
    const values = [null,name,gender,descr];
    const [rows, fields] = await connection.execute(sql, values);
    response.status(201).json({ msg: "Sikeres  hozzáadása!" });
  } catch (err) {
    console.log(err);
    response.status(409).json({ msg: "Már létezik" });
  }
});

app.delete("/api/info/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const sql = `DELETE FROM name_info WHERE name= "${name}";`;
    const values = [name];
    const [rows, fields] = await connection.execute(sql, values);
    response.status(200);
  } catch (err) {
    console.log(err);
  }
});

const port = 8000;
app.listen(port, () => console.log(`server listening on port ${port}...`));

