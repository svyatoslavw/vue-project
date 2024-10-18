import { MotionPlugin } from "@vueuse/motion"
import { createPinia } from "pinia"
import { createApp } from "vue"
import VueRewards from "vue-rewards"

import App from "./App.vue"
import "./assets/index.css"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(MotionPlugin)
app.use(VueRewards)
app.use(router)

app.mount("#app")
