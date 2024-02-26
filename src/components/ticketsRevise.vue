<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯門票內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="ticketsName" class="pcInnerText">門票名稱</label>
                    <input v-model="editedTicketsName" type="text" style="border: 2px #3F3F3F solid;">
                </div>
    
                <div class="Revise_content_align">
                    <label for="ticketsPrice" class="pcInnerText">門票價錢</label>
                    <input v-model="editedTicketsPrice" type="text" style="border: 2px #3F3F3F solid;">
                </div>
    
                <div class="Revise_content_align">
                    <label for="ticketsRule" class="pcInnerText">門票使用規則</label>
                    <textarea style="width: 85%" v-model="editedTicketsRule" class="Revise_textarea" maxlength="10"></textarea>
                </div>
            </div>
            
            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="transferData">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="ticketsRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>
        <ticketsConfirm v-show="ConfirmSwitch" 
        :ConfirmSwitch="ConfirmSwitch" 
        @update-switch="ConfirmSwitch = $event" 
        :confirm-data="confirmData"
        @trigger-update-revise-switch="updateReviseSwitch"/>
    </div>
</template>

<script>
import ticketsConfirm from "@/components/ticketsConfirm.vue"
import axios from "axios";

export default {
    props:{
        ReviseSwitch:false,
        //把rowdata引入到父組件裡使用這個參數
        rowdata: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            ConfirmSwitch:false,
            //建立v-model的參數,才能綁定到input上
            editedTicketsName: '',
            editedTicketsPrice: '',
            editedTicketsRule: '',
            confirmData:{},
        };
    },
    watch: {
        // 監聽 rowdata 屬性的變化
        rowdata: {
            deep: true, // 使用 deep: true 來監聽 rowdata 對象內部屬性的變化
            handler(newVal) { // newVal 是變化後的 rowdata 的值
                // 檢查 newVal 是否為真（即 rowdata 是否存在）
                if (newVal) {
                    // 將 rowdata 對象中的特定屬性賦值給 data 中的對應屬性
                    this.editedTicketsName = newVal.tickets_name; // 更新 editedTicketsName
                    this.editedTicketsPrice = newVal.tickets_price; // 更新 editedTicketsPrice
                    this.editedTicketsRule = newVal.tickets_rule; // 更新 editedTicketsRule
                }
            }
        },
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        prepareConfirmData() {
            //把資料傳送到ticketsConfirm的組件
            this.confirmData = {
                ticketsName: this.editedTicketsName,
                ticketsPrice: this.editedTicketsPrice,
                ticketsRule: this.editedTicketsRule,
                ticketsID: this.rowdata.tickets_id
            };
        },
        ticketsRevise(){
            //判斷輸入資料的情況做出對應的行為
            if (this.editedTicketsName && this.editedTicketsPrice && this.editedTicketsRule) {
                if (this.rowdata.tickets_name != this.editedTicketsName || 
                    this.rowdata.tickets_price != this.editedTicketsPrice || 
                    this.rowdata.tickets_rule != this.editedTicketsRule) {
                    this.ConfirmSwitch = !this.ConfirmSwitch;
                    this.prepareConfirmData()
                } else {
                    this.updateReviseSwitch();
                }
            } else {
                alert("請填寫所有欄位");
            }
        },transferData(){
            //判斷輸入資料的情況做出對應的行為
            if (this.rowdata.tickets_name != this.editedTicketsName || 
                this.rowdata.tickets_price != this.editedTicketsPrice || 
                this.rowdata.tickets_rule != this.editedTicketsRule) {
                //傳遞更新的資料到ConfirmData物件裡
                this.prepareConfirmData()
                //引入修改的PHP
                axios.post(`${import.meta.env.VITE_API_URL}/ticketsRevise.php`, this.confirmData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    //關閉修改的彈窗
                    this.updateReviseSwitch()
                    location.reload();  
                })
                .catch(error => {
                    console.error('更新錯誤:', error);
                });
            } else {
                this.updateReviseSwitch();
            }
        },
    },
    components: {
        ticketsConfirm,
    },
};
</script>