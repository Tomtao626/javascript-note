// 导入路由
import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由表
const routes = [
    {path:'/home', component: () => import('../views/Home.vue')},
    {path:'/about', component: () => import('../views/About.vue')},
    //动态路由url:/user/1 id为1
    {path:'/user/:id', component: () => import('../views/User.vue'),
    children: [
        {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: 'profile',
            component: () => import('../views/user/Profile.vue')
        },
        {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 将被渲染到 User 的 <router-view> 内部
            path: 'posts',
            component: () => import('../views/user/Posts.vue')
        }
    ]
    }
]

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});