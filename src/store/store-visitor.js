/*
This store save the current information
*/
const state = {
  visitor: {
    visitorLog: [
      {
        name: '马大帅',
        gender: '男',
        ethnic: '汉',
        id: '12345678912345',
        dob: '20010101',
        block: '高大上小区',
        enter: '进入',
        deviceid: 'device-123',
        datetime: '2020-01-15 16:21:50'
      }
    ]
  }
}

const mutations = {
  addVisitor (state, payload) {
    let valid = true
    // need valid the input
    if (valid === true) {
      state.visitor.visitorLog.push(payload)
    }
  },

  removeVisitor (state, payload) {
    for (let i = 0; i < state.visitor.visitorLog.length; i++) {
      if (state.visitor.visitorLog[i].datetime === payload.datetime &&
        state.visitor.visitorLog[i].deviceid === payload.deviceid) {
        state.visitor.visitorLog.splice(i, 1)
        console.log('Number of visitors - ', state.visitor.visitorLog.length)
      }
    }
  },

  setFilter (state, payload) {
  }
}

const actions = {
}

const getters = {
  visitor: (state) => {
    return state.visitor
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
