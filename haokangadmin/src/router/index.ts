import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Member from "../views/Member.vue";
import MemberDetail from "../views/MemberDetail.vue";
import Video from "../views/Video.vue";
import Article from "../views/Article.vue";
import ArticleInfo from "../views/ArticleInfo.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import VideoInfo from "../views/VideoInfo.vue";
import VideoDetail from "../views/VideoDetail.vue";
import Classify from "../views/Classify.vue";
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
        path: 'memberDetail',
        name: 'MemberDetail',
        component: MemberDetail
      },
      {
        path: 'article',
        name: 'Article',
        component: Article,
        children:[
          {
            path: 'articleInfo',
            name: 'ArticleInfo',
            component: ArticleInfo
          },
          {
            path: 'articleDetail',
            name: 'ArticleDetail',
            component: ArticleDetail
          },
        ]
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
        path: 'classify',
        name: 'Classify',
        component: Classify
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
