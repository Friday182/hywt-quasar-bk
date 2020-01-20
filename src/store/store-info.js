/*
This store save the current information
*/
const state = {
  currentInfo: {
    userName: '',
    userRole: '',
    tabs: [{
      name: '1-1',
      title: '访客信息'
    }],
    activeTab: '1-1',
    wsOk: false
  }
}

const mutations = {
  updateInfo (state, payload) {
    Object.assign(state.currentInfo, payload)
  },

  addTab (state, payload) {
    let exist = false
    state.currentInfo.tabs.forEach((tab, index) => {
      if (tab.name === payload.name) {
        // tab already in the list
        exist = true
      }
    })
    if (exist === false) {
      state.currentInfo.tabs.push(payload)
    }
    state.currentInfo.activeTab = payload.name
  },

  doRemoveTab (state, payload) {
    console.log('removetab - ', payload.name)
    for (let i = 0; i < state.currentInfo.tabs.length; i++) {
      if (state.currentInfo.tabs[i].name === payload.name) {
        state.currentInfo.tabs.splice(i, 1)
        console.log('new tabs', JSON.stringify(state.currentInfo.tabs))
        if (i > 0) {
          state.currentInfo.activeTab = state.currentInfo.tabs[i - 1].name
        } else {
          if (state.currentInfo.tabs.length > 0) {
            state.currentInfo.activeTab = state.currentInfo.tabs[0].name
          }
        }
      }
    }
  },

  setUserRole (state, payload) {
    state.currentInfo.userRole = payload
  },

  setActiveTab (state, payload) {
    state.currentInfo.activeTab = payload
  }
}

const actions = {
  updateInfo ({ commit }, payload) {
    commit('updateInfo', payload)
  },
  removeTab ({ commit }, payload) {
    commit('doRemoveTab', payload)
  }
}

const getters = {
  currentInfo: (state) => {
    return state.currentInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
