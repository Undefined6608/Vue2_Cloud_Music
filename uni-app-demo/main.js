
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import uView from '@/uni_modules/uview-ui'
import play_music from '@/components/play_music.vue'

Vue.config.productionTip = false
Vue.use(uView)
Vue.prototype.$store = store
Vue.component('play-music',play_music)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif