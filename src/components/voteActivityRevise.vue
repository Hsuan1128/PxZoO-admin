<template>
     <div class="Revise_bg">
    <div class="Revise">
        <h1>編輯投票活動</h1>
        <div class="Revise_content">
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">活動名稱</label>
                <input type="text" v-model="rowdata.vote_activity_name" :placeholder="vote_activity_name">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">內容</label>
                <textarea type="text" v-model="rowdata.vote_activity_content" :placeholder="vote_activity_content"  class="Revise_textarea" ></textarea>
            </div>
          
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">年月</label>
                <input type="month" v-model="rowdata.vote_activity_date" :placeholder="vote_activity_date">
            </div>
            
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">第一名動物</label>
                <input type="text" v-model="rowdata.animal_id_1" :placeholder="animal_id_1">
            </div>
           
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">第二名動物</label>
                <input type="text" v-model="rowdata.animal_id_2" :placeholder="animal_id_2">
            </div>
            
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">第三名動物</label>
                <input type="text" v-model="rowdata.animal_id_3" :placeholder="animal_id_3">
            </div>


        </div>

        <div class="Revise_btns">
            <button class="defaultBtn pcInnerText" @click="voteActivityRevise">
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>

            <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </div>
        
    </div>
    <VoteActivityConfirm v-show="ConfirmSwitch" 
        :ConfirmSwitch="ConfirmSwitch" 
        @update-switch="ConfirmSwitch = $event" 
        :confirm-data="confirmData"
        @trigger-update-revise-switch="updateReviseSwitch"/>
    </div>
</template>
  
<script>

import VoteActivityConfirm from "./voteActivityConfirm.vue";

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
            vote_activity_name: '',
            vote_activity_content: '',
            vote_activity_date: ''  ,
            animal_id_1: '',
            animal_id_2: '',
            animal_id_3: '',
            vote_activity_id: this.rowdata.vote_activity_id,
        } ,
            
        };
    },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        prepareConfirmData() {
            //把資料傳送到ticketsConfirm的組件
            this.confirmData = {
                vote_activity_name: this.rowdata.vote_activity_name,
                vote_activity_content: this.rowdata.vote_activity_content,
                vote_activity_date: this.rowdata.vote_activity_date,
                animal_id_1: this.rowdata.animal_id_1,
                animal_id_2: this.rowdata.animal_id_2,
                animal_id_3: this.rowdata.animal_id_3,
                vote_activity_id: this.rowdata.vote_activity_id,
            };
        },
        voteActivityRevise(){
            //判斷輸入資料的情況做出對應的行為
            // if (this.vote_activity_name && 
            //     this.vote_activity_content && 
            //     this.vote_activity_date &&
            //     this.animal_id_1 &&
            //     this.animal_id_2 &&
            //     this.animal_id_3 &&
            //     ) {
                if (this.rowdata.vote_activity_name != this.vote_activity_name || 
                    this.rowdata.vote_activity_content != this.vote_activity_content || 
                    this.rowdata.vote_activity_date != this.vote_activity_date || 
                    this.rowdata.animal_id_1 != this.animal_id_1 || 
                    this.rowdata.animal_id_2 != this.animal_id_2 || 
                    this.rowdata.animal_id_3 != this.animal_id_3 
                   
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
    VoteActivityConfirm,
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
          color: #11A729;
        }
        .pcInnerText{
            color: #3F3F3F;
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
          margin: 3vw auto;
          display: flex;
          justify-content: space-between;
      }
  }
}</style>
  