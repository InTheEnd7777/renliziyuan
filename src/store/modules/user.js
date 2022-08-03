import { login, getuserinfo, getuserinfoxq } from '@/api/user'
import {settokentime} from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userinfo: {}
  },
  mutations: {
    settoken(state, payload) {
      state.token = payload
    },
    setuserinfo(state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    async gettoken(context, payload) {
      const res = await login(payload)
      context.commit('settoken', res)
      settokentime()
      
    },
    //获取用户基本资料
    async getuserinfo(context) {
      const userBaseinfo = await getuserinfo()
      // console.log(userBaseinfo)
      //获取用户基本信息
      const userinfo = await getuserinfoxq(userBaseinfo.userId)
      // console.log(userinfo)
      context.commit('setuserinfo', { ...userBaseinfo, ...userinfo })
    },
    //退出
    logout(context) {
      context.commit('settoken', '')
      context.commit('setuserinfo', {})
    }
  }
}
