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
  SET_USER (state, payload, field = null) {
    if (field) {
      state.user[field] = payload
    } else {
      state.user = payload
    }
    localStorage.setItem('user', JSON.stringify(payload))
  },
  LOAD_USER (state) {
    if (localStorage.getItem('user')) {
      console.log('user loaded')
      state.user = JSON.parse(localStorage.getItem('user'))
    }
  }
}
