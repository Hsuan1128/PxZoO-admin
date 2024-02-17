<template>
  <div class="Revise_bg">
    <div class="Revise">
      <h1>編輯後台人員</h1>
      <div class="Revise_content">
        <div class="Revise_content_align">
          <label for="ticketsName" class="pcInnerText">信箱</label>
          <input
            v-model="sta_email"
            type="text"
            :placeholder="rowdata.sta_email"
          />
        </div>

        <div class="Revise_content_align">
          <label for="ticketsPrice" class="pcInnerText">帳號</label>
          <input v-model="sta_acc" type="text" :placeholder="rowdata.sta_acc" />
        </div>

        <div class="Revise_content_align">
          <label for="ticketsRule" class="pcInnerText">密碼</label>
          <input
            v-model="sta_psw"
            class="Revise_textarea"
            :placeholder="rowdata.sta_psw"
          />
        </div>
      </div>

      <div class="Revise_btns">
        <button class="defaultBtn pcInnerText" @click="staffRevise">
          儲存
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>

        <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
          返回列表
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
      </div>
    </div>
    <ticketsConfirm
      v-show="ConfirmSwitch"
      :ConfirmSwitch="ConfirmSwitch"
      @update-switch="ConfirmSwitch = $event"
      :confirm-data="confirmData"
      @trigger-update-revise-switch="updateReviseSwitch"
    />
  </div>
</template>

<script>
import staffConfirm from "@/components/staffConfirm.vue";

export default {
  props: {
    ReviseSwitch: false,
    rowdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ConfirmSwitch: false,
      sta_email: "",
      sta_acc: "",
      sta_psw: "",
      confirmData: {},
    };
  },
  methods: {
    updateReviseSwitch() {
      //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
      this.$emit("update-switch", !this.ReviseSwitch);
    },
    prepareConfirmData() {
      //把資料傳送到ticketsConfirm的組件
      this.confirmData = {
        staEmail: this.sta_email,
        staAcc: this.sta_acc,
        staPsw: this.sta_psw,
      };
    },
    staffRevise() {
      //判斷輸入資料的情況做出對應的行為
      if (this.sta_email && this.sta_acc && this.sta_psw) {
        if (
          this.rowdata.sta_email != this.sta_email ||
          this.rowdata.sta_acc != this.sta_acc ||
          this.rowdata.sta_psw != this.sta_psw
        ) {
          this.ConfirmSwitch = !this.ConfirmSwitch;
          this.prepareConfirmData();
        } else {
          this.updateReviseSwitch();
        }
      } else {
        alert("請填寫所有欄位");
      }
    },
  },
  components: {
    staffConfirm,
  },
};
</script>
