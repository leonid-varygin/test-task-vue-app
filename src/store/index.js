import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuex)
Vue.use(VueLocalStorage)

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    getData (state, dataItems) {
      state.data = dataItems
    },
    updateTreeChanges (state, changedState) {
      return { ...state.data, changedState }
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
      const items = [{
        id: '532405ueigjasep6456ew4564ee4756',
        details: {
          treeDisplayData: [
            {
              text: 'Root 1',
              nodes: [
                {
                  text: 'Child 1',
                  nodes: [
                    {
                      text: 'Grandchild 1'
                    },
                    {
                      text: 'Grandchild 2'
                    }
                  ]
                },
                {
                  text: 'Child 2'
                }
              ]
            },
            {
              text: 'Root 2'
            }
          ],
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
          treeDisplayData: [
            {
              text: 'Root 3',
              nodes: [
                {
                  text: 'Child 3-1',
                  nodes: [
                    {
                      text: 'Grandchild 3'
                    },
                    {
                      text: 'Grandchild 4'
                    }
                  ]
                },
                {
                  text: 'Child 2'
                }
              ]
            },
            {
              text: 'Root 4'
            }
          ],
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
      }]

      if (!localStorage.getItem('items')) {
        Vue.localStorage.set('items', JSON.stringify(items))
      }
    },
    saveChanges (newState) {
      Vue.localStorage.set('items', JSON.stringify(newState.state.data))
    },
    saveChangesInTree ({ commit }, changedState) {
      commit('updateTreeChanges', changedState)
    }
  }
})
