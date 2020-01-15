/*
This store save the current information
*/
const state = {
  currentInfo: {
    userName: '',
    userRole: '',
    tabs: [{
      name: '1-1',
      title: 'defaultTitle'
    }],
    activeTab: '1-1'
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
        state.currentInfo.activeTab = payload.name
        exist = true
      }
    })
    if (exist === false) {
      state.currentInfo.tabs.push(payload)
    }
  },

  removeTab (state, payload) {
    console.log('removetab - ', payload.name)
    for (let i = 0; i < state.currentInfo.tabs.length; i++) {
      if (state.currentInfo.tabs[i].name === payload.name) {
        state.currentInfo.tabs.splice(i, 1)
        console.log('new tabs', JSON.stringify(state.currentInfo.tabs))
        if (i > 0) {
          state.currentInfo.activeTab = state.currentInfo.tabs[i - 1].name
        }
      }
    }
  }
}

const actions = {
  updateInfo ({ commit }, payload) {
    commit('updateInfo', payload)
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
