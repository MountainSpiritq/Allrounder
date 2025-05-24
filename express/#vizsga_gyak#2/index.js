import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const configDB={
    host:'localhost',
    user:'root',
    password:'',
    database:'plants',
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

app.get("/api/categories",async(req,res)=>{
    try {
        const sql='SELECT * FROM categories'
        const[rows,fields]=await connection.execute(sql)
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(404).json("Nem jo")
    }
})

app.get("/api/plants/:categId",async(req,res)=>{
    const categId=req.params.categId
    try {
        const sql='SELECT * FROM plants WHERE categId=?'
        const[rows,fields]=await connection.execute(sql,[categId])
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/search/:name",async(req,res)=>{
    const name=req.params.name
    try {
        const sql='SELECT * FROM plants WHERE name LIKE(?)'
        const[rows,fields]=await connection.execute(sql,[`%${name}%`])
        if(rows.length==0){
            res.status(404).json("nincs talalat!")
            return
        }
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => console.log("Server is listening on port: " + PORT))