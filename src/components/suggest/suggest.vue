<template>
  <div class="suggest">
    <div class="search-suggest" v-show="!searchShow && query && songs.length > 0">
      <p class="title" v-show="showSinger && showList">最佳匹配</p>
      <div @click="selectItem(suggest.artists[0])" class="search-suggest-item" v-if="suggest.artists && showSinger">
        <img :src="suggest.artists[0].img1v1Url" width="50" height="50">
        <span>歌手：{{suggest.artists[0].name}}</span>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList" v-show="!searchShow">
      <li @click="selectSong(item)" class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="icon">
          <i :class="getIconCls()"></i>
        </div>
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
      <loading v-show="haveMore && query"></loading>
    </ul>
    <div v-show="!haveMore && !songs.length && query" class="no-result-wrapper">
      抱歉，暂无搜索结果
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {getSearchSongs, getSearchSuggest, getSongDetail} from 'api/search'
import {createSearchSong} from 'common/js/song'
import {mapMutations, mapActions} from 'vuex'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    },
    showList: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      singer: {},
      songs: [],
      suggest: {},
      searchShow: true,
      page: 0,
      update: true,
      haveMore: true
    }
  },
  computed: {
  },
  methods: {
    getIconCls() {
      return 'icon-music'
    },
    selectItem (item) {
      console.log('item1111', item)
      const singer = new Singer({
        id: item.id,
        name: item.name,
        avatar: item.img1v1Url
      })
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
      this.$emit('select')
    },
    selectSong (item) {
      getSongDetail(item.id).then((res) => {
        const data = JSON.parse(res)
        item.image = data.songs[0].al.picUrl
        this.insertSong(item)
      })
      this.$emit('select')
    },
    search () {
      this.searchShow = false
      this.haveMore = true
      getSearchSongs(this.query, this.page).then((res) => {
        const data = JSON.parse(res)
        if (!data.result.songs) {
          this.haveMore = false
          return
        }
        let list = data.result.songs
        console.log('list', list)
        let ret = []
        list.forEach((item) => {
          ret.push(createSearchSong(item))
        })
        this.songs = ret
        this.$emit('refresh')
      })
      this.page += 30
      getSearchSuggest(this.query).then((res) => {
        const datas = JSON.parse(res)
        this.suggest = datas.result
      })
    },
    searchMore () {
      console.log('searchMore')
      if (!this.haveMore) {
        return
      }
      if (!this.songs.length) {
        return
      }
      getSearchSongs(this.query, this.page).then((res) => {
        const datass = JSON.parse(res)
        let list = datass.result.songs
        if (!datass.result.songs) {
          this.haveMore = false
          return
        }
        let ret = []
        list.forEach((item) => {
          ret.push(createSearchSong(item))
        })
        this.songs = this.songs.concat(ret)
        this.$emit('refresh')
        this.page += 30
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
      // setMusicList: 'SET_MUSIC_LIST'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query (val) {
      if (val === '') {
        this.suggest = {}
        this.songs = []
        this.haveMore = false
        return
      }
      this.suggest = {}
      this.songs = []
      this.searchShow = true
      this.page = 0
      this.haveMore = true
      this.search()
    },
    songs (songs) {
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"


  .suggest {
    height: 100%;
    overflow: hidden;
    .search-go {
      font-size: $font-size-medium;
      margin-left: 20px;
      color: $color-theme;
    }
    .search-suggest {
      .title {
        padding-left: 20px;
        padding-bottom: 10px;
        color: $color-background;
        font-size: $font-size-large-x;
      }
      .search-suggest-item {
        display: flex;
        align-items: center;
        padding: 8px 20px;
        border-bottom: 1px solid rgb(228, 228, 228);
        font-size: $font-size-medium;
        img {
          flex: 0 0 50px;
          padding-right: 15px;
        }
        .text {
          width: 100%;
          p {
            padding: 3px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .singer {
            font-size: 12px;
            color: $color-text;
          }
        }
      }
    }
    .suggest-list {
      padding-bottom: 30px;
      .suggest-item {
        display: flex;
        padding: 3px 20px;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid rgb(228, 228, 228);
        p {
          padding: 3px 0;
        }
        .song {
          font-size: $font-size-medium-x;
          color: $color-text;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          // padding-bottom: 20px
        }
        .singer {
          font-size: 12px;
          color: $color-text-g;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .icon {
        flex: 0 0 30px
        width: 30px
        [class^="icon-"] {
          font-size: 14px;
          color: $color-text;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
  .no-result-wrapper {
    position: fixed;
    overflow: hidden;
    left: 50%;
    top: 40vh;
    transform: translatex(-50%);
    color: $color-text;
  }
</style>
