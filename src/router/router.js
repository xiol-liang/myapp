// router.js

import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import LoginPage from '../components/account/Login'
import TopNavBar from "../components/layout/TopNavBar";
import BottomBar from "../components/layout/BottomBar";
import RightBar from "../components/layout/RightBar";
import LeftBar from "../components/layout/LeftBar";
import TypeText from "../components/tools/TypeText.vue";

import store from "../platform/store/index"

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: "home",
            components: {
                default: HomePage,
                header: TopNavBar,
                rightbar: RightBar,
                leftbar: LeftBar,
                footer: BottomBar,
            },
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: "login",
            components: {
                header:TypeText,
                default: LoginPage,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    // 判断是否需要登录验证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断用户是否已经登录，这里可以根据你的实际情况判断
        const isAuthenticated = store.state.isAuthenticated;

        if (!isAuthenticated) {
            // 如果用户未登录，跳转到登录页面
            next({ name: 'login' });
        } else {
            // 如果用户已经登录，继续导航
            next();
        }
    } else {
        // 对于不需要登录验证的路由，直接继续导航
        next();
    }
})

export default router;
