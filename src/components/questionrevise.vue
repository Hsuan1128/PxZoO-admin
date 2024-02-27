<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯題庫內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">題目內容</label>
                    <input type="text" v-model="rowdata.question_text" :placeholder="question_text">
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">選項A</label>
                    <input type="text" v-model="rowdata.question_option_a" :placeholder="question_option_a">
                </div>
                <!-- <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片A</label>
                <input type="file" id="question_img_a"  :placeholder="question_img_a" @change="handleFileChange('question_img_a', $event)">
            </div> -->

                <div class="Revise_content_align revise_img">
                    <label for="" class="pcInnerText">圖片A</label>
                    <label class="pcInnerText revise_imgtext ">
                        <span v-if="file_a">{{ file_a }}</span>
                        <span v-else>{{ rowdata.question_img_a }}</span>
                        <div class="iconBtn pcInnerText">
                            <p class="iconText">
                                <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon" />
                                選擇檔案
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>
                        <input type="file" id="question_img_a" name="news_pic" accept="image/png, image/jpeg"
                            @change="handleFileChange('question_img_a', $event, 'question_img_a')">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">選項B</label>
                    <input type="
                text" v-model="rowdata.question_option_b" :placeholder="question_option_b">
                </div>

                <!-- <div class="Revise_content_align">
                <label for="" class="pcInnerText">圖片B</label>
                <input type="file" id="question_img_b" :placeholder="rowdata.question_img_b" @change="handleFileChange('question_img_b', $event)">
            </div> -->
                  <div class="Revise_content_align revise_img">
                    <label for="" class="pcInnerText">圖片B</label>
                    <label class="pcInnerText revise_imgtext ">
                        <span v-if="file_b">{{ file_b }}</span>
                        <span v-else>{{ rowdata.question_img_b }}</span>
                        <div class="iconBtn pcInnerText">
                            <p class="iconText">
                                <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon" />
                                選擇檔案
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>
                        <input type="file" id="question_img_b" name="news_pic" accept="image/png, image/jpeg"
                            @change="handleFileChange('question_img_b', $event, 'question_img_b')">
                    </label>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">選項C</label>
                    <input type="text" v-model="rowdata.question_option_c" :placeholder="question_option_c">
                </div>
                <div class="Revise_content_align revise_img">
                    <label for="" class="pcInnerText">圖片C</label>
                    <label class="pcInnerText revise_imgtext ">
                        <span v-if="file_c">{{ file_c }}</span>
                        <span v-else>{{ rowdata.question_img_c }}</span>
                        <div class="iconBtn pcInnerText">
                            <p class="iconText">
                                <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon" />
                                選擇檔案
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>
                        <input type="file" id="question_img_c" name="news_pic" accept="image/png, image/jpeg"
                            @change="handleFileChange('question_img_c', $event, 'question_img_c')">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">選項D</label>
                    <input type="text" v-model="rowdata.question_option_d" :placeholder="question_option_d">
                </div>
                <div class="Revise_content_align revise_img">
                    <label for="" class="pcInnerText">圖片A</label>
                    <label class="pcInnerText revise_imgtext ">
                        <span v-if="file_d">{{ file_d }}</span>
                        <span v-else>{{ rowdata.question_img_d }}</span>
                        <div class="iconBtn pcInnerText">
                            <p class="iconText">
                                <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon" />
                                選擇檔案
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>
                        <input type="file" id="question_img_d" name="news_pic" accept="image/png, image/jpeg"
                            @change="handleFileChange('question_img_d', $event, 'question_img_d')">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">正確答案</label>
                    <input type="text" v-model="rowdata.question_correctanswer" :placeholder="question_correctanswer">
                </div>


                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">解析</label>
                    <textarea class="Revise_textarea" v-model="rowdata.question_answer_illustrate"
                        :placeholder="question_answer_illustrate"></textarea>
                </div>
            </div>

            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="transferData">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>

                <button class="defaultBtn pcInnerText" @click="questionRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>

        </div>
        <Confirm_question v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"
            :confirm-data="confirmData" @trigger-update-revise-switch="updateReviseSwitch" />
    </div>
</template>
 
