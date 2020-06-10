module.exports = function (app, database, accessToken) {

    app.get('/users', (request, response) => {

        database.all('SELECT * FROM users')
            .then((users) => {

                for (let i = 0; i < users.length; i++) {
                    users[i].userEvents = JSON.parse(users[i].userEvents)
                }

                response.send(users)
            })
    })

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
                            JSON.stringify([])
                        ]).then(() => {

                            response.status(201).send('Created')
                        }).catch((error) => {

                            response.send(error)
                        })
                } else {
                    response.send('Username is already in use')
                }
            })
    })

    app.post('/login', (request, response) => {

        database.all('SELECT * FROM users WHERE userName=?', [request.body.userName])
            .then((users) => {

                if (users[0] === undefined) {
                    response.send('Incorrect username or password')
                    return
                }

                if (users[0].userPassword === request.body.userPassword) {
                    // Skapa token och gör POST till session
                    database.all('SELECT * FROM sessions WHERE sessionUserId=?', [users[0].userId])
                        .then((sessions) => {
                            if (sessions[0] === undefined) {
                                database.run('INSERT INTO sessions (sessionUserId, sessionToken) VALUES (?, ?)',
                                    [
                                        users[0].userId,
                                        accessToken.v4()
                                    ]).then(() => {
                                        response.send('Logged in')
                                    })
                            } else {
                                response.send('Already logged in')
                            }
                        })
                } else {
                    response.send('Incorrect username or password')
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
}