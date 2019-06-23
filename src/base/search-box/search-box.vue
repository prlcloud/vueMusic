<template>
  <div class="search-box">
    <!-- <i class="icon-search"></i> -->
    <input :placeholder="placeholder" v-model="query" type="text" class="box">
    <i v-show="query" class="icon-delete" @click="clear"></i>
    <!-- <span class="search" >{{clickInfo}}</span> -->
  </div>
</template>

<script>
import {debounce} from 'common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲/歌手'
    }
  },
  data () {
    return {
      query: '',
      clickInfo: '搜索'
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box {
    // position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 25px;
    border: 1px solid;
    border-radius: 5px;
    .icon-search {
      font-size: 24px;
      color: $color-text;
    }
    .box {
      flex: 1;
      line-height: 25px;
      background: $color-theme;
      color: $color-background;
      font-size: $font-size-medium;
      border: none;
      outline: medium;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .icon-delete {
      position: absolute;
      right: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
      border: none;
    }
    .search {
      padding: 0 5px;
      font-size: 14px;
      color: $color-text;
    }
  }
</style>
