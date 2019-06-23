<template>
      <div class="m-header">
        <router-link tag="div" class="login" to="/login">
          <i class="icon-music"></i>
        </router-link>
        <h1 class="text">Sunshine音乐</h1>
        <router-link tag="div" class="mine" to="/user">
          <i class="icon-mine"></i>
        </router-link>
      </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    background-color: $color-background
    .login
      position: absolute
      top: 0
      left: 0
      .icon-music
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
    .text
      display: inline-block
      vertical-align: top
      line-height: $font-size-large
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
