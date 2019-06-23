// 映射mutation中的数据，歌手数据
export const musicList = state => state.musicList
export const singer = state => state.singer
// 播放器状态的映射
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex
// 直接访问歌曲currentSong
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
// 歌单状态映射
export const disc = state => state.disc
// 排行详情映射
export const topList = state => state.topList
export const idx = state => state.idx
// 搜索历史映射
export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList

// 登录
export const user = state => state.user
