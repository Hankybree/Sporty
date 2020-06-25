const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3500, () => {
    console.log('Listening on port 3500')
})

const events = require('./events.js')
const users = require('./users.js')
const secret = require('./secret.js')

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

sqlite.open({ driver: sqlite3.Database, filename: 'database.sqlite' })
    .then((database_) => {
        database = database_

        events(app, database, authenticate)
        users(app, database, { v4: uuidv4 }, authenticate)
    })

app.post('/contact', (request, response) => {
    contactUs(request.body.subject, request.body.mail, request.body.message, response)
})

function contactUs(subject, mailAddress, message, response) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: secret().mail,
            pass: secret().pw
        }
    })
    const mailOptions = {
        from: secret().mail,
        to: [secret().mail],
        subject: subject,
        text: mailAddress + '\n\n' + message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.send(JSON.stringify({ message: 'An error ocurred. Message is not sent', status: 2 }))
        } else {
            response.send(JSON.stringify({ message: 'message sent', status: 1 }))
        }
    })
}
