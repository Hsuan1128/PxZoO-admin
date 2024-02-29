<template>
  <div class="confirm_bg">
    <div class="confirm">
      <div class="confirm_content">
        <p class="pcInnerText">訂單資訊有變更，是否繼續編輯</p>
        <div class="confirm_btns">
          <button class="defaultBtn pcInnerText" @click="keepEdit">
            編輯
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="btn_decoration" />
          </button>
          <button class="defaultBtn pcInnerText" @click="resetAlterStatus">
            返回列表
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="btn_decoration" />
          </button>
        </div>
      </div>
      <div class="confirm_img">
        <img src="@/assets/images/confirm/confirm_border.svg" alt="修改確認視窗邊框">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    keepEdit() {
      this.$emit('keepEdit');
    },
    resetAlterStatus() {
      this.$emit('newAlterStatus');
    },
  },
};
</script>