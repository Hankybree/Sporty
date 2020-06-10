module.exports = function(app, database) {
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
        database.run('INSERT INTO events (eventSport, eventTitle, eventDescription, eventGoers, eventUser) VALUES (?, ?, ?, ?, ?)', 
        [
            request.body.eventSport,
            request.body.eventTitle,
            request.body.eventDescription,
            JSON.stringify(request.body.eventGoers),
            request.body.eventUser
        ]).then(() => {
            response.status(201).send(request.body)
        }).catch(error => {
            response.send(error)
        })
    })
    
    app.patch('/events/:event', (request, response) => {
        database.all('SELECT * FROM events WHERE eventId=?', [request.params.event])
            .then((events) => {
    
                events[0].eventGoers = JSON.parse(events[0].eventGoers)
                
                let updatedEvent = Object.assign(events[0], request.body)
    
                database.run('UPDATE events SET eventSport=?, eventTitle=?, eventDescription=?, eventGoers=? WHERE eventId=?',
                [
                    updatedEvent.eventSport,
                    updatedEvent.eventTitle,
                    updatedEvent.eventDescription,
                    JSON.stringify(updatedEvent.eventGoers),
                    request.params.event
                ]).then(() => {
                    response.send(updatedEvent)
                })
            })
    })
    
    app.delete('/events/:event', (request, response) => {
        database.run('DELETE FROM events WHERE eventId=?', [request.params.event])
            .then(() => {
                response.send('Event deleted')
            })
    })
}