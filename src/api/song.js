// import {commonParams} from './config'
// import axios from 'axios'
import jsonp from 'common/js/jsonp'
// 获取歌曲播放的url
export function getUrl(id) {
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/song/url'
  // const url = 'https://bird.ioliu.cn/v2/?url=https://api.imjad.cn/cloudmusic'
  // console.log('id', id)
  const data = Object.assign({}, {
    id
    // type: 'song',
    // br: 128000
  })
  return jsonp(url, data)
}
// 获取歌词
export function getLyric(id) {
  // const url = '/api/lyric'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/lyric'
  // console.log('mid', id)
  const data = Object.assign({}, {
    id
    /* songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    g_tk: 67232076 */
  })
  return jsonp(url, data)
  /* return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }) */
}
