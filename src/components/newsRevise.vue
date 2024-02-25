<template>
    <div class="Revise_bg">
        <div class="Revise">
            <h1>編輯消息內容</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">消息標題</label>
                    <input type="text"  class="revise_text" v-model="rowdata.news_title" :placeholder="rowdata.news_title">
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">消息分類</label>
                    <select name="newstype" id="news-select" v-model="rowdata.news_type" :placeholder="rowdata.news_type">
                        <!-- <option value="">{{ rowdata.news_type }}</option> -->
                        <option value="最新活動">最新活動</option>
                        <option value="園區動態">園區動態</option>
                        <option value="動物知識">動物知識</option>
                    </select>
                </div>

                <div class="Revise_content_align">
                    <label class="pcInnerText">
                        分類圖片  
                    </label>
                    <label class="pcInnerText revise_imgtext ">
                    <span v-if="typefileName">{{ typefileName }}</span>
                    <span v-else>{{rowdata.news_typepic}}</span>   
                    <div class="iconBtn pcInnerText">
                        <p class="iconText">
                        <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                        選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                    </div>
                    <input type="file" id="typepic" name="typepic" accept="image/png, image/jpeg" @change="handleFileChange('news_typepic', $event, 'news_typepic')"/>
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">消息日期</label>
                    <input type="date" class="revise_text"  v-model="rowdata.news_date" :placeholder="rowdata.news_date">
                </div>

                <div class="Revise_content_align revise_img">
                    <label class="pcInnerText">
                    消息圖片 
                    </label>
                    <label class="pcInnerText revise_imgtext ">
                    <span v-if="fileName">{{ fileName }}</span>
                    <span v-else>{{rowdata.news_pic}}</span>   
                    <div class="iconBtn pcInnerText">
                        <p class="iconText">
                        <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                        選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                    </div>
                    <input type="file" id="news_pic" name="news_pic" accept="image/png, image/jpeg" @change="handleFileChange('news_pic', $event, 'news_pic')"/>
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">描述1</label>
                    <textarea class="Revise_textarea" v-model="rowdata.news_text_1" :placeholder="rowdata.news_text_1"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">描述2</label>
                    <textarea class="Revise_textarea" v-model="rowdata.news_text_2" :placeholder="rowdata.news_text_2"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">描述3</label>
                    <textarea class="Revise_textarea" v-model="rowdata.news_text_3" :placeholder="rowdata.news_text_3"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">描述4</label>
                    <textarea class="Revise_textarea" v-model="rowdata.news_text_4" :placeholder="rowdata.news_text_4"></textarea>
                </div>
            </div>

            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="transferData">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>

                <button class="defaultBtn pcInnerText" @click="newsRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>

        </div>
        <newsConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"
            :confirm-data="confirmData" @trigger-update-revise-switch="updateReviseSwitch" />
    </div>
</template>

<script>

import newsConfirm from "@/components/newsConfirm.vue";
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
            // news_title: '',
            // news_type: '',
            // news_typepic:  '',
            // news_date:  '',
            // news_pic:  '',
            // news_text_1:  '',
            // news_text_2:  '',
            // news_text_3:  '',
            // news_text_4:  '',

            hasChanges: false,
            news_title: this.rowdata.news_title,
            news_type: this.rowdata.news_type,
            news_typepic:  this.rowdata.news_typepic,
            news_date:  this.rowdata.news_date,
            news_pic:  this.rowdata.news_pic,
            news_text_1:  this.rowdata.news_text_1,
            news_text_2:  this.rowdata.news_text_2,
            news_text_3:  this.rowdata.news_text_3,
            news_text_4:  this.rowdata.news_text_4,
            ConfirmSwitch: false,
            confirmData: new FormData(),
            uploadImagePlaceholder: '請上傳圖片',
            typefileName: '',
            fileName: '',
            };
            
        },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },

        // handleFileChange(field, event) {
        //     const file = event.target.files[0];

        //     // 將文件資料保存到對應的 rowdata 屬性中
        //     // 如果要保存檔案對象，您可以使用下面的代碼
        //     // this.rowdata[field] = file;

        //     // 如果您只需要保存檔案名稱，請使用下面的代碼
        //     this.rowdata[field] = file
        //     console.log(file)
        //     // 顯示上傳的文件名（或其他信息）
        //     console.log(`${field} uploaded: ${file.name}`);
        // },

        handleFileChange(field, event, fileType) {
            const file = event.target.files[0];
            this.rowdata[field] = file
            console.log(file)
            // // 當選擇文件時，將文件對象存儲到 formData 中的指定字段
            // this.formData[field] = event.target.files[0];
            
            // 根據文件類型更新相應的文件名
            if (fileType === 'news_typepic') {
                this.typefileName = this.rowdata[field].name;
                console.log(this.typefileName);
            } else if (fileType === 'news_pic') {
                this.fileName = this.rowdata[field].name;
                console.log(this.fileName);
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
            console.log(this.confirmData)
        },

        transferData() {
            if (this.rowdata.news_title !== this.news_title ||
                this.rowdata.news_type !== this.news_type ||
                this.rowdata.news_typepic !== this.news_typepic ||
                this.rowdata.news_date !== this.news_date ||
                this.rowdata.news_pic !== this.news_pic ||
                this.rowdata.news_text_1 !== this.news_text_1 ||
                this.rowdata.news_text_2 !== this.news_text_2 ||
                this.rowdata.news_text_3 !== this.news_text_3 ||
                this.rowdata.news_text_4 !== this.news_text_4) {
                this.prepareConfirmData();
                axios.post(`${import.meta.env.VITE_API_URL}/newsRevises.php`, this.confirmData, {
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

        newsRevise() {
            if (this.rowdata.news_title !== this.news_title ||
                this.rowdata.news_type !== this.news_type ||
                this.rowdata.news_typepic !== this.news_typepic ||
                this.rowdata.news_date !== this.news_date ||
                this.rowdata.news_pic !== this.news_pic ||
                this.rowdata.news_text_1 !== this.news_text_1 ||
                this.rowdata.news_text_2 !== this.news_text_2 ||
                this.rowdata.news_text_3 !== this.news_text_3 ||
                this.rowdata.news_text_4 !== this.news_text_4) {
                this.ConfirmSwitch = true;
                console.log('Has changes:', this.hasChanges);
                this.prepareConfirmData();
            } else {
                this.updateReviseSwitch();
                this.$emit('trigger-update-revise-switch');
            }
        }


    },
    components: {
        newsConfirm,
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
                    width: 15%;
                }

                input {
                    width: 85%;
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

                .revise_imgtext{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    .iconBtn{
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
                    &::placeholder{
                        color: #CCC;
                    }
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

