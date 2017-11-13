<template>
  <div id="app">
    <myheader></myheader>
    <tabs></tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="player-wrapper">
      <player></player>
    </div>
  </div>
</template>

<script>
import myheader from 'components/header/header'
import tabs from 'components/tabs/tabs'
import player from 'components/player/player'
export default {
  name: 'app',
  components:{
    myheader,
    tabs,
    player
  },
  mounted(){

  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/variable.styl'
#app
  color $color-theme 
 

</style>
