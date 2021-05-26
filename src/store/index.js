import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuex)
Vue.use(VueLocalStorage)

export default new Vuex.Store({
  state: {
    data: null
  },
  mutations: {
    getData (state, items) {
      state.data = items
    }

  },
  actions: {
    getData ({ commit }) {
      try {
        const items = JSON.parse(Vue.localStorage.get('items'))
        commit('getData', items)
      } catch (e) {
        console.log(e)
      }
    },
    setDataToLS () {
      const items = [
        {
          id: '532405ueigjasep6456ew4564ee4756',
          details: {
            title: 'Some Title',
            options: {
              option1: 'Option One',
              option2: 'Option Two',
              option3: 'Option Three'
            },
            aColon: 10,
            bColon: 'Enter any string:)',
            description: 'Enter your awesome description!'
          }
        },
        {
          id: '532405ueigjasep6456ew4564ee47fsfsfesrtw3534r56',
          details: {
            title: 'Some Title 1',
            options: {
              option1: 'Option One 1',
              option2: 'Option Two 1',
              option3: 'Option Three 1'
            },
            aColon: 20,
            bColon: 'Enter any string:)',
            description: 'Enter your awesome description!'
          }
        }]

      if (!localStorage.getItem('items')) {
        Vue.localStorage.set('items', JSON.stringify(items))
      }
    },
    saveChanges (newState) {
      Vue.localStorage.set('items', JSON.stringify(newState.state.data))
    }
  }
})
