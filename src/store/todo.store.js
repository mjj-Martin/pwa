
var todoStorage = {
  todos:[],
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem('todo') || '[]')

    // 对数组进行排序，按 computed id
    let competedItem = []
    let notComputedItem = []
    todos.forEach((item) => {
      item.competed? competedItem.push(item) : notComputedItem.push(item)
    })

    let sortFun = function(a,b){
      return  b.id -a.id
    }
    competedItem.sort(sortFun)
    notComputedItem.sort(sortFun)
    this.todos = [
      ...notComputedItem,
      ...competedItem,
    ]
    return this.todos
  },
  add: function(title){
    let todos = [...this.todos]
    todos.push({
      title:title,
      doneTime:null,
      competed:false,
      id:new Date().getTime()
    })
    localStorage.setItem('todo',JSON.stringify(todos))
  },
  remove: function(id){
    let todos = [...this.todos]
    let result = todos.filter((item) => {
      return item.id !== id
    })
    localStorage.setItem('todo',JSON.stringify(result))
  },
  edit:function(id,title){
    let todos = [...this.todos]
    let result = todos.map((item) => {
      if(item.id == id){
        item.title = title
      }
      return item
    })
    localStorage.setItem('todo',JSON.stringify(result))
  },
  setType:function(id,type){
    let todos = [...this.todos]
    let result = todos.map((item) => {
      if(item.id == id){
        if(type){
          item.doneTime = new Date().getTime()
        }else{
          item.doneTime = null
        }
        item.competed = type
      }
      return item
    })
    localStorage.setItem('todo',JSON.stringify(result))
  }
}

const state = {
  todos:[],
}
const getters = {
  todoList: state => state.todos
}
const actions = {
  getTodos({commit,state},title){
    return new Promise((resolve,reject) => {
      let newtodos = todoStorage.fetch()
      commit('updateTodos', newtodos)
      resolve()
    })
  },
  addTodo({commit,state },title){
    return new Promise((resolve,reject) => {
      todoStorage.add(title)
      let newtodos = todoStorage.fetch()
      commit('updateTodos', newtodos)
      resolve()
    })
  },
  editTodo({commit,state},{id,title}){
    return new Promise((resolve,reject) => {
      todoStorage.edit(id,title)
      let newtodos = todoStorage.fetch()
      commit('updateTodos', newtodos)
      resolve()
    })
  },
  removeTodo({commit,state },id){
    return new Promise((resolve,reject) => {
      todoStorage.remove(id)
      let newtodos = todoStorage.fetch()
      commit('updateTodos', newtodos)
      resolve()
    })
  },
  setCompetedTodo({commit,state },item){
    return new Promise((resolve,reject) => {
      todoStorage.setType(item.id,!item.competed)
      let newtodos = todoStorage.fetch()
      commit('updateTodos', newtodos)
      resolve()
    })
  },
  cleanCompetedTodo(){

  }
}

const mutations = {
  updateTodos(state, newtodos){
    state.todos = newtodos
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
