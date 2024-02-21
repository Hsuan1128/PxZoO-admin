<template>
    <div class="confirm_bg">
        <div class="confirm">
            <div class="confirm_content">
                <p class="pcInnerText">題目資訊有變更，是否儲存</p>
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
                type: FormData,
                default: () => (new FormData())
            },
        },
        data() {
            return {
                
            };
        },
        methods: {
            updataConfirmSwitch(){
                //控制修改確認彈窗的顯示/隱藏
                this.$emit('update-switch', !this.ConfirmSwitch)
            },
            transferData(){
                console.log(this.confirmData)
                //引入修改的PHP
                axios.post(`${import.meta.env.VITE_API_URL}/questionRevise.php`, this.confirmData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    
                })
                
                .then((res) => {
                    console.log(res)
                    console.log('修改已送出');
                    //關閉修改確認的彈窗
                    this.updataConfirmSwitch()
                    //關閉修改的彈窗
                    this.$emit('trigger-update-revise-switch')
                    //重新整理頁面讓資料更新成更改後的
                    window.location.reload();
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