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
                    
                    database.all('SELECT * FROM sessions WHERE sessionUserId=?', [users[0].userId])
                        .then((sessions) => {
                            if (sessions[0] === undefined) {

                                const token = accessToken.v4()

                                database.run('INSERT INTO sessions (sessionUserId, sessionToken) VALUES (?, ?)',
                                    [
                                        users[0].userId,
                                        token
                                    ]).then(() => {
                                        response.send(token)
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

    app.delete('/logout', (request, response) => {

        if (request.get('Token')) {

            database.run('DELETE FROM sessions WHERE sessionToken=?', [request.get('Token')])
            .then(() => {
                response.send('Logged out')
            })
            
        } else {
            response.send('You are not logged in')
        }
    })

    // Only for testing
    app.get('/sessions', (request, response) => {
        database.all('SELECT * FROM sessions')
            .then((sessions) => {
                response.send(sessions)
            })
    })
}