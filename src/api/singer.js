import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
// 歌手页面 获取歌手数据的接口
export function getSingerList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/top/artists'
  // const url = `https://bird.ioliu.cn/v2/?url=https://api.imjad.cn/cloudmusic/`
  const data = Object.assign({}, {
    /* channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744 */
    limit: 100
  })

  return jsonp(url, data)
}

// 获取歌手详细歌曲的数据接口
export function getSingerDetail(id) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/artists'
  const data = Object.assign({}, {
    id
    /* hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk: 1664029744 */
  })

  return jsonp(url, data)
}
// 获取歌曲的vkey
export function getSongVkey(ids) {
  // const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/song/detail'
  const data = Object.assign({}, {
    ids
    /* callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a` */
  })

  return jsonp(url, data)
}
