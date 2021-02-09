const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// GET: /waiter --> end point untuk mengakses data waiter
app.get("/", (req,res) => {
    let sql = "select * from waiter"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                waiter: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /waiter/save --> end point untuk insert data waiter
app.post("/save", (req,res) => {
    let data = {
        id_waiter: req.body.id_waiter,
        nama_waiter: req.body.nama_waiter,
        user_waiter: req.body.user_waiter,
        pass_waiter: req.body.pass_waiter
    }
    let message = ""

    let sql = "insert into waiter set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})


//POST UPDATE WAITER
app.post("/update", (req,res) => {
    let data = [{
        id_waiter: req.body.id_waiter,
        nama_waiter: req.body.nama_waiter,
        user_waiter: req.body.user_waiter,
        pass_waiter: req.body.pass_waiter
    }, req.body.id_waiter]
    let message = ""
	
    let sql = "update waiter set ? where id_waiter = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /waiter/:id_waiter --> end point untuk hapus data waiter
app.delete("/:id_waiter", (req,res) => {
    let data = {
        id_waiter : req.params.id_waiter
    }
    let message = ""
    let sql = "delete from waiter where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /waiter --> end point untuk pencarian data waiter
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from waiter where id_waiter like '%"+find+"%' or nama_waiter like '%"+find+"%' or user_waiter like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                waiter: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})


module.exports = app
