/*
This store save the current user information
We use sessionLogin to switch between mentor store and student store
*/
const state = {
  currentUser: {
    id: 0,
    name: '',
    contacts: [],
    mentorEmail: '',
    sessionLogin: '' // 'mentor' or 'student'
  }
}

const mutations = {
  updateUser (state, payload) {
    Object.assign(state.currentUser, payload)
  }
}

const actions = {
  updateUser ({ commit }, payload) {
    commit('updateUser', payload)
  }
}

const getters = {
  currentUser: (state) => {
    return state.currentUser
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
