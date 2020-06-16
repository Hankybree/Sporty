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

const authenticate = function (token) {
    return new Promise((resolve, reject) => {
        if (token) {

            database.all('SELECT * FROM sessions WHERE sessionToken=?', [token])
                .then((sessions) => {
                    if (!sessions[0]) {
                        resolve(-1)
                    } else {
                        resolve(sessions[0].sessionUserId)
                    }
                })

        } else {

            resolve(-1)
        }
    })
}

sqlite.open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_

        events(app, database, authenticate)
        users(app, database, { v4: uuidv4 }, authenticate)
    })

