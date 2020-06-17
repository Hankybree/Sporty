export const actions = {

    getEvents(context) {
        fetch('http://localhost:3500/events')
            .then(response => response.json())
            .then(result => {
                context.commit('setEvents', result)
            })
    },
    postEvent(context) {
        fetch('http://localhost:3500/events', {
            body: JSON.stringify({
                eventSport: document.querySelector('#post-sport').value,
                eventTitle: document.querySelector('#post-title').value,
                eventDescription: document.querySelector('#post-description').value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Token': localStorage.getItem('token')
            },
            method: 'POST'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                context.commit('setPostUI', false)
                context.dispatch('getEvents')
            })
    },
    patchEvent(context) {
        fetch('http://localhost:3500/events/' + context.state.events[context.state.eventIndex].eventId, {
            body: JSON.stringify({
                eventSport: document.querySelector('#patch-sport').value,
                eventTitle: document.querySelector('#patch-title').value,
                eventDescription: document.querySelector('#patch-description').value,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Token': localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                context.commit('setPatchUI', false)
                context.dispatch('getEvents')
            })
    },
    deleteEvent(context) {
        fetch('http://localhost:3500/events/' + context.state.events[context.state.eventIndex].eventId, {
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                context.dispatch('getEvents')
            })
    },
    attendEvent(context) {

        let attendees = context.state.events[context.state.eventIndex].eventGoers
        attendees.push(context.state.userName)

        fetch('http://localhost:3500/attend/' + context.state.events[context.state.eventIndex].eventId, {
            body: JSON.stringify({
                eventGoers: attendees
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                context.dispatch('getEvents')
            })
    },
    unAttendEvent(context) {

    },
    openPostUI(context) {
        if (!context.state.showPostUI) {
            context.commit('setPostUI', true)
        } else {
            context.commit('setPostUI', false)
        }
    },
    openPatchUI(context) {
        if (!context.state.showPatchUI) {
            context.commit('setPatchUI', true)
        } else {
            context.commit('setPatchUI', false)
        }
    },
    getSession(context) {
        fetch('http://localhost:3500/session', {
            headers: {
                'Token': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(result => {
                context.commit('setActiveUser', result.userId)
                context.commit('setUserName', result.userName)
                context.commit('setLoggedIn', true)
            })
    },
    signup() {
        if (document.querySelector('#signup-password').value === document.querySelector('#confirm-password').value) {
            fetch('http://localhost:3500/signup', {
                body: JSON.stringify({
                    userName: document.querySelector('#signup-name').value,
                    userPassword: document.querySelector('#signup-password').value,
                    userMail: document.querySelector('#signup-mail').value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(response => response.json())
                .then(result => {
                    if (result.status === 1) {
                        window.location.replace('/')
                    } else {
                        alert(result.message)
                    }
                })
        } else {
            alert('Password confirmation failed')
        }
    },
    login(context) {
        fetch('http://localhost:3500/login', {
            body: JSON.stringify({
                userName: document.querySelector('#login-name').value,
                userPassword: document.querySelector('#login-password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    localStorage.setItem('token', result.token)
                    context.commit('setActiveUser', result.userId)
                    context.commit('setUserName', result.userName)
                    context.commit('setLoggedIn', true)
                } else {
                    alert(result.message)
                }
            })
    },
    logout(context) {
        fetch('http://localhost:3500/logout', {
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                localStorage.removeItem('token')
                context.commit('setActiveUser', -1)
                context.commit('setLoggedIn', false)
                window.location.replace('/')
                alert(result.message)
            })
    },
    deleteAccount(context) {
        fetch('http://localhost:3500/users', {
            headers: {
                'Token': localStorage.getItem('token')
            },
            method: 'DELETE'
        }).then(response => response.json())
        .then(result => {
            localStorage.removeItem('token')
            context.commit('setActiveUser', -1)
            context.commit('setLoggedIn', false)
            window.location.replace('/')
            alert(result.message)
        })
    }
}