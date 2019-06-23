<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item in topList">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.tracks">
              <span>{{index + 1}}</span>
              <span>{{song.first}}-{{song.second}}</span>
            </li>
            <li v-show="!item.tracks.length" class="song">
              <span>{{item.description}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getTopList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  const TYPE_IDX0 = '云音乐新歌榜'
  const TYPE_IDX1 = '云音乐热歌榜'
  const TYPE_IDX2 = '网易原创歌曲榜'
  const TYPE_IDX3 = '云音乐飙升榜'
  const TYPE_IDX4 = '云音乐电音榜'
  const TYPE_IDX5 = 'UK排行榜周榜'
  const TYPE_IDX6 = '美国Billboard周榜'
  const TYPE_IDX7 = 'KTV嗨榜'
  const TYPE_IDX8 = 'iTunes榜'
  const TYPE_IDX9 = 'Hit FM Top榜'
  const TYPE_IDX10 = '日本Oricon周榜'
  const TYPE_IDX11 = '韩国Melon排行榜周榜'
  const TYPE_IDX12 = '韩国Mnet排行榜周榜,'
  const TYPE_IDX13 = '韩国Melon原声周榜'
  const TYPE_IDX14 = '中国TOP排行榜(港台榜)'
  const TYPE_IDX15 = '中国TOP排行榜(内地榜)'
  const TYPE_IDX16 = '香港电台中文歌曲龙虎榜'
  const TYPE_IDX17 = '华语金曲榜'
  const TYPE_IDX18 = '中国嘻哈榜'
  const TYPE_IDX19 = '法国 NRJ EuroHot 30周榜'
  const TYPE_IDX20 = '台湾Hito排行榜'
  const TYPE_IDX21 = 'Beatport全球电子舞曲榜'
  const TYPE_IDX22 = '云音乐ACG音乐榜'
  const TYPE_IDX23 = '云音乐嘻哈榜'

  export default {
    mixins: [playlistMixin],
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: [],
        idx: 0
      }
    },
    methods: {
      // 处理有小播放页面时高度的问题
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem(item) {
        const typeIdx = item.name
        console.log('typeIdx', typeIdx)
        if (typeIdx === TYPE_IDX0) {
          this.idx = 0
        } else if (typeIdx === TYPE_IDX1) {
          this.idx = 1
        } else if (typeIdx === TYPE_IDX2) {
          this.idx = 2
        } else if (typeIdx === TYPE_IDX3) {
          this.idx = 3
        } else if (typeIdx === TYPE_IDX4) {
          this.idx = 4
        } else if (typeIdx === TYPE_IDX5) {
          this.idx = 5
        } else if (typeIdx === TYPE_IDX6) {
          this.idx = 6
        } else if (typeIdx === TYPE_IDX7) {
          this.idx = 7
        } else if (typeIdx === TYPE_IDX8) {
          this.idx = 8
        } else if (typeIdx === TYPE_IDX9) {
          this.idx = 9
        } else if (typeIdx === TYPE_IDX10) {
          this.idx = 10
        } else if (typeIdx === TYPE_IDX11) {
          this.idx = 11
        } else if (typeIdx === TYPE_IDX12) {
          this.idx = 12
        } else if (typeIdx === TYPE_IDX13) {
          this.idx = 13
        } else if (typeIdx === TYPE_IDX14) {
          this.idx = 14
        } else if (typeIdx === TYPE_IDX15) {
          this.idx = 15
        } else if (typeIdx === TYPE_IDX16) {
          this.idx = 16
        } else if (typeIdx === TYPE_IDX17) {
          this.idx = 17
        } else if (typeIdx === TYPE_IDX18) {
          this.idx = 18
        } else if (typeIdx === TYPE_IDX19) {
          this.idx = 19
        } else if (typeIdx === TYPE_IDX20) {
          this.idx = 20
        } else if (typeIdx === TYPE_IDX21) {
          this.idx = 21
        } else if (typeIdx === TYPE_IDX22) {
          this.idx = 22
        } else if (typeIdx === TYPE_IDX23) {
          this.idx = 23
        } else {
          this.idx = 0
        }
        console.log('idx', this.idx)
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
        this.setIdx(this.idx)
      },
      _getTopList() {
        getTopList().then((res) => {
          const data = JSON.parse(res)
          if (data.code === ERR_OK) {
            this.topList = data.list
            // console.log('this.topList', data.list)
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST',
        setIdx: 'SET_IDX'
      })
    },
    watch: {
      topList() {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 20)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background-color: $color-content
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-content
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
