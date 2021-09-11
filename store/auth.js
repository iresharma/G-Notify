export const state = () => ({
  user: {
    name: null,
    photoUrl: null
  }
})

//* Getters
export const getters = {
  isLogged: state => Boolean(state.user.name),
  user: state => state.user
}

//* mutations
export const mutations = {
  setUser (state, payload, field = null) {
    if (field) {
      state.user[field] = payload
    } else {
      state.user = payload
    }
    localStorage.setItem('user', JSON.stringify('user'))
  },
  loadUser (state) {
    if (localStorage.getItem('user')) {
      state.user = JSON.parse(localStorage.getItem('user'))
    }
  }
}
