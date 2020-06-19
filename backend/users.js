module.exports = function (app, database, accessToken, authenticate) {

    app.post('/signup', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (users[0] === undefined) {

                    database.run('INSERT INTO users (userName, userPassword, userMail, userDescription, userEvents) VALUES (?, ?, ?, ?, ?)',
                        [
                            request.body.userName,
                            request.body.userPassword,
                            request.body.userMail,
                            '',
                            '[]'
                        ]).then(() => {

                            response.status(201).send(JSON.stringify({ message: 'User created', status: 1 }))
                        }).catch((error) => {

                            response.send(error)
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

                if (users[0].userPassword === request.body.userPassword) {

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
}