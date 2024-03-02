import { createApp } from 'vue'
import router from '@/router/router.js'
import App from './App.vue'
import directives from '@/directive'
import store from '@/store'

const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(router)
app.use(store)
app.mount('#app')
