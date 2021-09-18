export const state = () => ({
  snackbar: {
    show: false,
    type: '',
    text: ''
  },
  drawer: false // initialized as null because vuetify takes null to default it to closed on mobile and open on desktop
})

export const getters = {
  snackbar: state => state.snackbar,
  drawer: state => state.drawer
}

export const mutations = {
  SNACKBAR: (state, payload) => (state.snackbar = payload),
  TOGGLE_DRAWER: state => (state.drawer = !state.drawer)
}
