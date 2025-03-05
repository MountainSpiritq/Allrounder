import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const configDB={
    host:'localhost',
    user:'root',
    password:'',
    database:'trendek',
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

app.get("/api/trends/:categId", async (req, res) => {
    let searchId=req.params.categId

    
    try {
        const sql = `SELECT * FROM trends INNER JOIN categories ON trends.categId=categories.id WHERE categId=${searchId} ORDER BY trends.name ASC`
        const [rows, fields] = await connection.execute(sql)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/search/:keyWord", async (req, res) => {
    let keyWord=req.params.keyWord
    console.log(keyWord);
    
    try {
        const sql = `SELECT name,description FROM trends WHERE trends.name LIKE '%${keyWord}%' OR trends.description LIKE '%${keyWord}%'`
        console.log(sql);
        
        const [rows, fields] = await connection.execute(sql)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/categories", async (req, res) => {
    try {
        const sql = `SELECT name FROM categories `
        console.log(sql);
        
        const [rows, fields] = await connection.execute(sql)
        res.status(200).send(rows)
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/categories", async (request, res) => {
    const {name} = request.body
    console.log(request.body);
    
   console.log(name)
    try {
        const sql = `INSERT INTO categories VALUES(?,?)`        
        const values = [null, name]
        const [result] = await connection.execute(sql, values)
        res.status(201).send({msg: "Sikeres hozzáadás"})
    } catch (error) {
        console.log(error);
        
    }
})

app.put("/api/impact/", async (req, res) => {
    const {impact,id} = req.body
    

    try {
        const sql = `UPDATE trends SET impact=? WHERE trends.id=?`
        const values = [impact,id]
        const [result] = await connection.execute(sql, values)
        if(result.affectedRows == 1){
            res.status(200).json({msg: "sikeres módositás"})
        }else{
            res.status(404).json({msg: "Nem található trend"})
        }
    } catch (error) {
        console.log(error);
        
    }
})


app.listen(PORT, () => console.log("Server is listening on port: " + PORT))
