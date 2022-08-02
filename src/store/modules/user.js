import { login } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    settoken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async gettoken(context, payload) {
      const res = await login(payload)
      context.commit('settoken', res)
    }
  }
}
