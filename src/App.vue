<template>
  <div id="app" class="view_container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/icon.scss';
@import './assets/reset.scss';
html,body{
  height: 100%;
}
.view_container{
  position: relative;
  height: 100%;
  overflow-y: scroll;
  font-size: 0.48rem;
}
</style>
