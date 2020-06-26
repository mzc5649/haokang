import Vue from "vue";
import VueRouter from "vue-router";
import ViewUI from 'view-design';

Vue.use(ViewUI);
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Index",
        component: () =>
            import("../views/Index")
    },
    {
        path: "/index",
        name: "Index",
        component: () =>
            import("../views/Index")
    },
    {
        path: "/home",
        children: [
            {
                path: "/",
                name: "homeIndex",
                component: () =>
                    import("../components/home/homeIndex")
            },
            {
                path: "homeMyInfo",
                name: "homeMyInfo",
                component: () =>
                    import("../components/home/homeMyInfo")
            },
            {
                path: "homeMyHead",
                name: "homeMyHead",
                component: () =>
                    import("../components/home/homeMyHead")
            },
            {
                path: "homeMyVideo",
                name: "homeMyVideo",
                component: () =>
                    import("../components/home/homeMyVideo")
            }
            ,
            {
                path: "homeMyArticle",
                name: "homeMyArticle",
                component: () =>
                    import("../components/home/homeMyArticle")
            }

        ],
        component: () =>
            import("../views/Home")
    },
    {
        path: "/v",
        name: "Video",
        component: () =>
            import("../views/Video")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("../views/Login")
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import("../views/Register")
    },
    {
        path: "/create",
        component: () =>
            import("../views/Create"),
        children: [
            {
                path: "/",
                name: "submit",
                component: () =>
                    import("../components/create/submit"),
            },
        ]
    },
    {
        path: "/art",
        component:()=>
            import("@/views/Article")
    },
    {
        path: "/classify",
        component:()=>
            import("@/views/Classify")
    }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});
router.afterEach(() => {

    ViewUI.LoadingBar.finish();
})
export default router;
