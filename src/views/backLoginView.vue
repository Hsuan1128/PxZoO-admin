<template>
  <main class="loginMain">
    <section class="inputArea">
      <img src="@/assets/images/login/logoG.svg" alt="logoG" class="logoG" />
      <img src="@/assets/images/login/cloudb.svg" alt="cloudb" class="cloudb" />
      <img
        src="@/assets/images/login/cloudsun.svg"
        alt="cloudsun"
        class="cloudsun"
      />
      <div class="meerkats">
        <img
          src="../assets/images/login/vetor_animal_meerkat.svg"
          alt="meerkat"
          class="meerkat"
        />
        <img
          src="../assets/images/login/vetor_animal_meerkat.svg"
          alt="meerkat"
          class="meerkat"
        />
        <img
          src="../assets/images/login/vetor_animal_meerkat.svg"
          alt="meerkat"
          class="meerkat"
        />
      </div>
      <div class="acc">
        <div class="img">
          <img
            src="@/assets/images/login/icon/account.svg"
            alt="account"
            class="account"
          />
        </div>

        <input
          type="text"
          placeholder="帳號"
          class="account"
          v-model="sta_acc"
        />
      </div>
      <div class="psw">
        <div class="img">
          <img src="@/assets/images/login/icon/psw.svg" alt="psw" class="psw" />
        </div>
        <input type="password" placeholder="密碼" v-model="sta_au4a83" />
      </div>
      <button type="submit" class="defaultBtn pcInnerText" @click="staffLogin">
        登入
        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
      </button>
    </section>

    <section class="grassArea">
      <img
        src="../assets/images/login/nature_tree_3.svg"
        alt="tree3"
        class="tree3"
      />
      <img
        src="../assets/images/login/nature_tree_8.svg"
        alt="tree8"
        class="tree8"
      />
      <img
        src="../assets/images/login/nature_grasses_5.svg"
        alt="grasses5"
        class="grasses5"
      />
      <img
        src="../assets/images/login/nature_grasses_7.svg"
        alt="grasses7"
        class="grasses7"
      />
      <img
        src="@/assets/images/login/Group 1562.svg"
        alt="grass"
        class="grass"
      />
    </section>
  </main>
</template>

<script>
import { mapActions } from "pinia";
import userStore from "@/stores/auth";
import apiInstance from "@/stores/acc";
export default {
  data() {
    return {
      sta_acc: "",
      sta_au4a83: "",
    };
  },
  computed: {
    accPswChick() {
      return this.sta_acc !== "" && this.sta_au4a83 !== "";
    },
  },
  methods: {
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
    ]),
    toMainPage() {
      this.$router.push("home");
    },
    staffLogin() {
      const self = this;
      const bodyFormData = new FormData();
      bodyFormData.append("sta_acc", this.sta_acc);
      bodyFormData.append("sta_psw", this.sta_au4a83);

      // 請記得將php埋入跨域
      apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/staffLogin.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      })
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            if (res.data.code == 1) {
              self.updateToken(res.data.session_id);
              self.updateUserData(res.data.staInfo);
              alert(res.data.staInfo.sta_pos + " 歡迎登入");
              self.$router.push({
                name: "home",
                params: { position: res.data.staInfo.sta_pos },
              });
            } else if (self.sta_acc == "") {
              alert("請輸入帳號");
            } else if (self.sta_au4a83 == "") {
              alert("請輸入密碼");
            } else {
              alert("登入失敗");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
