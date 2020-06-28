module.exports = function (app, database, accessToken, authenticate, nodemailer, secret) {

    const bcrypt = require('bcrypt')

    const sendConfirmation = function (mailAddress, response) {
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
            to: [mailAddress],
            subject: 'Welcome to Sporty!',
            text: 'This is a confirmation that you successfully joined Sporty. Now there will be no more days sporting solo. Unless you want that ofcourse! \n\nBest regards, \n\nSporty'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                response.send(JSON.stringify({ message: 'An error ocurred. Message is not sent', status: 2 }))
            } else {
                response.status(201).send(JSON.stringify({ message: 'User created', status: 1 }))
            }
        })
    }
    const sendResetPassword = function (mailAddress, resetToken, response) {
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
            to: [mailAddress],
            subject: 'Password reset',
            text: 'To reset your password follow this link: \n\nhttp://localhost:8080/#/' + resetToken + ' \n\nThis link will cease to exist in one hour. \n\nBest regards, \n\nSporty'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                response.send(JSON.stringify({ message: 'An error ocurred. Message is not sent', status: 2 }))
            } else {
                response.status(201).send(JSON.stringify({ message: 'Follow the link in your e-mail to reset password', status: 1 }))
            }
        })
    }

    app.post('/signup', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (users[0] === undefined) {

                    const saltRounds = 10

                    bcrypt.hash(request.body.userPassword, saltRounds, function (err, hash) {
                        database.run('INSERT INTO users (userName, userPassword, userMail, userDescription, userEvents) VALUES (?, ?, ?, ?, ?)',
                            [
                                request.body.userName,
                                hash,
                                request.body.userMail,
                                '',
                                '[]'
                            ]).then(() => {
                                sendConfirmation(request.body.userMail, response)
                            }).catch((error) => {
                                response.send(error)
                            })
                    })
                } else {
                    response.send(JSON.stringify({ message: 'Username is already in use', status: 2 }))
                }
            })
    })

    app.post('/login', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (users[0] === undefined) {
                    response.send(JSON.stringify({ message: 'Incorrect username or password', status: 2 }))
                    return
                }

                bcrypt.compare(request.body.userPassword, users[0].userPassword, function (err, result) {
                    if (result) {
                        database.all('SELECT * FROM sessions WHERE sessionUserId=?', [users[0].userId])
                            .then((sessions) => {
                                if (sessions[0] === undefined) {

                                    const token = accessToken.v4()
                                    const userId = users[0].userId
                                    const userName = users[0].userName

                                    database.run('INSERT INTO sessions (sessionUserId, sessionToken) VALUES (?, ?)',
                                        [
                                            userId,
                                            token
                                        ]).then(() => {
                                            response.send(JSON.stringify({ message: 'Logged in', status: 1, token: token, userId: userId, userName: userName }))
                                        })
                                } else {
                                    response.send(JSON.stringify({ message: 'Already logged in', status: 3 }))
                                }
                            })
                    } else {
                        response.send(JSON.stringify({ message: 'Incorrect username or password', status: 2 }))
                    }
                })
            })
    })

    app.delete('/logout', (request, response) => {

        if (request.get('Token')) {

            database.run('DELETE FROM sessions WHERE sessionToken=?', [request.get('Token')])
                .then(() => {
                    response.send(JSON.stringify({ message: 'Logged out', status: 1 }))
                })

        } else {
            response.send(JSON.stringify({ message: 'You are not logged in', status: 2 }))
        }
    })

    app.delete('/users', (request, response) => {

        authenticate(request.get('Token'))
            .then((user) => {

                if (user !== -1) {
                    database.run('DELETE FROM users WHERE userId=?', [user])
                        .then(() => {

                            database.run('DELETE FROM events WHERE eventUserId=?', [user])
                                .then(() => {

                                    database.run('DELETE FROM sessions WHERE sessionUserId=?', [user])
                                        .then(() => {

                                            response.send(JSON.stringify({ message: 'User deleted', status: 1 }))
                                        })
                                })
                        })
                } else {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                }
            })
    })

    app.get('/session', (request, response) => {

        database.all('SELECT * FROM sessions WHERE sessionToken=?', [request.get('Token')])
            .then((sessions) => {

                database.all('SELECT * FROM users WHERE userId=?', [sessions[0].sessionUserId])
                    .then((users) => {
                        response.send({ userId: sessions[0].sessionUserId, userName: users[0].userName })
                    })
            })
    })

    app.post('/resetpassword', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (!users[0]) {
                    response.send(JSON.stringify({ message: 'User does not exist', status: 2 }))
                } else {

                    database.all('SELECT * FROM resets WHERE resetUserName=?', [users[0].userName])
                        .then((resets) => {
                            if (resets) {

                                database.run('DELETE FROM resets WHERE resetUserName=?', [users[0].userName])
                                    .then(() => {
                                        const resetToken = accessToken.v4()

                                        database.run('INSERT INTO resets (resetToken, resetUserName) VALUES (?, ?)',
                                            [
                                                resetToken,
                                                request.body.userName
                                            ]).then(() => {

                                                sendResetPassword(users[0].userMail, resetToken, response)
                                            })
                                    })
                            } else {

                                const resetToken = accessToken.v4()

                                database.run('INSERT INTO resets (resetToken, resetUserName) VALUES (?, ?)',
                                    [
                                        resetToken,
                                        request.body.userName
                                    ]).then(() => {

                                        sendResetPassword(users[0].userMail, resetToken, response)
                                    })
                            }

                            setTimeout(() => {
                                database.run('DELETE FROM resets WHERE resetUserName=?', [users[0].userName])
                            }, (60 * 60 * 1000))
                        })
                }
            })
    })

    app.patch('/resetpassword/:token', (request, response) => {

        database.all('SELECT * FROM resets WHERE resetToken=?', [request.params.token])
            .then((resets) => {

                console.log(request.params.token)

                if (!resets[0]) {
                    response.send(JSON.stringify({ message: 'Unauthorized', status: 2 }))
                } else {

                    const saltRounds = 10

                    bcrypt.hash(request.body.userPassword, saltRounds, function (err, hash) {

                        database.run('UPDATE users SET userPassword=? WHERE userName=?',
                            [
                                hash,
                                resets[0].resetUserName
                            ]).then(() => {

                                database.run('DELETE FROM resets WHERE resetToken=?', [resets[0].resetToken])
                                    .then(() => {
                                        response.send(JSON.stringify({ message: 'Password updated', status: 1 }))
                                    })
                            })
                    })
                }
            })
    })

    app.get('/reset/:token', (request, response) => {
        database.all('SELECT * FROM resets WHERE resetToken=?', [request.params.token])
            .then((resets) => {
                if (resets[0]) {
                    response.send(JSON.stringify({ message: 'Reset is authorized', status: 1}))
                } else {
                    response.send(JSON.stringify({ message: 'Reset not found', status: 2}))
                }
            })
    })

    // Only for testing
    app.get('/sessions', (request, response) => {
        database.all('SELECT * FROM sessions')
            .then((sessions) => {
                response.send(sessions)
            })
    })

    app.get('/users', (request, response) => {

        database.all('SELECT * FROM users')
            .then((users) => {

                for (let i = 0; i < users.length; i++) {
                    users[i].userEvents = JSON.parse(users[i].userEvents)
                }

                response.send(users)
            })
    })

    app.get('/resets', (request, response) => {
        database.all('SELECT * FROM resets')
            .then((resets) => {
                response.send(resets)
            })
    })
}