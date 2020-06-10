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
        name: "Home",
        component: () =>
            import("../views/Home")
    },
    {
        path: "/video",
        name: "Video",
        component: () =>
            import("../views/Video")
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
router.afterEach(() =>{
    ViewUI.LoadingBar.finish();
})
export default router;
