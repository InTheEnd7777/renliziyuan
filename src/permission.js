import router from '@/router/index'
import store from '@/store'
const whitelist = ['/login', '404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  //如果有token
  if (token) {
    //获取用户信息
    await store.dispatch('user/getuserinfo')
    //是否在登录页
    if (to.path === '/login') {
      //跳转到首页
      next('/')
    } else {
      //放行
      next()
    }
  } else {
    //是否在白名单
    const iswhitelist = whitelist.includes(to.path)
    if (iswhitelist) {
      next()
    } else {
      next('/login')
    }
  }
})
