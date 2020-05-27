const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

app.use(express.json())
app.use(cors())

app.listen({ port: 12002 }, () => {
    console.log('nu funkar det')
})

let database

sqlite
    .open({ driver: sqlite3.Database, filename: 'database.sqlite' })
    .then((database_) => {
        database = database_
    })

app.get('/', (request, response) => {
    response.send('get one')
})

app.get('/', (request, response) => {
    response.send('get many')
})

app.post('/events', (request, response) => {
    database
        .run('INSERT INTO events (eventSport, eventTitle, eventDescription, eventGoers, eventUser) VALUES (?, ?, ?, ?, ?)',
            [
                request.body.eventSport,
                request.body.eventTitle,
                request.body.eventDescription,
                request.body.eventGoers,
                request.body.eventUser
            ])

        .then(() => {
            response.status(200).send('Event Created!')
        })
        .catch(error => {
            response.send(error)
        })
})

app.delete('/', (request, response) => {

})

