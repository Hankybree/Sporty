export const computed = {
    eventIndex: {
        get() {
            return this.$store.state.eventIndex
        },
        set(newIndex) {
            this.state.commit('setEventIndex', newIndex)
        }
    }
}