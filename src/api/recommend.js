import jsonp from 'common/js/jsonp'
import {options} from './config'

// 封装推荐方法
export function getRecommend() {
  // qq音乐每日推荐接口
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // 网易云音乐每日推荐接口
  // const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/recommend/songs'
  const data = Object.assign({}, {}, {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
// 热门推荐
export function getDiscList() {
  // const url = '/api/getDiscList'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/top/playlist/highquality'
  const data = Object.assign({}, {}, {
    before: 1503639064232,
    limit: 20
  })
  return jsonp(url, data)
  /* return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }) */
}
// 获取歌单详情页的数据
export function getSongList(id) {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  // const url = '/api/recommendlist'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/playlist/detail'
  const data = Object.assign({}, {
    id
  })
  return jsonp(url, data)
  /* return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }) */
}
