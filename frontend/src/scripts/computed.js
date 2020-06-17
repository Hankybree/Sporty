export const computed = {
    eventIndex: {
        get() {
            return this.$store.state.eventIndex
        },
        set(newIndex) {
            this.$store.commit('setEventIndex', newIndex)
        }
    }
}