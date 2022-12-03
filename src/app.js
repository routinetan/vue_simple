const Vue = require('vue')
import App from "./view/app.vue";
import router from "./router/index"; //关键代码
import Request from './api/request.js'
import lodashCloneDeep from 'lodash.clonedeep'

Vue.prototype.Request = Request

function initRem() {
    let cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
    window.document.documentElement.style.fontSize = `${100 * cale}px`
}
window.addEventListener('resize', function() {
    initRem()
})

new Vue({
    router, //关键代码
    render: (h) => h(App)
}).$mount("#app")