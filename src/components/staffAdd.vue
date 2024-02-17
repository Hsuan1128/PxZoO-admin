<template>
  <div class="sta_add" v-show="list">
    <h2>後台人員新增</h2>
    <div class="staInputArea">
      <div class="staInput">
        <label for="">職位:</label>
        <input type="text" v-model="sta_pos" readonly />
      </div>
      <div class="staInput">
        <label for="">信箱:</label>
        <input type="email" v-model="sta_email" />
      </div>
      <div class="staInput">
        <label for="">帳號:</label>
        <input type="text" v-model="sta_acc" />
      </div>
      <div class="staInput">
        <label for="">密碼:</label>
        <input type="text" v-model="sta_psw" />
      </div>
    </div>
    <div class="staAdd_btn">
      <button class="defaultBtn pcInnerText" @click="addStaffInfo">
        儲存
        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
      </button>

      <button class="defaultBtn pcInnerText" @click="listClose" v-show="list">
        返回列表
        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import apiInstance from "@/stores/acc";
export default {
  data() {
    return {
      sta_pos: "管理員",
      sta_email: "",
      sta_acc: "",
      sta_psw: "",
      list: true,
    };
  },
  methods: {
    isValidEmail(email) {
      // 电子邮件地址的正则表达式
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
    addStaffInfo() {
      if (this.sta_email.trim() === "" || !this.isValidEmail(this.sta_email)) {
        alert("請輸入信箱或檢查信箱格式");
      } else if (this.sta_acc == "") {
        alert("請輸入信箱");
      } else if (this.sta_psw == "") {
        alert("請輸入密碼");
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append("sta_pos", this.sta_pos);
        bodyFormData.append("sta_email", this.sta_email);
        bodyFormData.append("sta_acc", this.sta_acc);
        bodyFormData.append("sta_psw", this.sta_psw);
        apiInstance({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/staffAdd.php`,
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData,
        })
          .then((res) => {
            console.log(res);
            if (res && res.data && res.data.msg === "success") {
              alert("新增成功");
              this.list = !this.list;
              this.$emit("closeList");
              location.reload();
            } else {
              alert("新增失敗");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    listClose() {
      location.reload();
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base/font";
.sta_add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 73.64vw;
  height: 80vh;
  background-color: #f5efeb;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  z-index: 10;
  h2 {
    margin-top: 3vw;
    text-align: center;
    font-size: 30px;
    font-family: $font;
    font-weight: 500;
    line-height: 150%;
  }
  .staInputArea {
    width: 60.82vw;
    margin: 3vw auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;

    .staInput {
      display: flex;
      width: 38%;
      align-items: center;

      label {
        display: block;
        width: 15%;
        font-size: $pcFontH4;
        font-family: $font;
        font-weight: 500;
        line-height: 150%;
      }
      input {
        width: 85%;
        height: 2vw;
        font-size: $pcFontH4;
        font-family: $font;
        font-weight: 500;
        line-height: 150%;
      }
    }
  }
  .staAdd_btn {
    width: 280px;
    margin: 3vw auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
