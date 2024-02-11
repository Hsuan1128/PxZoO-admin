<template>
     <div class="Revise_bg">
    <div class="Revise">
        <h1>修改題庫內容</h1>
        <div class="Revise_content">
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">題目內容</label>
                <input type="text" id="question_text" :placeholder="rowdata.question_text">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項A</label>
                <input type="text" id="question_option_a"  :placeholder="rowdata.question_option_a">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片A</label>
                <input type="file" id="question_img_a"  placeholder="請上傳圖片" @change="handleFileChange('question_img_a', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項B</label>
                <input type="text" id="question_option_b" :placeholder="rowdata.question_option_b">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片B</label>
                <input type="file" id="question_img_b" :placeholder="請上傳圖片" @change="handleFileChange('question_img_b', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項C</label>
                <input type="text" id="question_option_c" :placeholder="rowdata.question_option_c">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片C</label>
                <input type="file" id="question_img_c" :placeholder="請上傳圖片" @change="handleFileChange('question_img_c', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">選項D</label>
                <input type="text" id="question_option_d" :placeholder="rowdata.question_option_d">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片D</label>
                <input type="file" id="question_img_d" :placeholder="請上傳圖片" @change="handleFileChange('question_img_d', $event)">
            </div>
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">正確答案</label>
                <input type="text" id="question_correctanswer" :placeholder="rowdata.question_correctanswer">
            </div>


            <div class="Revise_content_align">
                <label for="" class="pcInnerText">解析</label>
                <textarea class="Revise_textarea" id="question_answer_illustrate" :placeholder="rowdata.question_answer_illustrate"></textarea>
            </div>
        </div>

        <div class="Revise_btns">
            <button class="defaultBtn pcInnerText" @click="ConfirmSwitch =!ConfirmSwitch ">
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>

            <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </div>
        <confirm_question v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"/>
    </div></div>
</template>
  
<script>

import confirm_question from "@/components/confirm_question.vue"

export default {
    props: {
        ReviseSwitch: false,
        rowdata: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            ConfirmSwitch: false
        };
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        updateConfirmSwitch(newValue) {
            this.ConfirmSwitch = newValue;
            this.$emit('change', this.ConfirmSwitch);
        },
    },
    components: {
        confirm_question,
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
  