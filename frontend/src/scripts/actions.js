export const actions = {

    getEvents(context) {
        fetch('http://116.203.125.0:3500/events')
            .then(response => response.json())
            .then(result => {
                context.commit('setEvents', result)
            })
    },
    postEvent(context) {
        fetch('http://116.203.125.0:3500/events', {
            body: JSON.stringify({
                eventSport: document.querySelector('#post-sport').value,
                eventTitle: document.querySelector('#post-title').value,
                eventDescription: document.querySelector('#post-description').value,
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
    patchEvent(context) {
        fetch('http://116.203.125.0:3500/events/' + context.state.events[context.state.eventIndex].eventId, {
            body: JSON.stringify({
                eventSport: document.querySelector('#patch-sport').value,
                eventTitle: document.querySelector('#patch-title').value,
                eventDescription: document.querySelector('#patch-description').value,
            }),
            headers: {
                'Content-Type': 'application/json'
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
        fetch('http://116.203.125.0:3500/events/' + context.state.events[context.state.eventIndex].eventId, {
            method: 'DELETE'
        }).then(response => response)
        .then(result => {
            console.log(result)
            context.dispatch('getEvents')
        })
    },
    openPostUI(context) {
        if(!context.state.showPostUI) {
            context.commit('setPostUI', true)
        } else {
            context.commit('setPostUI', false)
        }
    },
    openPatchUI(context) {
        if(!context.state.showPatchUI) {
            context.commit('setPatchUI', true)
        } else {
            context.commit('setPatchUI', false)
        }
    }
}