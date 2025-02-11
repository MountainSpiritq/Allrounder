
import mysql from 'mysql2'

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'testdb'
}).promise()

export async function getFoods() {
    const [result]=await pool.query('SELECT * FROM foods')
    return result
}

export async function getFood(id) {
    const [result]=await pool.query(`
        SELECT *
         FROM foods
         WHERE id=?
        `,[id])
    return result
}

export async function addFood(name,price) {
    const [result]=await pool.query(
        `INSERT INTO foods(name,price)
        VALUES(?, ?)
        `,[name,price])
        return result
}





