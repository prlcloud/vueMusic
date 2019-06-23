import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
// import axios from 'axios'

export function getSearchSinger (keywords) {
  const url = `https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/search?keywords`
  const data = Object.assign({}, {
    keywords,
    type: 100
  })
  return jsonp(url, data)
 //  return axios.get(url)
}

export function getSearchSongs (keywords, offset) {
  const url = `https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/search`
  const data = Object.assign({}, {
    keywords,
    offset
  })
  return jsonp(url, data)
}

export function getSearchSuggest (keywords) {
  const url = `https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/search/suggest`
  const data = Object.assign({}, {
    keywords
  })
  return jsonp(url, data)
}

export function getSongDetail (ids) {
  const url = `https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/song/detail`
  const data = Object.assign({}, {
    ids,
    type: 100
  })
  return jsonp(url, data)
}

export function getSearchHot (id) {
  const url = `https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/search/hot`

  return jsonp(url)
}
