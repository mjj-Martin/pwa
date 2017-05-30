<template>
  <div class="view view-index" @touchmove.prevent>
    <div class="list">
    <transition-group name="flip-list" tag="div">
      <list-item
        v-for='(item,$index) in todoList'
        :list-item='item'
        :key = 'item.id'
      ></list-item>
    </transition-group>
    </div>
    <input-panel ref='inputPanel'></input-panel>
    <div class="add-btn" @click='panelshow'>
      &#xe6ad;
    </div>
  </div>

</template>
<script>
  import listItem from '../components/list-item.vue'
  import inputPanel from '../components/input-panel.vue'
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    components:{
      listItem,
      inputPanel
    },
    async created(){
      await this.getTodos()
    },
    methods:{
      callPanel(){
        this.$refs.inputPanel.showPanel()
      },
      ...mapMutations([
        'panelshow'
      ]),
      ...mapActions([
        'getTodos'
      ])
    },
    computed:{
      ...mapGetters([
        'todoList'
      ])
    }
  }
</script>
<style lang='scss'>
  @import '../assets/icon.scss';
  .view-index{
    position: relative;
    overflow: hidden;
    min-height: 100%;
  }
  .list{
    overflow: hidden;
    margin-top: 0.666667rem;
  }
  .add-btn{
    @extend .iconfont;
    font-size: 0.933333rem;
    position:fixed;
    z-index: 4;
    bottom: 1.066667rem;
    right: 1.066667rem;
  }
  .flip-list-move {
    transition: transform 1s;
  }
</style>
