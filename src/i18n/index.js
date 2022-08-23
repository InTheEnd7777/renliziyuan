import Cookie from 'js-cookie'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './message/en'
import zh from './message/zh'
Vue.use(VueI18n)

export const messages = {
  en,
  zh
}
const i18n = new VueI18n({
  locale: Cookie.get('lang') || 'zh', // 设置地区
  messages // 设置地区信息
})
export default i18n
