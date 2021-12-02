const express = require('express')
const path = require('path')
const fs = require('fs')
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.post('/api/notes', (req, res) => {
    console.log('title', req.body.title)
    console.log('text', req.body.text)

    db.push(req.body)

    // fs.appendFile('./db/db.json', `${db.push(req.body)}`, (err) => {
    //     err ? console.error(err) : console.log("Added note to the database")
    // })

    fs.writeFile('./db/db.json', `${JSON.stringify(db)}`, (err) => {
        err ? console.error(err) : console.log("Added note to the database")
    })
    
    
    res.send(db)
})

app.listen(PORT,  () => {
    console.log(`Server listening on port ${PORT}`)
})