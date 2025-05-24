import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const configDB={
    host:'localhost',
    user:'root',
    password:'',
    database:'vitagok',
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


app.get("/api/flowers", async (request, response) => {
    try {
      const sql = `SELECT * FROM aruk`;
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

  app.get("/api/flowers/:id", async (request, response) => {
    const {id} = request.params;
    try {
      const sql = `SELECT * FROM aruk WHERE id=?`;
      const values = [id];
      const [rows, fields] = await connection.execute(sql,values);
      if (rows.length > 0) {
        response.status(200).send(rows);
      } else {
        response.status(404).send({ msg: "Nincs találat!" });
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/api/flowers", async (request, response) => {
    const { nev,kategoriaId,leiras,keszlet,ar,kepUrl } = request.body;
    console.log(nev,kategoriaId,leiras,keszlet,ar,kepUrl);
    try {
      const sql = "INSERT INTO aruk (nev,kategoriaId,leiras,keszlet,ar,kepUrl) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [nev, kategoriaId, leiras, keszlet, ar, kepUrl];
      const [rows, fields] = await connection.execute(sql, values);
      response.status(201).json({ msg: "Sikeres  hozzáadása!" });
    } catch (err) {
      console.log(err);
      response.status(409).json({ msg: "Már létezik" });
    }
  });

  app.put("/api/flowers/:id", async (request, response) => {
    const {id} = request.params;
    const { nev,kategoriaId,leiras,keszlet,ar,kepUrl } = request.body;
    console.log(nev,kategoriaId,leiras,keszlet,ar,kepUrl);
    try {
      const sql = `
      UPDATE aruk
      SET nev = ?, kategoriaId = ?, leiras = ?, keszlet = ?, ar = ?, kepUrl = ?
      WHERE id = ?
    `
      const values = [nev, kategoriaId, leiras, keszlet, ar, kepUrl,id];
      const [result] = await connection.execute(sql, values);
      if (result.affectedRows === 0) {
        return response.status(404).json({ msg: "Nem található a megadott ID-vel." });
      }
      response.status(200).json({ msg: "Sikeres frissítés!" });
    } catch (err) {
      console.error(err);
      response.status(500).json({ msg: "Hiba a frissítés során", error: err.message });
    }
  });

  app.delete("/api/flowers/:id", async (request, response) => {
    const {id} = request.params;
    try {
      const sql = `DELETE FROM aruk WHERE id = ?`;
      const [result] = await connection.execute(sql, [id]);
      if(result.affectedRows===0){
        return response.status(404).send({msg:"Nem talalhato ilyen id-ju ovrag"})
      }
      response.status(200).send({ msg: "Sikeres torles!" });
    } catch (err) {
      response.status(509).send({msg:"Sikertelen torles :'("})
      console.log(err);
    }
  });

  app.get("/api/categories", async (request, response) => {
    try {
      const sql = `SELECT * FROM kategoriak`;
      const [rows, fields] = await connection.execute(sql);
      if (rows.length > 0) {
        response.status(200).send(rows);
      } else {
        response.status(404).send({ msg: "Nincs találat!" });
      }
    } catch (err) {
      console.log(err);
    }
  });

app.listen(PORT, () => console.log("Server is listening on port: " + PORT))