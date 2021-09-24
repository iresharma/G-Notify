export const state = () => ({
  user: {
    name: null,
    photoUrl: null,
    _id: null
  }
})

//* Getters
export const getters = {
  isLogged: state => Boolean(state.user.email),
  user: state => state.user
}

//* mutations
export const mutations = {
  SET_USER (state, payload, field = null) {
    if (field) {
      state.user[field] = payload
    } else {
      state.user = payload.user
      if (!payload.user.name) { state.user.name = payload.user.email.split('@')[0] }
    }
    localStorage.setItem('user', JSON.stringify(payload))
  },
  LOAD_USER (state) {
    if (localStorage.getItem('user')) {
      state.user = JSON.parse(localStorage.getItem('user')).user
    }
  }
}
