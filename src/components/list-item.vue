<template>
  <div class="list_item"
    :style = "{
      'transform': 'translateX(' + pxtorem(translate) + ')'
    }"
    :class = "{
      'computed': listItem.competed,
      'isdelete': isdelete
    }"
  >
    <div class="list_item_infowrap">
      <div class="list_item_info">
        <p class="list_item_content">{{listItem.title}}</p>
        <p class="list_item_time" v-if='listItem.doneTime'>{{listItem.doneTime | timeformmat}}</p>
      </div>
    </div>
    <div class="list_item_btn">
      <span class="list_item_btn--eidt" @click='editItem'>&#xe648;</span>
      <span class="list_item_btn--delete" @click='deleteItem'>&#xe62c;</span>
    </div>
  </div>
</template>
<script>
import {
  pxtorem
} from '../util/index.js'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
export default{
  props:['listItem'],
  data(){
    return{
      isdelete:false,

      translate:0,
      max_n:160,
      mid_n:80,

      start_x:0,
      start_translate:null,
      distance:0,
      animated:false
    }
  },
  watch:{
    listItem:function(){
      this.translate = 0
    }
  },
  mounted(){
    let $el = this.$el
    $el.addEventListener('touchstart',this.touchstart)
    $el.addEventListener('touchmove',this.move)
    $el.addEventListener('touchend',this.touchend)
  },
  methods:{
    touchstart(event){
      this.animated = false
      this.start_x = event.touches[0].clientX
      this.start_translate = this.translate
    },
    touchend(){
      if(this.distance > 50 && this.start_translate === 0){
        this.setCompetedTodo(this.listItem)
      }
    },
    move(event){
      let that = this
      let cur_x = event.touches[0].clientX
      that.distance = cur_x - that.start_x
      if(that.distance > 20){
        // 向右划
        if(this.translate < 0){
          this.translate = 0
        }
      }else if(that.distance < -20){
        if(this.translate  ===  0){
          this.translate = -160
        }
      }
      let translate_distance = that.distance + that.translate
      if(translate_distance < -80){
        that.translate = -160
      }else if(translate_distance >= -80){
        that.translate = 0
      }
    },
    deleteItem(){
      this.isdelete = true
      setTimeout(() => {
        this.removeTodo(this.listItem.id)
      }, 300);
    },
    editItem(){
      this.panelshow({
        id:this.listItem.id,
        title:this.listItem.title
      })
    },
    ...mapActions([
      'removeTodo',
      'setCompetedTodo'
    ]),
    ...mapMutations([
      'panelshow'
    ]),
    pxtorem
  }
}
</script>
<style lang='scss'>
@import '../assets/icon.scss';
.list_item{
  position: relative;
  padding-bottom: 0.853333rem;
  white-space: nowrap;
  transition-duration:.3s;
  transition-timing-function:ease;
  transition-property: all;
}
.isdelete{
  transform: translate(-4.0rem ,0)!important;
  transition-duration:.3s;
  opacity: 0
}
.computed{
  position: relative;
  .list_item_info{
    color: #999;
  }
  .list_item_content{
    text-decoration: line-through;
  }
  .list_item_time{
    position: absolute;
    line-height: 1
  }
}
.animated{
  transition-duration:.4s;
}
.list_item_infowrap{
  white-space:normal;
  display: inline-block;
  width: 100%;
}
.list_item_info{
  margin: 0 0.853333rem;
  transition:all .3s ease;
}
.list_item_btn{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.866667rem;
  display: inline-block;
}
.list_item_content{

}
.list_item_time{
  font-size: 0.32rem;
  line-height: 2.5;
}
.list_item_btn{
  span{
    font-size: 0.48rem;
    display:inline-block;
    width: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    @extend .iconfont;
  }
  &--eidt{

  }
  &--delete{

  }
}
/*.list_item_btn--eidt{

}
.list_item_btn--delete{

}*/
</style>
