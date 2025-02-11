import express from 'express'
import mysql from "mysql2/promise";
import cors from "cors";
import { configDB } from "./configDB.js";

const app = express()
app.use(express.json())

const PORT = 8000
let connection;

try {
  connection = await mysql.createConnection(configDB);
} catch (error) {
  console.log(error);
}

app.get("/api/flowers", async (req, res) => {
    try {
        const sql = `SELECT aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev AS kategoria_nev FROM aruk
                    INNER JOIN kategoriak ON aruk.kategoriaId = kategoriak.id ORDER BY aruk.id`
        const [rows, fields] = await connection.execute(sql)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/flowers/:id", async (req, res) => {
    try {
        const { id } = req.params
        const sql = `SELECT aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev AS kategoria_nev FROM aruk
                    INNER JOIN kategoriak ON aruk.kategoriaId = kategoriak.id WHERE aruk.id = ? ORDER BY aruk.id `
        const [rows, fields] = await connection.execute(sql, [+id])
        if(rows.length == 0){
            return res.status(404).send({msg: "A virág nem található"})
        }
        res.send(rows)
    } catch (error) {
        console.log(error);
        
    }
})

app.post("/api/flowers", async (req, res) => {
    const { nev, kategoriaId, leiras, keszlet, ar, kepUrl } = req.body
    console.log(nev, kategoriaId, leiras, keszlet, ar, kepUrl);
    
    try {
        const sql = `INSERT INTO aruk VALUES (?,?,?,?,?,?,?)`        
        const values = [null, nev, kategoriaId, leiras, keszlet, ar, kepUrl]
        const [result] = await connection.execute(sql, values)
        res.status(201).send({msg: "Sikeres hozzáadás"})
    } catch (error) {
        console.log(error);
        
    }
})

app.put("/api/flowers/:id", async (req, res) => {
    const { nev, leiras, keszlet, ar} = req.body
    const { id } = req.params
    try {
        const sql = `UPDATE aruk SET nev = ?, leiras = ?, keszlet = ?, ar = ? WHERE id = ?`
        const values = [nev, leiras, keszlet, ar, +id]
        const [result] = await connection.execute(sql, values)
        if(result.affectedRows == 1){
            res.status(200).json({msg: "sikeres módositás"})
        }else{
            res.status(404).json({msg: "A termek nem talalható"})
        }
    } catch (error) {
        console.log(error);
        
    }
})

app.delete("/api/flowers/:id", async (req, res) => {
    try {
        const { id } = req.params
        const sql = `DELETE FROM aruk WHERE id = ?`
        const [result] = await connection.execute(sql, [id])
        if(result.affectedRows == 1){
            res.status(200).send({msg: "Sikeres törlés"})
        }else{
            return res.status(404).send({msg: "A virág nem található"})
        }
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/categories", async (req, res) => {
    try {
        const sql = `SELECT * FROM kategoriak`
        const [rows, fields] = await connection.execute(sql)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(PORT, () => console.log("Server is listening on port: " + PORT))
app.use(express.json())
