<template>
  <div class="questionadd">
      <h1>新增題庫</h1>
      <div class="questionadd_content">
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">題目內容
              </label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.question_text">
          </div>

          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項A</label>
              <input type="text" placeholder="請輸入敘述文字"  v-model="formData.question_option_a">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">圖片A</label>
              <input type="file" placeholder="請上傳圖片" @change="handleFileChange('question_img_a', $event)">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項B</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.question_option_b">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">圖片B</label>
              <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('question_img_b', $event)">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項C</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.question_option_c">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">圖片C</label>
              <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('question_img_c', $event)">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項D</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.question_option_d">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">圖片D</label>
              <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('question_img_d', $event)">
          </div>
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">正確答案</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.question_correctanswer">
          </div>
          

          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">解析</label>
              <textarea class="questionadd_textarea" placeholder="請輸入答案解析" v-model="formData. question_answer_illustrate"></textarea>
          </div>
      </div>
      
      <div class="questionadd_btns">
          <button class="defaultBtn pcInnerText" @click="saveQuestion" >
              儲存
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
  
          <button class="defaultBtn pcInnerText" @click="updateaddSwitch">
              返回列表
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'; // 引入 axios 库
export default {
  props:{
      addSwitch:false,
  },
  data() {
  return {
    formData: {
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
  methods: {
      // 更新开关状态
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
    },
    handleFileChange(field, event) {
      // 當文件選擇時觸發，將文件對象存儲到 formData 中
      this.formData[field] = event.target.files[0];
    },
    // 提交表单数据
    saveQuestion() {
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      axios.post(`${import.meta.env.VITE_API_URL}/questionAdd.php`, formData, 
      
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 指定文件上傳格式
        },
      })
        .then(response => {
          const confirmed = window.confirm("確定要新增資料嗎?");
          if (!response.data.error && confirmed) {
          console.log(response.data);
          // 提交成功後的處理
          this.updateaddSwitch(); // 觸發關閉表單的方法
          window.location.reload(); // 重新整理頁面
          }
          
        })
        .catch(error => {
          console.error('Error:', error);
          // 提交失敗時的處理
        });
    }
  },
  components: {
  },
};
</script>

<style lang="scss">
.questionadd{
  overflow: auto;
  width: 73.64vw;
  height: 90vh;
  background-color: #f5efeb;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%,-50%);
  z-index: 10;
  h1{
      margin-top: 3vw;
      text-align: center;
  }
  .questionadd_content{
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2vw;
   
      .questionadd_content_align{
          display: flex;
          width: 100%;
          label{
              margin-right: 20px;
              display: block;
              width: 15%;
          }
          input{
              width: 85%;
              height: 2vw;
          }
          .questionadd_textarea{
              width: 85%;
              height: 10vw;
          }
      }
  }
  .questionadd_btns{
      width: 280px;
      margin: 3vw auto;
      display: flex;
      justify-content: space-between;
  }
}
</style>