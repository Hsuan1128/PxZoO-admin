<template>
    <div class="confirm_bg">
        <div class="confirm">
            <div class="confirm_content">
                <p class="pcInnerText">門票資訊有變更，是否儲存</p>
                <div class="confirm_btns">
                    <button class="defaultBtn pcInnerText" @click="transferData">
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
import axios from 'axios';
    export default {
        props:{
            ConfirmSwitch:false,
            confirmData: {
                type: Object,
                default: () => ({})
            },
        },
        data() {
            return {
                
            };
        },
        methods: {
            updataConfirmSwitch(){
                this.$emit('update-switch', !this.ConfirmSwitch)
            },transferData(){
                axios.post(`${import.meta.env.VITE_API_URL}/ticketsRevise.php`, this.confirmData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    this.updataConfirmSwitch()
                    window.location.reload();
                    this.$emit('trigger-update-revise-switch')
                })
                .catch(error => {
                    console.error('更新錯誤:', error);
                });
            },
        },
        components: {
        },
    };
</script>