<template>
  <div class="question_bg">
  <div class="questionadd">
      <h1>新增題庫</h1>
      <div class="questionadd_content">
          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">題目內容
              </label>
              <input type="text" class="questionadd_text" placeholder="請輸入題目內容" v-model="formData.question_text">
          </div>

          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項A</label>
              <input type="text"  class="questionadd_text"  placeholder="請輸入選項"  v-model="formData.question_option_a">
          </div>


          <div class="questionadd_content_align questionadd_img">
              <label class="pcInnerText">圖片A</label>

              <label class="pcInnerText questionadd_imgtext ">
              <span v-if="fileName_a">{{ fileName_a }}</span>
              <span v-else>請選擇檔案</span>   
              <div class="iconBtn pcInnerText">
                <p class="iconText">
                  <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                  選擇檔案
                </p>
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
              </div>
              <input type="file" id="question_pic" name="question_pic"  placeholder="請上傳圖片" @change="handleFileChange('question_img_a', $event,'question_img_a')">
              </label>
          </div>





          <div class="questionadd_content_align ">
              <label for="" class="pcInnerText">選項B</label>
              <input  class="questionadd_text"  type="text" placeholder="請輸入選項" v-model="formData.question_option_b">
          </div>


          <div class="questionadd_content_align questionadd_img">
              <label class="pcInnerText">圖片B</label>

              <label class="pcInnerText questionadd_imgtext ">
              <span v-if="fileName_b">{{ fileName_b }}</span>
              <span v-else>請選擇檔案</span>   
              <div class="iconBtn pcInnerText">
                <p class="iconText">
                  <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                  選擇檔案
                </p>
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
              </div>
              <input type="file" id="question_pic" name="question_pic"  placeholder="請上傳圖片" @change="handleFileChange('question_img_b', $event,'question_img_b')">
              </label>
          </div>



          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項C</label>
              <input  class="questionadd_text"  type="text" placeholder="請輸入選項" v-model="formData.question_option_c">
          </div>



          <div class="questionadd_content_align questionadd_img">
              <label class="pcInnerText">圖片C</label>

              <label class="pcInnerText questionadd_imgtext ">
              <span v-if="fileName_c">{{ fileName_c }}</span>
              <span v-else>請選擇檔案</span>   
              <div class="iconBtn pcInnerText">
                <p class="iconText">
                  <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                  選擇檔案
                </p>
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
              </div>
              <input type="file" id="question_pic" name="question_pic"  placeholder="請上傳圖片" @change="handleFileChange('question_img_c', $event,'question_img_c')">
              </label>
          </div>



          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">選項D</label>
              <input  class="questionadd_text"  type="text" placeholder="請輸入選項" v-model="formData.question_option_d">
          </div>


          <div class="questionadd_content_align questionadd_img">
              <label class="pcInnerText">圖片D</label>

              <label class="pcInnerText questionadd_imgtext ">
              <span v-if="fileName_d">{{ fileName_d }}</span>
              <span v-else>請選擇檔案</span>   
              <div class="iconBtn pcInnerText">
                <p class="iconText">
                  <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                  選擇檔案
                </p>
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
              </div>
              <input  class="questionadd_text"  type="file" id="question_pic" name="question_pic"  placeholder="請上傳圖片" @change="handleFileChange('question_img_d', $event,'question_img_d')">
              </label>
          </div>


          <div class="questionadd_content_align">
              <label for="" class="pcInnerText">正確答案</label>
              <input  class="questionadd_text"  type="text" placeholder="請輸入答案" v-model="formData.question_correctanswer">
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
  </div></div>
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
        question_img_a: '',
        question_option_b: '',
        question_img_b: '',
        question_option_c: '',
        question_img_c: '',
        question_option_d: '',
        question_img_d: '',
        question_correctanswer: '',
        question_answer_illustrate: '',
       
      },
      fileName_a:'',
      fileName_b:'',
      fileName_c:'',
      fileName_d:'',
  };
  },
  methods: {
        // 更新開關狀態
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
    },
    handleFileChange(field, event,fileType) {
      // 當文件選擇時觸發，將文件對象存儲到 formData 中
      this.formData[field] = event.target.files[0];

       // 根據文件類型更新相應的文件名
       if (fileType === 'question_img_a') {
        this.fileName_a = this.formData[field].name;
        console.log(this.fileName_a);
    } else if (fileType === 'question_img_b') {
        this.fileName_b = this.formData[field].name;
        console.log(this.fileName_b);
      } else if (fileType === 'question_img_c') {
        this.fileName_c = this.formData[field].name;
        console.log(this.fileName_c);
      } else if (fileType === 'question_img_d') {
        this.fileName_d = this.formData[field].name;
        console.log(this.fileName_d);
      }
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
         
          console.log(response.data);
          // 提交成功後的處理
          this.updateaddSwitch(); // 觸發關閉表單的方法
          window.location.reload(); // 重新整理頁面
        
          
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
.question_bg{
  width: 100%;
  height: 100%;
  background-color: #000000dc;
  position: absolute;
  z-index: 21;
}
.questionadd{
  overflow: auto;
  width: 73.64vw;
  height: 45vw;
  background-color: #f5efeb;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
  h1{
      margin-top: 2vw;
      text-align: center;
      color: #11A729;
  }
  .pcInnerText{
    color: #3F3F3F;
  }
  .questionadd_content{
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap:1.5vw;
   
      .questionadd_content_align{
          display: flex;
          width: 100%;
          label{
              // margin-right: 20px;
              display: block;
              width: 15%;
          }
          input{
              width: 85%;
              height: 2vw;
              padding-inline: 8px;
        border: none;
          }
          input[type="file"] {
        display: none;
      }
      .questionadd_text{
        padding: 0.5vw 0.5vw;
        background-color: #fff;
        border: 2px #3F3F3F solid;
        width: 100%;
        height: 2.5vw;
        outline: none;
        vertical-align: top;
        border-radius: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        &::placeholder{
          color: #CCC;
        }      
      }

      .questionadd_imgtext{
        display: flex;
        justify-content: space-between;
        width: 100%;
        .iconBtn{
          width: 140px;
        }
      }   
          .questionadd_textarea{
            padding: 0.5vw 0.5vw;
        background-color: #fff;
        border: 2px #3F3F3F solid;
        width: 100%;
        height: 10vw;
        outline: none;
        vertical-align: top;
        border-radius: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        resize: none;
        &::placeholder{
          color: #CCC;
        }
          }

          select{
        padding: 0.5vw 0.5vw;
        background-color: #fff;
        border: 2px #3F3F3F solid;
        width: 100%;
        height: 2.5vw;
        outline: none;
        vertical-align: top;
        border-radius: 0;
        resize: none;
        &::placeholder{
          color: #CCC;
        }
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