<template>
     <div class="Revise_bg">
    <div class="Revise">
        <h1>編輯題庫內容</h1>
        <div class="Revise_content">
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">題目內容</label>
                <input type="text" v-model="rowdata.question_text" :placeholder="question_text">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項A</label>
                <input type="text" v-model="rowdata.question_option_a" :placeholder="question_option_a">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片A</label>
                <input type="file" id="question_img_a"  :placeholder="question_img_a" @change="handleFileChange('question_img_a', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項B</label>
                <input type="text" v-model="rowdata.question_option_b" :placeholder="question_option_b">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片B</label>
                <input type="file" id="question_img_b" :placeholder="rowdata.question_img_b" @change="handleFileChange('question_img_b', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項C</label>
                <input type="text" v-model="rowdata.question_option_c" :placeholder="question_option_c">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片C</label>
                <input type="file" id="question_img_c" :placeholder="rowdata.question_option_c" @change="handleFileChange('question_img_c', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項D</label>
                <input type="text" v-model="rowdata.question_option_d" :placeholder="question_option_d">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片D</label>
                <input type="file" id="question_img_d" :placeholder="rowdata.question_option_d" @change="handleFileChange('question_img_d', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">正確答案</label>
                <input type="text" v-model="rowdata.question_correctanswer" :placeholder="question_correctanswer">
            </div>


            <div class="Revise_content_align">
                <label for="" class="pcInnerText">解析</label>
                <textarea class="Revise_textarea" v-model="rowdata.question_answer_illustrate" :placeholder="question_answer_illustrate"></textarea>
            </div>
        </div>

        <div class="Revise_btns">
            <button class="defaultBtn pcInnerText" @click="questionRevise">
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>

            <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </div>
        
    </div>
    <Confirm_question v-show="ConfirmSwitch" 
        :ConfirmSwitch="ConfirmSwitch" 
        @update-switch="ConfirmSwitch = $event" 
        :confirm-data="confirmData"
        @trigger-update-revise-switch="updateReviseSwitch"/>
    </div>
</template>
  
<script>

import Confirm_question from "@/components/confirm_question.vue";

export default {
    props: {
        ReviseSwitch: false,
        rowdata: {
            type: Object,
            required: true,
           
        }
    },
    data() {
        return {

            ConfirmSwitch: false,
            
            confirmData: {
            question_text: '',
            question_option_a: '',
            question_img_a: ''  ,
            question_option_b: '',
            question_img_b: '',
            question_option_c: '',
            question_img_c: '',
            question_option_d: '',
            question_img_d: '',
            question_correctanswer: '',
            question_answer_illustrate: '',
            question_id: this.rowdata.question_id,
        } ,
            uploadImagePlaceholder: '請上傳圖片',
        };
    },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        handleFileChange(field, event) {
    const file = event.target.files[0];
    // 將文件資料保存到對應的 rowdata 屬性中
    // 如果要保存檔案對象，您可以使用下面的代碼
    // this.rowdata[field] = file;

    // 如果您只需要保存檔案名稱，請使用下面的代碼
    this.rowdata[field] = file.name;

    // 顯示上傳的文件名（或其他信息）
    console.log(`${field} uploaded: ${file.name}`);
},
        prepareConfirmData() {
            //把資料傳送到ticketsConfirm的組件
            this.confirmData = {
                question_text: this.rowdata.question_text,
                question_option_a: this.rowdata.question_option_a,
                question_img_a: this.rowdata.question_img_a,
                question_option_b: this.rowdata.question_option_b,
                question_img_b: this.rowdata.question_img_b,
                question_option_c: this.rowdata.question_option_c,
                question_img_c: this.rowdata.question_img_c,
                question_option_d: this.rowdata.question_option_d,
                question_img_d: this.rowdata.question_img_d,
                question_correctanswer: this.rowdata.question_correctanswer,
                question_answer_illustrate: this.rowdata.question_answer_illustrate,
                question_id: this.rowdata.question_id,
            };
        },
        questionRevise(){
            //判斷輸入資料的情況做出對應的行為
            // if (this.question_text && 
            //     this.question_option_a && 
            //     this.question_img_a &&
            //     this.question_option_b &&
            //     this.question_img_b &&
            //     this.question_option_c &&
            //     this.question_img_c &&
            //     this.question_option_d &&
            //     this.question_img_d &&
            //     this.question_correctanswer &&
            //     this.question_answer_illustrate ) {
                if (this.rowdata.question_text != this.question_text || 
                    this.rowdata.question_option_a != this.question_option_a || 
                    this.rowdata.question_img_a != this.question_img_a || 
                    this.rowdata.question_option_b != this.question_option_b || 
                    this.rowdata.question_img_b != this.question_img_b || 
                    this.rowdata.question_option_c != this.question_option_c || 
                    this.rowdata.question_img_c != this.question_img_c || 
                    this.rowdata.question_option_d != this.question_option_d || 
                    this.rowdata.question_img_d != this.question_img_d || 
                    this.rowdata.question_correctanswer != this.question_correctanswer || 
                    this.rowdata.question_answer_illustrate != this.question_answer_illustrate
                    ) {
                    this.ConfirmSwitch = !this.ConfirmSwitch;
                    this.prepareConfirmData()
                } else {
                    this.updateReviseSwitch();
                }
            // } else {
            //     alert("請填寫所有欄位");
            // }
        }
    },
    components: {
    Confirm_question,
},
};
</script>
  
<style lang="scss">
.Revise_bg{
  width: 100%;
  height: 100%;
  background-color: #000000dc;
  position: absolute;
  z-index: 21;

  .Revise{
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
      }
      .Revise_content{
          width: 60.82vw;
          margin: 3vw auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5vw;
          .Revise_content_align{
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
                  padding-inline: 8px;
                  border: none;
              }
              .Revise_textarea{
                  width: 85%;
                  height: 10vw;
                  resize: none;
                  padding-inline: 8px;
                  border: none;
              }
          }
      }
      .Revise_btns{
          width: 280px;
          margin: 14.5vw auto 0;
          display: flex;
          justify-content: space-between;
      }
  }
}</style>
  