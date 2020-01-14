// import Vue from 'vue'

const state = {
  student: {
    id: 0,
    mentorId: 0,
    name: '',
    age: 0,
    city: '',
    country: '',
    school: '',
    stickers: 0,
    stars: 0,
    membershipActive: false,
    membershipDate: '',
    expireDate: '',
    lastLoginDate: '',
    levels: '',
    assignment: [],
    stickerLog: [],
    contacts: [],
    aiEnabled: false
  }
}

const mutations = {
  setStudent (state, payload) {
    Object.assign(state.student, payload)
  },
  setAssignmentDone (state, payload) {
    for (let i = 0; i < state.student.assignment.length; i++) {
      if (state.student.assignment[i]['k_task'] === payload) {
        state.student.assignment[i]['k_done'] = true
      }
    }
  }
}

const actions = {
  updateStudent ({ commit }, payload) {
    commit('setStudent', payload)
  },
  updateAssignmentDone ({ commit }, payload) {
    commit('setAssignmentDone', payload)
  }
}

const getters = {
  currentStudent: (state) => {
    return state.student
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
