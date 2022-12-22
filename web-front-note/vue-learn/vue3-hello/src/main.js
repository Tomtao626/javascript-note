import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入router
import router from './router'

// 应用使用router
createApp(App).use(router).mount('#app')

// 将router作为默认导出
export default router;