<script>
import axios from 'axios';
import Confirm_question from "@/components/confirm_question.vue";

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
            // isNewImage: {
            //     a: false,
            //     b: false,
            //     c: false,
            //     d: false,
            // },
            // 添加用於追蹤圖片是否已更改的變量
            // imageChanged: {
            //     a: false, // 初始化為 false，表示圖片尚未更改
            //     b: false,
            //     c: false,
            //     d: false,
            // },


            ConfirmSwitch: false,
            question_text: this.rowdata.question_text,
            question_option_a:this.rowdata.question_option_a,
            question_img_a: this.rowdata.question_img_a,
            question_option_b:this.rowdata.question_option_b,
            question_img_b:this.rowdata.question_img_b,
            question_option_c: this.rowdata.question_option_c,
            question_img_c:this.rowdata.question_img_c,
            question_option_d:this.rowdata.question_option_d,
            question_img_d:this.rowdata.question_img_d,
            question_correctanswer:this.rowdata.question_correctanswer,
            question_answer_illustrate:this.rowdata.question_answer_illustrate,
            confirmData: new FormData(),
            uploadImagePlaceholder: '請上傳圖片',

        };
    },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        handleFileChange(field, event,fileType) {
            const file = event.target.files[0];
            // 將文件資料保存到對應的 rowdata 屬性中
        

            // 如果您只需要保存檔案名稱，請使用下面的代碼
            this.rowdata[field] = file;
            
         // 根據文件類型更新相應的文件名
         if (fileType === 'question_img_a') {
                this.file_a = this.rowdata[field].name;
                console.log(this.file_a);
            } else if (fileType === 'question_img_b') {
                this.file_b = this.rowdata[field].name;
                console.log(this.file_b);
            }else if (fileType === 'question_img_c') {
                this.file_c = this.rowdata[field].name;
                console.log(this.file_c);
            }else if (fileType === 'question_img_d') {
                this.file_d = this.rowdata[field].name;
                console.log(this.file_d);
            }
        },

        prepareConfirmData() {
            let formData = new FormData();
            for (let key in this.rowdata) {
                console.log(key, this.rowdata)
                formData.append(key, this.rowdata[key]);
            }
            //把資料傳送到newsConfirm的組件
            this.confirmData = formData
            // console.log(this.confirmData)
        },
        questionRevise() {

            if (this.rowdata.question_text != this.question_text ||
                this.rowdata.question_option_a != this.question_option_a ||
                this.rowdata.question_img_a != this.question_img_a ||
                this.rowdata.question_option_b != this.question_option_b ||
                this.rowdata.question_img_b != this.question_img_b ||
                this.rowdata.question_option_c != this.question_option_c ||
                this.rowdata.question_img_c != this.question_img_c ||
                this.rowdata.question_option_d != this.question_option_d ||
                this.rowdata.question_img_d != this.question_img_d ||
                this.rowdata.question_correctanswer != this.question_correctanswer ||
                this.rowdata.question_answer_illustrate != this.question_answer_illustrate
            ) {
                this.ConfirmSwitch = !this.ConfirmSwitch;

                this.prepareConfirmData()

            } else {
                this.updateReviseSwitch();
                this.$emit('trigger-update-revise-switch');
                // window.location.reload();
            }
        },
        transferData() {
            //判斷輸入資料的情況做出對應的行為
            // if (this.question_text && 
            //     this.question_option_a && 
            //     this.question_img_a &&
            //     this.question_option_b &&
            //     this.question_img_b &&
            //     this.question_option_c &&
            //     this.question_img_c &&
            //     this.question_option_d &&
            //     this.question_img_d &&
            //     this.question_correctanswer &&
            //     this.question_answer_illustrate ) {
            if (this.rowdata.question_text != this.question_text ||
                this.rowdata.question_option_a != this.question_option_a ||
                this.rowdata.question_img_a != this.question_img_a ||
                this.rowdata.question_option_b != this.question_option_b ||
                this.rowdata.question_img_b != this.question_img_b ||
                this.rowdata.question_option_c != this.question_option_c ||
                this.rowdata.question_img_c != this.question_img_c ||
                this.rowdata.question_option_d != this.question_option_d ||
                this.rowdata.question_img_d != this.question_img_d ||
                this.rowdata.question_correctanswer != this.question_correctanswer ||
                this.rowdata.question_answer_illustrate != this.question_answer_illustrate
            ) {
                // this.ConfirmSwitch = !this.ConfirmSwitch;
                this.prepareConfirmData()

                axios.post(`${import.meta.env.VITE_API_URL}/questionRevise.php`, this.confirmData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then((res) => {
                        console.log(res)
                        console.log('修改已送出');
                        //關閉修改的彈窗
                        this.$emit('trigger-update-revise-switch')
                        //重新整理頁面讓資料更新成更改後的
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('更新錯誤:', error);
                    });
            } else {
                this.updateReviseSwitch();
            }
            // } else {
            //     alert("請填寫所有欄位");
            // }
        }
    },
    components: {
        Confirm_question,
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

        .pcInnerText {
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
                    width: 15%;
                }

                input {
                    width: 85%;
                    height: 3vw;
                    padding-inline: 8px;
                    border: none;
                }

                input[type="file"] {
                    display: none;
                }

                p {
                    width: 85%;
                    height: 2vw;
                    padding-inline: 8px;
                    border: none;
                }

                .revise_text {
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

                    &::placeholder {
                        color: #CCC;
                    }
                }

                .revise_imgtext {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    .iconBtn {
                        width: 140px;
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

                    &::placeholder {
                        color: #CCC;
                    }
                }

                select {
                    padding: 0.5vw 0.5vw;
                    background-color: #fff;
                    border: 2px #3F3F3F solid;
                    width: 100%;
                    height: 2.5vw;
                    outline: none;
                    vertical-align: top;
                    border-radius: 0;
                    resize: none;

                    &::placeholder {
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
  