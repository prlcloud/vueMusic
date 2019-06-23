import jsonp from 'common/js/jsonp'

// 登录
export function Login(phone, password) {
  console.log('phone', phone)
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/login/cellphone'
  const data = Object.assign({}, {}, {
    phone,
    password
  })
  return jsonp(url, data)
}
// 注册
export function Register(nickname, phone, password, captcha) {
  const url = 'http://118.89.227.245:3030/captch/register'
  const data = Object.assign({}, {}, {
    nickname,
    phone,
    password,
    captcha
  })
  return jsonp(url, data)
}

// 发送验证码
export function Send(phone) {
  console.log('phone', phone)
  const url = 'http://118.89.227.245:3030/captch/sent'
  const data = Object.assign({}, {}, {
    phone
  })
  jsonp(url, data)
}

// 验证验证码
export function Check(phone, captcha) {
  console.log('phone', phone)
  console.log('captcha', captcha)
  const url = 'http://118.89.227.245:3030/captch/verify'
  const data = Object.assign({}, {}, {
    phone,
    captcha
  })
  jsonp(url, data)
}

// 登录状态
export function loginStatus() {
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/login/status'
  jsonp(url)
}
// 退出登录
export function loginOut() {
  const url = 'https://bird.ioliu.cn/v2/?url=http://118.89.227.245:3000/logout'
  jsonp(url)
}
