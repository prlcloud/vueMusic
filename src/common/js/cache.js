// 缓存到LocalStorage,用到storage开源库
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// const USER_MAX_LEN = 200
const USER_KEY = '__user__'
const USER_MAX_LEN = 200

// 登录数据缓存
export function saveLogin(query) {
  let user = storage.get(USER_KEY, [])
  insertArray(user, query, (item) => {
    return item === query
  }, USER_MAX_LEN)
  storage.set(USER_KEY, user)
  return user
}
// 搜索历史初始值
export function loadUser() {
  return storage.get(USER_KEY, [])
}

// 插入数据
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
// 删除数据
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 搜索历史缓存
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 删除搜索历史
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 清空历史
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
// 搜索历史初始值
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
// 添加歌曲页
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
// 收藏
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
