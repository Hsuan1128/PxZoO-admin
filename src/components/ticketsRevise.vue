<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯門票內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">門票名稱</label>
                    <input type="text" placeholder="學生票">
                </div>
    
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">門票價錢</label>
                    <input type="text" placeholder="40">
                </div>
    
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">門票使用規則</label>
                    <textarea class="Revise_textarea" placeholder="12歲以上持有學生票可使用"></textarea>
                </div>
            </div>
            
            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="ConfirmSwitch = !ConfirmSwitch">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>
        <ticketsConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"/>
    </div>
</template>

<script>
import ticketsConfirm from "@/components/ticketsConfirm.vue"

export default {
    props:{
        ReviseSwitch:false,
    },
    data() {
        return {
            ConfirmSwitch:false  
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
        ticketsConfirm,
    },
};
</script>