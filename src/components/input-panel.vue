<template>
  <transition name="fade">
    <div class="input_panel_wrap" v-if='panelShow' @click='clickMask'>
      <div class="input_panel_main">
        <form action='' class="input_panel--input" @submit.prevent='submit' @touchstart='focus'>
            <input class='input' id="submit" type="text" placeholder="我想..."
              v-model='content'
            >
        </form>
        <span class="input_panel--clean" @click='clean'>&#xe642;</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  mounted(){
    this.content = this.editTitle
    this.itemId = this.id
  },
  watch:{
    panelShow(){
      this.content = this.editTitle
      this.itemId = this.id
    }
  },
  data(){
    return{
      content:null,
      itemId:null
    }
  },
  methods:{
    async submit(){
      if(this.itemId){
        await this.editTodo({
          id:this.itemId,
          title:this.content
        })
      }else {
        await this.addTodo(this.content)
      }
      this.hide()
      return false
    },
    focus(){
      let dom = this.$el.querySelector('.input')
      dom.focus()
    },
    clean(){
      this.content = null
    },
    clickMask(event){
      if(event.target.className.indexOf('input_panel_wrap') > -1){
        this.hide()
      }
    },
    hide(){
      this.content = null
      this.itemId = null
      this.panelhide()
    },
    ...mapActions([
      'addTodo',
      'editTodo'
    ]),
    ...mapMutations([
      'panelhide',
    ])
  },
  computed:{
    ...mapState([
      'panelShow',
      'editTitle',
      'id'
    ])
  }
}
</script>
<style lang='scss'>
  @import '../assets/icon.scss';
  .input_panel_wrap{
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
  }
  .input_panel_main{
    margin: 0.666667rem 0.866667rem 0;
    padding-bottom: 0.133333rem;
    position: relative;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
  }
  .input_panel--input{
    display: block;
    flex: 1;
    margin-right:0.4rem;
    font-size: 0.533333rem;
    >input{
      width: 100%;
      border: none;
      display: block;
      outline: none;
    }
  }
  .input_panel--clean{
    display: block;
    text-align: center;
    color: #999;
    font-size: 0.4rem;
    width: 0.666667rem;
    line-height: 0.666667rem;
    @extend .iconfont;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
