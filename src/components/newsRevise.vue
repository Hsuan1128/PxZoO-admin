<template>
    <div class="Revise_bg">
    <div class="Revise">
        <h1>編輯消息內容</h1>
        <div class="Revise_content">
            <div class="Revise_content_align">
                <label for="" class="pcInnerText">消息標題</label>
                <input type="text" v-model="rowdata.news_title" :placeholder="news_title">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">消息分類</label>
                <select name="newstype" id="news-select" v-model="news_type">
                    <option value="">{{rowdata.news_type}}</option>
                    <option value="最新活動">最新活動</option>
                    <option value="園區動態">園區動態</option>
                    <option value="動物知識">動物知識</option>
                </select>
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">分類圖片</label>
                <input type="file" id="news_typepic"  placeholder="請上傳圖片" @change="handleFileChange('news_typepic', $event)">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">消息日期</label>
                <input type="date" v-model="rowdata.news_date" :placeholder="news_date">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">消息圖片</label>
                <input type="file" id="news_pic" :placeholder="news_pic" @change="handleFileChange('news_pic', $event)">
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">描述1</label>
                <textarea class="Revise_textarea" v-model="rowdata.news_text_1" :placeholder="news_text_1"></textarea>
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">描述2</label>
                <textarea class="Revise_textarea" v-model="rowdata.news_text_2" :placeholder="news_text_2"></textarea>
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">描述3</label>
                <textarea class="Revise_textarea" v-model="rowdata.news_text_3" :placeholder="news_text_3"></textarea>
            </div>

            <div class="Revise_content_align">
                <label for="" class="pcInnerText">描述4</label>
                <textarea class="Revise_textarea" v-model="rowdata.news_text_4" :placeholder="news_text_4"></textarea>
            </div>
        </div>

        <div class="Revise_btns">
            <button class="defaultBtn pcInnerText" @click="newsRevise">
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>

            <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </div>
        
    </div>
    <newsConfirm v-show="ConfirmSwitch" 
        :ConfirmSwitch="ConfirmSwitch" 
        @update-switch="ConfirmSwitch = $event" 
        :confirm-data="confirmData"
        @trigger-update-revise-switch="updateReviseSwitch"/>
    </div>
</template>

<script>

import newsConfirm from "@/components/newsConfirm.vue";

export default {
    props: {
        ReviseSwitch: false,
        rowdata: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            news_title: '',
            news_type: '',
            news_typepic: ''  ,
            news_date: '',
            news_pic: '',
            news_text_1: '',
            news_text_2: '',
            news_text_3: '',
            news_text_4: '',

            ConfirmSwitch: false,

            confirmData: {
                news_title: '',
                news_type: '',
                news_typepic: ''  ,
                news_date: '',
                news_pic: '',
                news_text_1: '',
                news_text_2: '',
                news_text_3: '',
                news_text_4: '',
                news_id: this.rowdata.news_id,
            } ,
            uploadImagePlaceholder: '請上傳圖片',
        };
    },
    methods: {
        updateReviseSwitch() {
            //從這個組件傳送控制修改彈窗的顯示/隱藏參數數值
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        handleFileChange(field, event) {
            const file = event.target.files[0];
            
            // 將文件資料保存到對應的 rowdata 屬性中
            // 如果要保存檔案對象，您可以使用下面的代碼
            // this.rowdata[field] = file;

            // 如果您只需要保存檔案名稱，請使用下面的代碼
            this.rowdata[field] = file.name;

            // 顯示上傳的文件名（或其他信息）
            console.log(`${field} uploaded: ${file.name}`);
        },
        prepareConfirmData() {
            //把資料傳送到newsConfirm的組件
            this.confirmData = {
                news_title: this.rowdata.news_title,
                news_type: this.rowdata.news_type,
                news_typepic: this.rowdata.news_typepic,
                news_date: this.rowdata.news_date,
                news_pic: this.rowdata.news_pic,
                news_text_1: this.rowdata.news_text_1,
                news_text_2: this.rowdata.news_text_2,
                news_text_3: this.rowdata.news_text_3,
                news_text_4: this.rowdata.news_text_4,
                news_id: this.rowdata.news_id,
            };
        },
        newsRevise(){
            //判斷輸入資料的情況做出對應的行為
            // if (this.news_title && 
            //     this.news_type && 
            //     this.news_typepic &&
            //     this.news_date &&
            //     this.news_pic &&
            //     this.news_text_1 &&
            //     this.news_text_2 &&
            //     this.news_text_3 &&
            //     this.news_text_4 ) {
                if (this.rowdata.news_title != this.news_title || 
                    this.rowdata.news_type != this.news_type || 
                    this.rowdata.news_typepic != this.news_typepic || 
                    this.rowdata.news_date != this.news_date || 
                    this.rowdata.news_pic != this.news_pic || 
                    this.rowdata.news_text_1 != this.news_text_1 || 
                    this.rowdata.news_text_2 != this.news_text_2 || 
                    this.rowdata.news_text_3 != this.news_text_3 || 
                    this.rowdata.news_text_4 != this.news_text_4
                    ) {
                    this.ConfirmSwitch = !this.ConfirmSwitch;
                    this.prepareConfirmData()
                } else {
                    this.updateReviseSwitch();
                }
            // } else {
            //     alert("請填寫所有欄位");
            // }
        }
    },
    components: {
        newsConfirm,
    },
};
</script>

<style lang="scss">
.Revise_bg{
    width: 100%;
    height: 100%;
    background-color: #000000dc;
    position: absolute;
    z-index: 21;

    .Revise{
        overflow: auto;
        width: 73.64vw;
        height: 45vw;
        background-color: #f5efeb;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
        h1{
            margin-top: 2vw;
            text-align: center;
        }
        .Revise_content{
            width: 60.82vw;
            margin: 3vw auto 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5vw;
            .Revise_content_align{
                display: flex;
                width: 100%;
                label{
                    margin-right: 20px;
                    display: block;
                    width: 15%;
                }
                input{
                    width: 85%;
                    height: 2vw;
                    padding-inline: 8px;
                    border: none;
                }
                .Revise_textarea{
                    width: 85%;
                    height: 10vw;
                    resize: none;
                    padding-inline: 8px;
                    border: none;
                }
            }
        }
        .Revise_btns{
            width: 280px;
            margin: 14.5vw auto 0;
            display: flex;
            justify-content: space-between;
        }
    }
}</style>

