export const actions = {

    getEvents(context) {
        fetch('http://localhost:3500/events')
            .then(response => response.json())
            .then(result => {
                context.commit('setEvents', result)
            })
    },
    postEvent(context) {
        console.log('Called')
        fetch('http://localhost:3500/events', {
            body: JSON.stringify({
                eventSport: document.querySelector('#post-sport').value,
                eventTitle: document.querySelector('#post-title').value,
                eventDescription: document.querySelector('#post-description').value,
                eventDate: document.querySelector('#post-date').value + ' ' + document.querySelector('#post-time').value,
                eventLocation: document.querySelector('#post-location').value,
                eventPrice: parseFloat(document.querySelector('#post-price').value),
                eventMaxAttend: parseInt(document.querySelector('#post-max').value)
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
                eventDate: document.querySelector('#patch-date').value + ' ' + document.querySelector('#patch-time').value,
                eventLocation: document.querySelector('#patch-location').value,
                eventPrice: parseFloat(document.querySelector('#patch-price').value),
                eventMaxAttend: parseInt(document.querySelector('#patch-max').value)
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

        let attendeeExist

        if (!context.state.events[context.state.eventIndex].eventGoers.includes(context.state.userName, 0)) {
            attendeeExist = false
        } else {
            attendeeExist = true
        }

        fetch('http://localhost:3500/attend/' + context.state.events[context.state.eventIndex].eventId, {
            body: JSON.stringify({
                attendeeExist: attendeeExist
            }),
            headers: {
                'Content-Type': 'application/json',
                'Token': localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                context.dispatch('getEvents')
            })
    },
    comment(context, addComment) {

        fetch('http://localhost:3500/comment/' + context.state.events[context.state.eventIndex].eventId, {
            body: JSON.stringify({
                addComment: addComment,
                message: document.querySelector('#commentary-input').value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Token': localStorage.getItem('token')
            },
            method: 'PATCH'
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                document.querySelector('#commentary-input').value = ''
                context.dispatch('getEvents')
            })
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
                    console.log(result)
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
    },
    sendMail() {

        const subject = document.querySelector('#contact-subject')
        const mail = document.querySelector('#contact-mail')
        const message = document.querySelector('#contact-message')

        if (subject.checkValidity() && mail.checkValidity() && message.checkValidity()) {
            fetch('http://localhost:3500/contact', {
                body: JSON.stringify({
                    subject: subject.value,
                    mail: mail.value,
                    message: message.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(response => response.json())
                .then(result => {

                    document.querySelector('#contact-subject').value = ''
                    document.querySelector('#contact-mail').value = ''
                    document.querySelector('#contact-message').value = ''

                    alert(result.message)
                })
        } else {
            alert('Fill in all fields')
        }
    },
    validateReset(context) {
        let url = window.location.href
        const firstIndexOfToken = url.lastIndexOf('/') + 1

        this.resetToken = url.substr(firstIndexOfToken, 36)

        fetch('http://localhost:3500/reset/' + this.resetToken)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    context.commit('setCanReset', true)
                } else {
                    context.commit('setCanReset', false)
                }
            })
    }
}