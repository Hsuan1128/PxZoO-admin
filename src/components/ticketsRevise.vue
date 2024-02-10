<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯門票內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="ticketsName" class="pcInnerText">門票名稱</label>
                    <input v-model="editedTicketsName" type="text" :placeholder="rowdata.tickets_name">
                </div>
    
                <div class="Revise_content_align">
                    <label for="ticketsPrice" class="pcInnerText">門票價錢</label>
                    <input v-model="editedTicketsPrice" type="text" :placeholder="rowdata.tickets_price">
                </div>
    
                <div class="Revise_content_align">
                    <label for="ticketsRule" class="pcInnerText">門票使用規則</label>
                    <textarea v-model="editedTicketsRule" class="Revise_textarea" :placeholder="rowdata.tickets_rule" maxlength="10"></textarea>
                </div>
            </div>
            
            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="ticketsRevise">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>
        <ticketsConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event" :confirm-data="confirmData"/>
    </div>
</template>

<script>
import ticketsConfirm from "@/components/ticketsConfirm.vue"

export default {
    props:{
        ReviseSwitch:false,
        rowdata: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            ConfirmSwitch:false,
            editedTicketsName: '',
            editedTicketsPrice: '',
            editedTicketsRule: ''
        };
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        prepareConfirmData() {
            this.confirmData = {
                ticketsName: this.editedTicketsName,
                ticketsPrice: this.editedTicketsPrice,
                ticketsRule: this.editedTicketsRule,
                ticketsID: this.rowdata.tickets_id
            };
        },
        ticketsRevise(){
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
        }
    },
    components: {
        ticketsConfirm,
    },
};
</script>