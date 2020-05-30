export const actions = {

    getEvents(context) {
        fetch('http://localhost:3000/events')
            .then(response => response.json())
            .then(result => {
                context.commit('setEvents', result)
            })
    },
    openPostUI(context) {
        if(!context.state.showPostUI) {
            context.commit('setPostUI', true)
        } else {
            context.commit('setPostUI', false)
        }
    },
    postEvent(context) {
        fetch('http://localhost:3000/events', {
            body: JSON.stringify({
                eventSport: document.querySelector('#e-sport').value,
                eventTitle: document.querySelector('#e-title').value,
                eventDescription: document.querySelector('#e-description').value,
                eventGoers: ["my-username(placeholder)"],
                eventUser: context.state.activeUser
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json())
        .then(result => {
            console.log(result)
            context.commit('setPostUI', false)
            context.dispatch('getEvents')
        })
    },
    deleteEvent(context) {
        fetch('http://localhost:3000/events/' + context.state.events[context.state.eventIndex].eventId, {
            method: 'DELETE'
        }).then(response => response)
        .then(result => {
            console.log(result)
            context.dispatch('getEvents')
        })
    }
}