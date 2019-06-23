<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="login-warp">
      <div class="content">
        <mu-container>
          <mu-form ref="form" :model="validateForm" class="mu-demo-form">
            <mu-form-item label="昵称" prop="nickname" :rules="nicknameRules">
              <mu-text-field type="nickname" v-model="validateForm.nickname" prop="nickname"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="手机号" help-text="" prop="phone" :rules="phoneRules">
              <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
              <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="确认密码" prop="repassword" :rules="repasswordRules">
              <mu-text-field type="password" v-model="validateForm.repassword" prop="repassword"></mu-text-field>
            </mu-form-item>
            <mu-form-item ref="captcha" label="验证码" help-text="" prop="captcha">
              <mu-text-field v-model="validateForm.captcha" prop="captcha">
                <mu-button color="cyan500" @click="send" style="width: 37%">点击发送验证码</mu-button>
              </mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="cyan500" @click="submit" style="width: 95%">注册</mu-button>
            </mu-form-item>
            <mu-form-item>
              <mu-button flat color="cyan500" to="/login" style="font-size: 17px">前往登录</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import {Register, Send} from 'api/login'
export default {
  name: 'Register',
  data () {
    return {
      phoneRules: [
        { validate: (val) => !!val, message: '必须填写' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3, message: '密码长度大于3' }
      ],
      repasswordRules: [
        { validate: (val) => !!val, message: '请再次输入密码' },
        { validate: (val) => val === this.validateForm.password, message: '两次密码不一致' }
      ],
      nicknameRules: [
        { validate: (val) => !!val, message: '请输入昵称' },
        { validate: (val) => val.length >= 4, message: '昵称不得少于2个汉字或4个英文字符' }
      ],
      validateForm: {
        phone: '',
        captcha: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 发送验证码
    send () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          Send(this.validateForm.phone).then((res) => {
            const data = JSON.parse(res)
            console.log('data', data)
            if (data.code === 200) {
              this.$toast.info('发送成功')
            }
          }).catch((error) => {
            console.log(error)
            setTimeout(() => {
              this.$toast.error('发送失败')
            }, 2000)
          })
        }
      })
    },
    // 注册
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const loading = this.$loading({})
          Register(this.validateForm.nickname, this.validateForm.phone, this.validateForm.password, this.validateForm.captcha)
            .then((response) => {
              const data = JSON.parse(response)
              console.log('data', data)
              if (data.code === 200) {
                loading.close()
                // 提示信息
                this.$toast.info('注册成功')
                // 路由跳转
                this.$router.push('/login')
              }
              if (data.code === 400) {
                loading.close()
                // 提示信息
                this.$toast.info(data.msg)
              }
              if (data.code === 505) {
                loading.close()
                // 提示信息
                this.$toast.info(data.msg)
              }
            })
            .catch((error) => {
              console.log(error)
              setTimeout(() => {
                loading.close()
                this.$toast.error('注册失败')
              }, 2000)
            })
        }
      })
    }
  }
}
</script>


<style scoped scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-theme
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-background
    .login-warp{
      position: absolute
      width: 100%;
      height: 100%;
      background-size:100% 100%;
    }
    .content{
      padding-top: 20%;
      width: 100%;
      height: calc(100vh - 56px);
    }
</style>
