<template>
    <div class="confirm_bg">
        <div class="confirm">
            <div class="confirm_content">
                <p class="pcInnerText">門票資訊尚未儲存，是否返回編輯</p>
                <div class="confirm_btns">
                    <button class="defaultBtn pcInnerText" @click="BackToConfirm">
                        繼續編輯
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                    </button>
                    <button class="defaultBtn pcInnerText" @click="BackToList">
                        回到列表
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                    </button>
                </div>
            </div>
            <div class="confirm_img">
                <img src="@/assets/images/confirm/confirm_border.svg" alt="修改確認視窗邊框">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            ConfirmSwitch:false,
            confirmData: {
                type: Object,
            },
        },
        data() {
            return {
                
            };
        },
        methods: {
            BackToList(){
                //控制修改確認彈窗的顯示/隱藏
                this.$emit('update-switch', !this.ConfirmSwitch)
                this.$emit('trigger-update-revise-switch')
            },
            BackToConfirm(){
                this.$emit('update-switch', !this.ConfirmSwitch)
            }
        },
        components: {
        },
    };
</script>