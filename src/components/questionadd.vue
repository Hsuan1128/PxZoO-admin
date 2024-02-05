<template>
    <!-- 其他內容 -->
  
    <!-- 新增表單的彈窗 -->
    <div v-if="showAddFormDialog" class="add-form-dialog">
      <!-- 彈窗內容 -->
      <h3>新增問題</h3>
      <input type="text" v-model="newQuestionText" placeholder="輸入問題內容" />
      <!-- 其他表單欄位 -->
      <button @click="addQuestion">確定新增</button>
      <button @click="hideAddFormDialog">取消</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 新增表單的彈窗顯示狀態
        showAddFormDialog: false,
        // 新增問題的相關資訊
        newQuestionText: "",
        // 其他表單欄位的資料
      };
    },
    methods: {
      // 顯示彈窗
      questionadd() {
        this.showAddFormDialog = true;
      },
      // 隱藏彈窗
      hideAddFormDialog() {
        this.showAddFormDialog = false;
      },
      // 新增問題
      addQuestion() {
        // 處理新增問題的邏輯
        console.log("新增問題", this.newQuestionText);
        // 清空表單欄位
        this.newQuestionText = "";
        // 隱藏彈窗
        this.hideAddFormDialog();
      },
      // 其他方法
    },
  };
  </script>
  
  <style>
  /* 可以添加彈窗的樣式 */
  .add-form-dialog {
    /* 彈窗的樣式設定 */
  }
  </style>