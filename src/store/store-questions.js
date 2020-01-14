
const getDefaultState = () => {
  return {
    questions: [{
      task: '',
      standardSec: 0,
      answerType: '',
      questionType: '',
      questionText: '',
      chartType: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answerText: '',
      helper: '',
      img1: '',
      img2: '',
      tag1: '',
      tag2: '',
      tip: ''
    }]
  }
}

const state = getDefaultState()

const mutations = {
  setAllQuestions (state, payload) {
    // state.questions = payload
    state.questions = Object.assign([], payload)
  },
  resetState (state) {
    state = {
      questions: [{
        task: '',
        standardSec: 0,
        answerType: '',
        questionType: '',
        questionText: '',
        chartType: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answerText: '',
        helper: '',
        img1: '',
        img2: '',
        tag1: '',
        tag2: '',
        tip: ''
      }]
    }
  }
}

const actions = {
  setQuestions ({ commit }, payload) {
    commit('setAllQuestions', payload)
  },
  clearQuestions ({ commit }) {
    commit('resetState')
  }
}

const getters = {
  getQuestions: (state) => {
    return state.questions
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
