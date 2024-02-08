<template>
    <div class="questionupdate">
      <h1>修改題庫內容</h1>
      <div class="questionupdate_content">
        <div class="questionupdate_content_align">
          <label class="pcInnerText">NO: {{ formData.question_id }}</label>
        </div>
        <div class="questionupdate_content_align">
          <label for="question_text" class="pcInnerText">題目內容</label>
          <input type="text" id="question_text"  v-model="formData.question_text">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_option_a" class="pcInnerText">選項A</label>
          <input type="text" id="question_option_a"   v-model="formData.question_option_a">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_img_a" class="pcInnerText">圖片A</label>
          <input type="file" id="question_img_a" placeholder="請上傳圖片" @change="handleFileChange('question_img_a', $event)">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_option_b" class="pcInnerText">選項B</label>
          <input type="text" id="question_option_b"  v-model="formData.question_option_b">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_img_b" class="pcInnerText">圖片B</label>
          <input type="file" id="question_img_b" placeholder="請上傳圖片"  @change="handleFileChange('question_img_b', $event)">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_option_c" class="pcInnerText">選項C</label>
          <input type="text" id="question_option_c"  v-model="formData.question_option_c">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_img_c" class="pcInnerText">圖片C</label>
          <input type="file" id="question_img_c" placeholder="請上傳圖片"  @change="handleFileChange('question_img_c', $event)">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_option_d" class="pcInnerText">選項D</label>
          <input type="text" id="question_option_d"  v-model="formData.question_option_d">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_img_d" class="pcInnerText">圖片D</label>
          <input type="file" id="question_img_d" placeholder="請上傳圖片"  @change="handleFileChange('question_img_d', $event)">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_correctanswer" class="pcInnerText">正確答案</label>
          <input type="text" id="question_correctanswer"  v-model="formData.question_correctanswer">
        </div>
        <div class="questionupdate_content_align">
          <label for="question_answer_illustrate" class="pcInnerText">解析</label>
          <textarea id="question_answer_illustrate" class="questionupdate_textarea"  v-model="formData.question_answer_illustrate"></textarea>
        </div>
      </div>
      
      <div class="questionupdate_btns">
        <button class="defaultBtn pcInnerText" @click="saveQuestion" >
          儲存
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
        <button class="defaultBtn pcInnerText" @click="updateupdateSwitch">
          返回列表
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
        question_id: Number,
    updateSwitch: {
      type: Boolean,
      default: false
    },
    questionData: {
      type: Object,
      required: true
    },
    reviseSwitch: {
      type: Boolean,
      default: false
    }},
    data() {
      return {
        formData: {
          // 表單數據
          question_id: '', 
          question_text: '',
          question_option_a: '',
          question_img_a: null,
          question_option_b: '',
          question_img_b: null,
          question_option_c: '',
          question_img_c: null,
          question_option_d: '',
          question_img_d: null,
          question_correctanswer: '',
          question_answer_illustrate: '',
        }
      };
    },
    created() {
    // 在組件加載時，將表單的 formData 設置為 questionData 提供的數據
    this.formData = { ...this.questionData };
  },
    methods: {
      // 更新開關狀態
      updateupdateSwitch() {
        this.$emit('update-switch', !this.updateSwitch);
      },
      handleFileChange(field, event) {
        // 當文件選擇時觸發，將文件對象存儲到 formData 中
        this.formData[field] = event.target.files[0];
      },
      // 提交表單數據
      saveQuestion() {
        // 使用 FormData 來處理文件上傳
        let formData = new FormData();
        for (let key in this.formData) {
          formData.append(key, this.formData[key]);
        }
        // 向後端發送修改的請求
        axios.post('http://localhost/pxzoo/questionupdate.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 指定文件上傳格式
          },
        })
        .then(response => {
          console.log(response.data);
          // 提交成功後的處理
          this.updateupdateSwitch(); // 觸發關閉表單的方法
        })
        .catch(error => {
          console.error('Error:', error);
          // 提交失敗時的處理
        });
      }
    },
  };
  </script>
  
  <style lang="scss">
  .questionupdate {
    overflow: auto;
    width: 73.64vw;
    height: 90vh;
    background-color: #f5efeb;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%,-50%);
    z-index: 10;
    h1 {
      margin-top: 3vw;
      text-align: center;
    }
    .questionupdate_content {
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2vw;
      .questionupdate_content_align {
        display: flex;
        width: 100%;
        label {
          margin-right: 20px;
          display: block;
          width: 15%;
        }
        input, textarea {
          width: 85%;
          height: 2vw; /* 請根據實際需求調整 */
        }
        .questionupdate_textarea {
          height: 10vw; /* 請根據實際需求調整 */
        }
      }
    }
    .questionupdate_btns {
      width: 280px;
      margin: 3vw auto;
      display: flex;
      justify-content: space-between;
    }
  }
  </style>
  