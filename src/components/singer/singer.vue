<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  /* const pinyin = require('pinyin')
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门' */

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      // 接收点击的元素，跳转路由
      selectSinger(item) {
        this.$router.push({
          path: `/singer/${item.id}`
        })
        this.setSinger(item)
      },
      // 获取歌手数据
      _getSingerList() {
        getSingerList().then((res) => {
          const data = JSON.parse(res)
          console.log('data', data)
          let s = data.artists
          /* s.map((item) => {
            let py = pinyin(item.name[0], {
              style: pinyin.STYLE_FIRST_LETTER
            })
            item.initial = py[0][0].toUpperCase()
          }) */
          console.log('s', s)
          this.singers = data.artists
          console.log('this.singer', this.singers)
        })
      },
      // 规范化歌手数据
      _normalizeSinger(list) {
        let map = {
          hot: {
            // title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
            // 由constructor构造器Singer对象，直接引用singer.js
          console.log('item歌手', item)
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(' / ')
          }))
          // }
          // 给list做聚类
          const key = item.initial
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias[0]
          }))
        })
        let ret = []
        let hot = []
        /* // 为了得到有序列表，我们需要处理 map
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        } */
        /* // 字母排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        }) */
        return hot.concat(ret)
      },
      // 做映射,用this.setSinger(singer)会实现mutation的提交
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
