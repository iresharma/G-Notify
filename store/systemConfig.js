export const state = () => ({
  snackbar: {
    show: false,
    type: '',
    text: ''
  }
})

export const getters = {
  snackbar: state => state.snackbar
}

export const mutations = {
  SNACKBAR: (state, payload) => (state.snackbar = payload)
}
