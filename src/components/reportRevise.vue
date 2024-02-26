<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯檢舉留言內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">檢舉類別</label>
                    <input type="text"  class="revise_text" v-model="rowdata.report_type" :placeholder="rowdata.report_type" readonly>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">檢舉原因</label>
                    <textarea class="Revise_textarea" v-model="rowdata.report_text" :placeholder="rowdata.report_text" readonly></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">被檢舉留言編號</label>
                    <input type="text"  class="revise_text" v-model="rowdata.com_id" :placeholder="rowdata.com_id" readonly>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">被檢舉留言內容</label>
                    <textarea class="Revise_textarea" v-model="rowdata.com_text" :placeholder="rowdata.com_text" readonly></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">被檢舉留言圖片</label>
                    <img class="Revise_img" :src="getCommUrl(rowdata.com_pic)" alt="comment"/>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">處理狀態</label>
                    <select name="reportstatus" id="report-status" v-model="rowdata.report_status" :placeholder="rowdata.report_status">
                        <option value="未審核">未審核</option>
                        <option value="審核通過">審核通過</option>
                        <option value="審核未通過">審核未通過</option>
                    </select>
                </div>
            </div>

            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="transferData">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>

                <button class="defaultBtn pcInnerText" @click="reportRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>

        </div>
        <reportConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"
            :confirm-data="confirmData" @trigger-update-revise-switch="updateReviseSwitch" />
    </div>
</template>

<script>

import reportConfirm from "@/components/reportConfirm.vue";
import axios from 'axios';

export default {
    props: {
        ReviseSwitch: {
            type: Boolean,
            default: false
        },
        rowdata: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data() {
        return {
            hasChanges: false,
            report_type: this.rowdata.report_type,
            report_text:  this.rowdata.report_text,
            com_id: this.rowdata.com_id,
            com_text:  this.rowdata.com_text,
            com_pic:  this.rowdata.com_pic,
            report_status:  this.rowdata.report_status,
            ConfirmSwitch: false,
            confirmData: new FormData(),
            };
            
        },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },

        prepareConfirmData() {
            let formData = new FormData();
            for (let key in this.rowdata) {
                console.log(key, this.rowdata)
                formData.append(key, this.rowdata[key]);
            }
            //把資料傳送到reportConfirm的組件
            this.confirmData = formData
            console.log(this.confirmData)
        },

        transferData() {
            if (this.rowdata.report_type !== this.report_type ||
                this.rowdata.report_text !== this.report_text ||
                this.rowdata.com_id !== this.com_id ||
                this.rowdata.com_text !== this.com_text ||
                this.rowdata.com_pic !== this.com_pic ||
                this.rowdata.report_status !== this.report_status) {
                this.prepareConfirmData();
                axios.post(`${import.meta.env.VITE_API_URL}/reportRevises.php`, this.confirmData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then((res) => {
                    console.log(res);
                    console.log('修改已送出');
                    this.$emit('trigger-update-revise-switch');
                    window.location.reload();
                })
                .catch(error => {
                    console.error('更新錯誤:', error);
                });
            } else {
                // 如果没有修改，直接关闭修改表单
                this.updateReviseSwitch();
            }
        },

        reportRevise() {
            if (this.rowdata.report_type !== this.report_type ||
                this.rowdata.report_text !== this.report_text ||
                this.rowdata.com_id !== this.com_id ||
                this.rowdata.com_text !== this.com_text ||
                this.rowdata.com_pic !== this.com_pic ||
                this.rowdata.report_status !== this.report_status) {
                this.ConfirmSwitch = true;
                console.log('Has changes:', this.hasChanges);
                this.prepareConfirmData();
            } else {
                this.updateReviseSwitch();
                this.$emit('trigger-update-revise-switch');
            }
        },

        //留言圖片
        getCommUrl(image) {
        return new URL(
            `${import.meta.env.VITE_IMAGES_BASE_URL}/comm/`+image,
            import.meta.url
        ).href;
        }, //改網址
    },
    components: {
        reportConfirm,
    },
};
</script>

<style lang="scss">
.Revise_bg {
    width: 100%;
    height: 100%;
    background-color: #000000dc;
    position: absolute;
    z-index: 21;

    .Revise {
        overflow: auto;
        width: 73.64vw;
        height: 45vw;
        background-color: #f5efeb;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        h1 {
            margin-top: 2vw;
            text-align: center;
            color: #11A729;
        }
        .pcInnerText{
            color: #3F3F3F;
        }
        .Revise_content {
            width: 60.82vw;
            margin: 3vw auto 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5vw;

            .Revise_content_align {
                display: flex;
                width: 100%;

                label {
                    // margin-right: 20px;
                    display: block;
                    width: 25%;
                }

                input {
                    width: 75%;
                    height: 2vw;
                    padding-inline: 8px;
                    border: none;
                }

                input[type="file"] {
                    display: none;
                }

                .revise_text{
                    padding: 0.5vw 0.5vw;
                    background-color: #fff;
                    border: 2px #3F3F3F solid;
                    width: 100%;
                    height: 2.5vw;
                    outline: none;
                    vertical-align: top;
                    border-radius: 0;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    &::placeholder{
                    color: #CCC;
                    }
                }


                .Revise_textarea {
                    padding: 0.5vw 0.5vw;
                    background-color: #fff;
                    border: 2px #3F3F3F solid;
                    width: 100%;
                    height: 10vw;
                    outline: none;
                    vertical-align: top;
                    border-radius: 0;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    resize: none;
                    &::placeholder{
                        color: #CCC;
                    }
                }

                .Revise_img{
                    width: 20vw;
                }

                select{
                    padding: 0.5vw 0.5vw;
                    background-color: #fff;
                    border: 2px #3F3F3F solid;
                    width: 100%;
                    height: 2.5vw;
                    outline: none;
                    vertical-align: top;
                    border-radius: 0;
                    resize: none;
                    &::placeholder{
                    color: #CCC;
                    }
                }
            }
        }

        .Revise_btns {
            width: 280px;
            margin: 3vw auto;
            display: flex;
            justify-content: space-between;
        }
    }
}</style>

