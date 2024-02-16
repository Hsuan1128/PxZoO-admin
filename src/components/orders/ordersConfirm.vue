<template>
    <div class="confirm_bg">
        <div class="confirm">
            <div class="confirm_content">
                <p class="pcInnerText">訂單資訊有變更，是否儲存</p>
                <div class="confirm_btns">
                    <button class="defaultBtn pcInnerText" @click="confirmSave">
                        儲存
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                    </button>
                    <button class="defaultBtn pcInnerText" @click="resetAlterStatus">
                        取消
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
        },
        data() {
            return {
                
            };
        },
        methods: {
            confirmSave(){
                this.$emit('confirmSave');
            },
            resetAlterStatus(){
                this.$emit('newAlterStatus');
            },
        },
        components: {
        },
    };
</script>