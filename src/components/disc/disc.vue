<!--歌单详情页组件-->
<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
//  import {getSongVkey} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.name
      },
      bgImage() {
        return this.disc.coverImgUrl
      },
      // 接收recommend.vue中的数据
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        console.log('disc', this.disc)
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
        // 获取数据
        getSongList(this.disc.id).then((res) => {
          const data = JSON.parse(res)
          if (data.code === ERR_OK) {
            // console.log('data', data.playlist.tracks)
            // this.songs = data.playlist.tracks
            this.songs = this._normalizeSongs(data.playlist.tracks)
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
            ret.push(createSong(musicData))
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
