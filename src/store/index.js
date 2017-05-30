import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo.store.js'
// import panel from './panel.store.js'
Vue.use(Vuex)

const state = {
  panelShow:0,
  editTitle:null,
  id:null,
}
const mutations = {
  'panelshow':function(state,target){
    state.panelShow = 1
    if(target && target.title){
      state.editTitle = target.title,
      state.id = target.id
    }
  },
  'panelhide': function(state){
    state.panelShow = 0,
    state.editTitle = null,
    state.id = null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    todo
  }
})
