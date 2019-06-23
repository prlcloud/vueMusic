import * as types from './mutation-types'

// mutation一些相关的修改方法
const mutations = {
  // 歌手方法
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  // 歌单方法
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  // 排行详情方法
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_IDX](state, idx) {
    state.idx = idx
  },
  // 保存方法
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [types.SET_USER_HISTORY](state, history) {
    state.user = history
  }
}

export default mutations
