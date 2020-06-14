import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Member from "../views/Member.vue";
import Video from "../views/Video.vue";
import VideoInfo from "../views/VideoInfo.vue";
import VideoAdd from "../views/VideoAdd.vue";
import VideoDetail from "../views/VideoDetail.vue";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path: 'member',
        name: 'Member',
        component: Member
      },
      {
        path: 'video',
        name: 'Video',
        component: Video,
        children:[
          {
            path: 'videoInfo',
            name: 'VideoInfo',
            component: VideoInfo
          },
          {
            path: 'videoDetail',
            name: 'VideoDetail',
            component: VideoDetail
          },

        ]
      },
      {
        path: 'videoAdd',
        name: 'VideoAdd',
        component: VideoAdd
      }
    ]
  },

];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
