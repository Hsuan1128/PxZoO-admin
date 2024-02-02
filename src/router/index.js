import { createRouter, createWebHistory } from "vue-router";
import backLogin from "../views/backLoginView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "backLogin",
      component: backLogin,
      meta: {
        title: "管理員登入",
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/homeView.vue"),
      meta: {
        title: "首頁",
      },
    },
    {
      path: "/staff",
      name: "staff",
      component: () => import("../views/staffView.vue"),
      meta: {
        title: "後台管理",
      },
    },
    {
      path: "/tickets",
      name: "tickets",
      component: () => import("../views/ticketsView.vue"),
      meta: {
        title: "門票管理",
      },
    },
    {
      path: "/animal",
      name: "animal",
      component: () => import("../views/animalView.vue"),
      meta: {
        title: "動物管理",
      },
    },
    {
      path: "/charts",
      name: "charts",
      component: () => import("../views/chartsView.vue"),
      meta: {
        title: "銷售統計",
      },
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("../views/commentView.vue"),
      meta: {
        title: "評論管理",
      },
    },
  ],
});
//跳轉頁面時跳到頂端
router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 產生每一頁頁籤的title
router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
