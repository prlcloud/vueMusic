import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite, loadUser} from 'common/js/cache'
// 播放器的状态
const state = {
  musicList: {},
  singer: {},
  playing: false,
  // 全屏
  fullScreen: false,
  // 播放进度
  playlist: [],
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放的索引
  currentIndex: -1,
  // 定义歌单对象
  disc: {},
  // 排行详情对象
  topList: {},
  idx: 0,
  // 保存方法,loadSearch开始从本地缓存中读取
  searchHistory: loadSearch(),
  // 添加歌曲页搜索历史
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
  user: loadUser()
}

export default state
