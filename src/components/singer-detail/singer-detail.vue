<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSongSinger} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      // 从singer.vue组件中获取singer
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        // 判断，没有获取到id，回退到上一个页面
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          const data = JSON.parse(res)
          if (data.code === ERR_OK) {
            this.songs = this._normalizeSongs(data.hotSongs)
            // console.log('this.songs', this.songs)
          }
        })
      },
      // 重组 res.data.list 数据,只拿需要的
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          // 解构赋值-拿到item 下的 musicData 列表数据
          if (musicData.id) {
            ret.push(createSongSinger(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
