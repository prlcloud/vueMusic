<template >
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="login-warp">
      <div class="content">
        <mu-container>
          <mu-form ref="form" :model="validateForm" class="mu-demo-form form">
            <mu-form-item label="手机号" help-text="" prop="phone" :rules="phoneRules">
              <mu-text-field v-model="validateForm.phone" prop="phone"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
              <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="cyan500" @click="submit" style="width: 95%">登录</mu-button>
            </mu-form-item>
            <mu-form-item>
              <mu-button flat color="cyan500" to="/register" style="font-size: 17px">前往注册</mu-button>
              <mu-button flat style="font-size: 17px"></mu-button>
              <mu-button flat color="cyan500" @click="quit" style="font-size: 17px; float: left">退出登录</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import {Login, loginOut} from 'api/login'
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      phoneRules: [
        { validate: (val) => !!val, message: '必须填写手机号' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3, message: '密码长度大于3' }
      ],
      validateForm: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const loading = this.$loading({})
          Login(this.validateForm.phone, this.validateForm.password).then((response) => {
            const data = JSON.parse(response)
            console.log('data', data)
            if (data.code === 200) {
              this.saveLoginHistory(data.profile)
              loading.close()
                // 提示信息
              this.$toast.success('登录成功')
                // 路由跳转
              this.$router.push('/recommend')
            }
            if (data.code === 201) {
              loading.close()
                // 提示信息
              this.$toast.error('登录失败')
            }
          })
            .catch((error) => {
              console.log(error)
              loading.close()
              this.$toast.error('登录失败')
            })
        }
      })
    },
    // 退出登录
    quit() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const loading = this.$loading({})
          loginOut().then((res) => {
            const data = JSON.parse(res)
            if (data.code === 200) {
              loading.close()
              this.$toast.info('成功退出')
            }
          })
        }
      })
    },
    ...mapActions([
      'saveLoginHistory'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
    }
    .content{
      padding-top: 20%;
      width: 100%;
      height: calc(100vh - 56px);
    }
</style>
