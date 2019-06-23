import {getLyric, getUrl} from 'api/song'
import {ERR_OK} from 'api/config'
// import {Base64} from 'js-base64'

export default class Song {
  constructor({id, singer, name, duration, image, url}) {
    // 歌曲id
    this.id = id
    this.singer = singer
    this.name = name
    this.duration = duration
    this.image = image
    getUrl(url).then((res) => {
      const data = JSON.parse(res)
      if (data.code === ERR_OK) {
        this.url = data.data[0].url
        // console.log('歌曲信息11111', this.url)
      }
    })
  }

  // 封装歌词的方法
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        console.log('封装歌词this.id', this.id)
        const data = JSON.parse(res)
        if (data.nolyric === true) {
          this.lyric = '暂无歌词信息'
          console.log('lyric', this.lyric)
        } else if (data.code === ERR_OK) {
          this.lyric = data.lrc.lyric
          resolve(this.lyric)
        } else {
          reject('暂无歌词信息')
        }
      })
    })
  }
}

// 工厂方法 duration播放时间
// 推荐
export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    duration: musicData.dt,
    image: musicData.al.picUrl,
    // 播放源地址
    url: musicData.id
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // 播放源地址
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
  })
}
// 歌手
export function createSongSinger(musicData) {
  console.log('musicData', musicData)
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    image: musicData.al.picUrl,
    duration: musicData.dt,
    // 播放源地址
    url: musicData.id
  })
}

// 搜索歌曲
export function createSearchSong (music) {
  console.log('music', music)
  return new Song({
    id: music.id,
    singer: singerName(music.artists),
    name: music.name,
    duration: music.dt,
    album: music.album.name,
    url: music.id
  })
}

function singerName (arr) {
  let name = []
  name = arr.map((item) => {
    // console.log(arr)
    return item.name
  })

  return name.join('/')
}

// 处理musicData数据中的singer数组
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

