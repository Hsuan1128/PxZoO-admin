// https://pinia.vuejs.org/core-concepts/state.html

import { defineStore } from "pinia";

// 创建名为 "userStore" 的存储库
const userStore = defineStore({
  id: "userStore",
  state: () => ({
    token: localStorage.getItem("token") || "", // 用户令牌
  }),
  getters: {
    // 计算属性，返回欢迎消息
    getUserName: (state) => `歡迎 ${state.name}`,
  },
  actions: {
    // 检查用户登录状态
    checkLogin() {
      const storageToken = localStorage.getItem("token");
      if (this.token) {
        return this.token;
      } else if (storageToken) {
        return storageToken;
      } else {
        return "";
      }
    },
    // 更新用户令牌
    updateToken(payload) {
      if (payload) {
        this.token = payload;
        localStorage.setItem("token", payload);
      } else {
        this.token = "";
        localStorage.removeItem("token");
      }
    },
    // 更新用户姓名
    updateName(payload) {
      this.name = payload;
    },
    // 更新用户数据
    updateUserData(val) {
      console.log(val);
      this.userData = {
        pos: val.sta_pos,
        id: val.sta_id,
        validation: val.mem_validation,
        state: val.mem_state,
        role: "editor", // 如果有权限可以把权限角色记载数据库
      };
      localStorage.setItem("userData", JSON.stringify(this.userData));
    },
    // 检查用户数据
    checkUserData() {
      const storageUserData = localStorage.getItem("userData");
      if (Object.keys(this.userData).length > 0) {
        return this.userData;
      } else if (storageUserData) {
        this.userData = JSON.parse(storageUserData);
        return storageUserData;
      } else {
        return "";
      }
    },
  },
});

export default userStore;
