const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "usersystem"
})

app.get('/user', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/add', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    db.query("INSERT INTO users (name,age) VALUES(?,?)", [name, age],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values inserted")
            }
        });
});

app.put('/edit', (req, res) => {
    const id = req.body.id;
    const age = req.body.age;
    db.query("UPDATE users SET age= ? WHERE id = ?", [age, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?",id,(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});