import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const configDB={
    host:'localhost',
    user:'root',
    password:'',
    database:'ingatlanok',
    multipleStatements:true
}

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000
let connection;

try {
    connection = await mysql.createConnection(configDB);
} catch (error) {
    console.log(error);
}


app.get("/api/property", async (request, response) => {
  
  try {
    const sql = "SELECT * FROM `ingatlanok`" 
   
    const [rows, fields] = await connection.execute(sql);
    if (rows.length > 0) {
      response.status(200).json(rows);
    } else {
      response.status(404).json({ msg: "Nincs találat!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/property/:id", async (request, response) => {
  const id=request.params.id
  try {
    const sql = "SELECT * FROM `ingatlanok` WHERE id=?" 
   
    const [rows, fields] = await connection.execute(sql,[id]);
    if (rows.length > 0) {
      response.status(200).json(rows);
    } else {
      response.status(404).json({ msg: "Nincs találat!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/property", async (request, response) => {
  const { kategoriaId,leiras,hirdetesDatuma,tehermentes,ar,kepUrl } = request.body;
  try {
    const sql = "INSERT INTO ingatlanok (id,kategoriaId,leiras,hirdetesDatuma,tehermentes,ar,kepUrl) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [null,kategoriaId,leiras,hirdetesDatuma,tehermentes,ar,kepUrl];
    const [rows, fields] = await connection.execute(sql, values);
    response.status(201).json({ msg: "CREATED" });
  } catch (err) {
    console.log(err);
    response.status(409).json({ msg: "Már létezik" });
  }
});

app.put("/api/property/:id", async (request, response) => {
    const id=request.params.id
  const { leiras,ar } = request.body;
  try {
    const sql = "UPDATE ingatlanok SET leiras = ?, ar= ? WHERE id = ?"
    const values = [leiras,ar,id];
    const [rows, fields] = await connection.execute(sql, values);
    response.status(200).json({ msg: "Sikeres modositas" });
  } catch (err) {
    console.log(err);
    response.status(409).json({ msg: "Már létezik" });
  }
});

app.delete("/api/property/:id", async (request, response) => {
  const id=request.params.id
  try {
    const sql = "DELETE FROM ingatlanok WHERE id=?" 
   
    const [result] = await connection.execute(sql,[id]);
    if (result.affectedRows === 0) {
      response.status(404).json("Nincs talalat!");
    } 
     response.status(200).json("Sikeres torles!");
} catch (err) {
      response.status(500).json({ msg: "Szerver hiba" });
    console.log(err);
  }
});

app.get("/api/categories", async (request, response) => {
  try {
    const sql = "SELECT * FROM `kategoriak`" 
    const [rows, fields] = await connection.execute(sql);
    if (rows.length > 0) {
      response.status(200).json(rows);
    } else {
      response.status(404).json({ msg: "Nincs találat!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("Server is listening on port: " + PORT))