const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

let database

sqlite.open({ driver: sqlite3.Database, filename: 'database.sqlite'})
    .then((database_) => {
        database = database_
    })

app.get('/events', (request, response) => {
    database.all('SELECT * FROM events')
    .then((events) => {

        events.forEach(event => {
            event.eventGoers = JSON.parse(event.eventGoers)
        })

        response.send(events)
    })
})

app.get('/events/:event', (request, response) => {
    database.all('SELECT * FROM events WHERE eventId=?', [request.params.event])
        .then((events) => {
            console.log(events[0])
            events[0].eventGoers = JSON.parse(events[0].eventGoers)

            response.send(events[0])
        })
})

app.post('/events', (request, response) => {
    response.send('post')
})

app.patch('/events/:event', (request, response) => {
    response.send('patch')
})

app.delete('/events/:event', (request, response) => {
    response.send('delete')
})

