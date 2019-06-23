import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
// 排行页面数据获取
export function getTopList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/toplist/detail'
  /* const data = Object.assign({}, {
    /!* uin: 0,
    needNewCode: 1,
    platform: 'h5' *!/
  }) */

  return jsonp(url)
}
// 排行详情歌曲数据获取
export function getMusicList(idx) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/top/list'
  const data = Object.assign({}, {
    idx
    /* needNewCode: 1,
    // uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5' */
  })

  return jsonp(url, data)
}
