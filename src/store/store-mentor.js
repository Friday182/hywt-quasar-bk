
const state = {
  mentor: {
    id: '',
    name: '',
    mentorEmail: '',
    contacts: [],
    students: []
  }
}

const mutations = {
  setMentor (state, payload) {
    Object.assign(state.mentor, payload)
  },
  mentorAddStudent (state, payload) {
    state.mentor.students.push(payload)
  },
  mentorDelStudent (state, id) {
    for (let i = 0; i < state.mentor.students.length; i++) {
      if (state.mentor.students[i].id === id) {
        state.mentor.students.splice(i, 1)
      }
    }
  }
}

const actions = {
}

const getters = {
  currentMentor: (state) => {
    return state.mentor
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
