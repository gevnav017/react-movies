const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Scorpio6356.",
    database: "CRUD"
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    const sql = "SELECT * FROM movies"
    db.query(sql, (err, result) => {
        res.send(result)
    })
})

app.post('/insert', (req, res) => {
    const movie = req.body.movie
    const sql = "INSERT INTO movies (movie) VALUES (?)"
    db.query(sql, movie, (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log('listening on port 3001')
})