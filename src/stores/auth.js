// https://pinia.vuejs.org/core-concepts/state.html

import { defineStore } from "pinia";

const userStore = defineStore({
  id: "userStore",
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    getUserName: (state) => `歡迎 ${state.name}`,
  },
  actions: {
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

    updateToken(payload) {
      if (payload) {
        this.token = payload;
        localStorage.setItem("token", payload);
      } else {
        this.token = "";
        localStorage.removeItem("token");
      }
    },

    updateName(payload) {
      this.name = payload;
    },

    updateUserData(val) {
      this.userData = {
        pos: val.sta_pos,
        id: val.sta_id,
        validation: val.mem_validation,
        state: val.mem_state,
        role: "editor",
      };
      localStorage.setItem("userData", JSON.stringify(this.userData));
    },

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
