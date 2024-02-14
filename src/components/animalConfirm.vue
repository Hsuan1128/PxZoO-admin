<template>
    <div class="confirm_bg">
        <div class="confirm">
            <div class="confirm_content">
                <p class="pcInnerText">動物資訊有變更，是否儲存</p>
                <div class="confirm_btns">
                    <button class="defaultBtn pcInnerText">
                        儲存
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                    </button>
                    <button class="defaultBtn pcInnerText" @click="updataConfirmSwitch">
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
            ConfirmSwitch:false
            
        },
        data() {
            return {
                
            };
        },
        methods: {
            updataConfirmSwitch(){
                this.$emit('update-switch', !this.ConfirmSwitch)
                console.log(ConfirmSwitch);
            }
        },
        components: {
        },
    };
</script>