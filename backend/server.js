const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3500, () => {
    console.log('Listening on port 3500')
})

const events = require('./events.js')
const users = require('./users.js')

let database

sqlite.open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_

        events(app, database)
        users(app, database, { v4: uuidv4 })
    })

