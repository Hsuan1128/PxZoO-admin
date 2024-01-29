import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "backLogin",
      component: () => import("../views/backLogin.vue"),
      meta: {
        title: "管理員登入",
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
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
