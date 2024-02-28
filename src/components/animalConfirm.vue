<template>
    <div class="confirm_bg">
        <div class="confirm" id="animal">
            <div class="confirm_content">
                <p class="pcInnerText">動物資訊尚未儲存，是否繼續編輯</p>
                <div class="confirm_btns">
                    <button class="defaultBtn pcInnerText" @click="closeConfirmSwitch">
                        繼續編輯
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                    </button>
                    <button class="defaultBtn pcInnerText" @click="updataConfirmSwitch">
                        返回列表
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
    props: {
        ConfirmSwitch: false,
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
        updataConfirmSwitch() {
            this.$emit('update-switch', !this.ConfirmSwitch)
            // console.log(this.ConfirmSwitch);
            this.$emit('trigger-update-revise-switch')
            //重新整理頁面讓資料更新成更改後的
            location.reload();
        },
        closeConfirmSwitch() {
            //控制修改確認彈窗的顯示/隱藏
            this.$emit('update-switch', !this.ConfirmSwitch)
        },
    },
    components: {
    },
};
</script>