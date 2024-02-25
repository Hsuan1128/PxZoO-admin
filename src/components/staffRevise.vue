<template>
  <div class="Revise_bg">
    <div class="Revise">
      <h1>編輯後台人員</h1>
      <div class="Revise_content">
        <div class="Revise_content_align">
          <label for="ticketsName" class="pcInnerText">信箱</label>
          <input v-model="sta_email" type="text" />
        </div>

        <div class="Revise_content_align">
          <label for="ticketsPrice" class="pcInnerText">帳號</label>
          <input v-model="sta_acc" type="text" />
        </div>

        <div class="Revise_content_align">
          <label for="ticketsRule" class="pcInnerText">密碼</label>
          <input v-model="sta_psw" class="Revise_textarea" />
        </div>
      </div>

      <div class="Revise_btns">
        <button class="defaultBtn pcInnerText" @click="transferData">
          儲存
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>

        <button class="defaultBtn pcInnerText" @click="staffRevise">
          返回列表
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
      </div>
    </div>
    <staffConfirm
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
import axios from "axios";
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
  watch: {
    // 監聽 rowdata 屬性的變化
    rowdata: {
      deep: true, // 使用 deep: true 來監聽 rowdata 對象內部屬性的變化
      handler(newVal) {
        // newVal 是變化後的 rowdata 的值
        // 檢查 newVal 是否為真（即 rowdata 是否存在）
        if (newVal) {
          // 將 rowdata 對象中的特定屬性賦值給 data 中的對應屬性
          this.sta_email = newVal.sta_email;
          this.sta_acc = newVal.sta_acc;
          this.sta_psw = newVal.sta_psw;
        }
      },
    },
  },
  methods: {
    updateReviseSwitch() {
      //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
      this.$emit("update-switch", !this.ReviseSwitch);
    },
    prepareConfirmData() {
      this.confirmData = {
        sta_email: this.sta_email,
        sta_acc: this.sta_acc,
        sta_psw: this.sta_psw,
        sta_id: this.rowdata.sta_id,
      };
    },
    test() {
      location.reload();
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
    transferData() {
      //判斷輸入資料的情況做出對應的行為
      if (
        this.rowdata.sta_email != this.sta_email ||
        this.rowdata.sta_acc != this.sta_acc ||
        this.rowdata.sta_psw != this.sta_psw
      ) {
        //傳遞更新的資料到ConfirmData物件裡
        this.prepareConfirmData();
        //引入修改的PHP
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/staffRevise.php`,
            this.confirmData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            //關閉修改的彈窗
            this.updateReviseSwitch();
            location.reload();
          })
          .catch((error) => {
            console.error("更新錯誤:", error);
          });
      } else {
        this.updateReviseSwitch();
      }
    },
  },
  components: {
    staffConfirm,
  },
};
</script>
