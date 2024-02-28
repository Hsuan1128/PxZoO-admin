<template>
    <div id="Revise_bg">
        <div class="Revise">
            <h1>編輯動物資訊</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="animal_species" class="pcInnerText">動物種類</label>
                    <input type="text" maxlength="10"
                    class="revise_text"  
                    v-model="editData.animalSpecies">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_name" 
                    class="pcInnerText">動物名稱</label>
                    <input type="text" maxlength="10"
                    class="revise_text"
                    v-model="editData.animalName">
                </div>

                <div class="Revise_content_align">
                    <label for="category_name" 
                    class="pcInnerText">館別名稱</label>
                    <select name="category_name" 
                    v-model="editData.categoryName">
                    <option v-for="category in categoriesName">{{category}}</option>
                    </select> 
                </div>

                <div class="Revise_content_align">
                    <label for="location_name" class="pcInnerText">館別位置</label>
                    <select name="location_name" 
                    v-model="editData.locationName">
                    <option :value="rowdata.location_name">目前位置：{{ rowdata.location_name }}</option>
                    <option v-for="location in selectlocation">{{location.location_name}}</option>
                    </select> 
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_enterdate" class="pcInnerText" >入園時間</label>
                    <input type="date"  
                    class="pcInnerText revise_text"
                    v-model="rowdata.animal_enterdate">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_lifespan" class="pcInnerText">平均壽命</label>
                    <textarea class="Revise_textarea" 
                    maxlength="100" rows="7" 
                    v-model="editData.animalLifespan"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_area" class="pcInnerText">分布地區</label>
                    <textarea class="Revise_textarea" 
                    maxlength="100" rows="7"  
                    v-model="editData.animalArea"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_food" 
                    class="pcInnerText">食性</label>
                    <textarea class="Revise_textarea" 
                    maxlength="150" rows="9" v-model="editData.animalFood"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_features" class="pcInnerText">特徵</label>
                    <textarea class="Revise_textarea" 
                    maxlength="150" rows="9" 
                    v-model="editData.animalFeatures"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_description" class="pcInnerText">介紹</label>
                    <textarea class="Revise_textarea" v-model="editData.animalDescription"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_a" 
                    class="pcInnerText">圖片A</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNamea">{{ fileNamea }}</span>
                        <span v-else>{{ editFiles.animal_pic_a }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_pic_a"
                        name="animal_pic_a"
                        accept="image/png, image/jpeg" 
                        
                        @change="handleFileChange('animal_pic_a', $event)">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_b" 
                    class="pcInnerText">圖片B</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNameb">{{ fileNameb }}</span>
                        <span v-else>{{ editFiles.animal_pic_b }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_pic_b"
                        name="animal_pic_b"
                        accept="image/png, image/jpeg" @change="handleFileChange('animal_pic_b', $event)">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_c" 
                    class="pcInnerText">圖片C</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNamec">{{ fileNamec }}</span>
                        <span v-else>{{ editFiles.animal_pic_c }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_pic_c"
                        name="animal_pic_c"
                        accept="image/png, image/jpeg" @change="handleFileChange('animal_pic_c', $event)">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_icon" 
                    class="pcInnerText">Icon</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNameIcon">{{ fileNameIcon }}</span>
                        <span v-else>{{ editFiles.animalIcon }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_icon"
                        name="animal_icon"
                        accept="image/png" @change="handleFileChange('animalIcon', $event)">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_sound" 
                    class="pcInnerText">動物聲音</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNameSound">{{ fileNameSound }}</span>
                        <span v-else>{{ editFiles.animalSound }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇音檔
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_sound"
                        name="animal_sound"
                        accept="audio/mp3" @change="handleFileChange('animalSound', $event)">
                    </label>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_small_pic" 
                    class="pcInnerText">列表圖</label>
                    <label class="pcInnerText revise_imgtext">
                        <span v-if="fileNameSmall">{{ fileNameSmall }}</span>
                        <span v-else>{{ editFiles.animal_small_pic }}</span>   
                        <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
                        </div>
                        <input type="file" id="animal_small_pic"
                        name="animal_small_pic"
                        accept="image/png, image/jpeg" @change="handleFileChange('animal_small_pic', $event)">
                    </label>
                </div>
            </div>
            
            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="transferData">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="animalRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>
        <animalConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch"
        @update-switch="ConfirmSwitch = $event" 
        :confirm-data="confirmData"
        @trigger-update-revise-switch="updateReviseSwitch"/>
    </div>
</template>

<script>
import animalConfirm from "@/components/animalConfirm.vue"
import {DatePicker} from "view-ui-plus";
import axios from "axios";

export default {
    props:{
        ReviseSwitch:false,
        rowdata: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            ConfirmSwitch:false,

            
            // 建立一個新的 FormData 對象
            confirmData: new FormData(),
            confirmFileData: new FormData(),
            //建立v-model的參數,才能綁定到input上
            editData:{
                animalId:'',
                animalSpecies: '',
                animalName: '',

                categoryName: '',
                locationName: '',
                animalEnterdate: '',

                animalLifespan: '',
                animalArea: '',
                animalFood: '',
                animalFeatures: '',
                animalDescription: '',
            },

            editFiles:{
                animalId:'',
                animal_pic_a: '',
                animal_pic_b: '',
                animal_pic_c: '',
                animalIcon: '',
                animalSound: '',
                animal_small_pic: '',
            },
            categoriesName: ["草原之聲","極地秘境","叢林奇蹟","鳥園樂章","海洋奇觀"],
            mysqlLocation: [],//儲存館別的值
            selectlocation:[],

            //顯示檔名
            fileNamea: '',
            fileNameb: '',
            fileNamec: '',
            fileNameIcon: '',
            fileNameSound: '',
            fileNameSmall: '',

        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/locationShow.php`)
        .then(response => {
        this.mysqlLocation = response.data; // 假設返回的數據是一個數組
        // console.log(this.mysqlLocation)
        })
        .catch(error => {
        // console.error("Error fetching data: ", error);
        });
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
            // console.log(this.ReviseSwitch)
        },

        prepareConfirmData() {

            // 將每個屬性添加到 FormData 對象中
            this.editData.animalId = this.rowdata.animal_id,
            this.editFiles.animalId = this.rowdata.animal_id
            // console.log( this.editFiles)
            
             // 建立一個新的 FormData 對象
            let formData = new FormData();
            let formFile = new FormData();

            for (let key in this.editData) {
                // console.log(key, this.editData)
                formData.append(key, this.editData[key]);
            }
            for (let key in this.editFiles) {
                formFile.append(key, this.editFiles[key]);
                // console.log(this.editFiles[key])
            }
            // 將 FormData 對象賦值給 confirmData
            this.confirmData = formData;
            this.confirmFileData = formFile

        },
        animalRevise(){
            //判斷輸入資料的情況做出對應的行為
            if(this.editData.animalName && this.editData.animalSpecies &&
            this.editData.categoryName && this.editData.locationName && this.editData.animalEnterdate &&
            this.editData.animalLifespan && this.editData.animalArea && this.editData.animalFood && this.editData.animalFeatures && this.editData.animalDescription &&
            this.editFiles.animal_pic_a && this.editFiles.animal_pic_b && this.editFiles.animal_pic_c &&
            this.editFiles.animalIcon && this.editFiles.animalSound && this.editFiles.animal_small_pic
            ){
                if ( this.rowdata.animal_name !== this.editData.animalName ||
                this.rowdata.animal_species !== this.editData.animalSpecies ||
                this.rowdata.category_name !== this.editData.categoryName ||
                this.rowdata.location_name !== this.editData.locationName ||
                this.rowdata.animal_enterdate !== this.editData.animalEnterdate ||
                this.rowdata.animal_lifespan !== this.editData.animalLifespan ||
                this.rowdata.animal_area !== this.editData.animalArea ||
                this.rowdata.animal_food !== this.editData.animalFood ||
                this.rowdata.animal_features !== this.editData.animalFeatures ||
                this.rowdata.animal_description !== this.editData.animalDescription ||
                this.rowdata.animal_pic_a !== this.editFiles.animal_pic_a ||
                this.rowdata.animal_pic_b !== this.editFiles.animal_pic_b ||
                this.rowdata.animal_pic_c !== this.editFiles.animal_pic_c ||
                this.rowdata.animal_icon !== this.editFiles.animalIcon ||
                this.rowdata.animal_sound !== this.editFiles.animalSound ||
                this.rowdata.animal_small_pic !== this.editFiles.animal_small_pic
                
                ) {
                    this.ConfirmSwitch = !this.ConfirmSwitch
                    this.prepareConfirmData();
                } else {
                    this.updateReviseSwitch();
                    this.$emit('trigger-update-revise-switch');
                }
            }else{
                alert("請填寫所有欄位");
            }
            
        },
        transferData(){
            //判斷輸入資料的情況做出對應的行為
            if (this.rowdata.animal_name != this.editData.animalName ||
                this.rowdata.animal_species != this.editData.animalSpecies || 
                this.rowdata.category_name != this.editData.categoryName ||
                this.rowdata.location_name != this.editData.locationName ||
                this.rowdata.animal_enterdate != this.editData.animalEnterdate ||
                this.rowdata.animal_lifespan != this.editData.animalLifespan ||
                this.rowdata.animal_area != this.editData.animalArea ||
                this.rowdata.animal_food != this.editData.animalFood ||
                this.rowdata.animal_features != this.editData.animalFeatures ||
                this.rowdata.animal_description != this.editData.animalDescription ||
                this.rowdata.pic_a != this.editFiles.animal_pic_a ||
                this.rowdata.pic_b != this.editFiles.animal_pic_b ||
                this.rowdata.pic_c != this.editFiles.animal_pic_c ||
                this.rowdata.animal_icon != this.editFiles.animalIcon ||
                this.rowdata.animal_sound != this.editFiles.animalSound ||
                this.rowdata.animal_small_pic != this.editFiles.animal_small_pic
                    ) {
                //傳遞更新的資料到ConfirmData物件裡
                this.prepareConfirmData()
                //引入修改的PHP
                axios.post(`${import.meta.env.VITE_API_URL}/animalRevise.php`, this.confirmData,{
                    headers: {
                        
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(() => {
                    // console.log(this.confirmData)
                    return axios.post(`${import.meta.env.VITE_API_URL}/animalRevisePic.php`, this.confirmFileData,{
                        headers: {                        
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                })
                .then(() => {
                    this.updateReviseSwitch();
                    this.$emit('trigger-update-revise-switch')
                    //重新整理頁面讓資料更新成更改後的
                    location.reload();
                })
                .catch(error => {
                    // console.error('更新錯誤:', error);
                });
            } else {
                this.updateReviseSwitch();
            }
        },

        handleFileChange(field, event) {
            // console.log(field, event)
            this.editFiles[field] = event.target.files[0]
            const file = this.editFiles[field];

              // 根據文件類型更新相應的文件名
            switch (field) {
                case 'animal_pic_a':
                    this.fileNamea = this.editFiles[field].name;
                    
                    break;
                case 'animal_pic_b':
                    this.fileNameb = this.editFiles[field].name;
                    break;
                case 'animal_pic_c':
                    this.fileNamec = this.editFiles[field].name;
                    break;
                case 'animalIcon':
                    this.fileNameIcon = this.editFiles[field].name;
                    break;
                case 'animalSound':
                    this.fileNameSound = this.editFiles[field].name;
                    break;
                case 'animal_small_pic':
                    this.fileNameSmall = this.editFiles[field].name;
                    break;
                default:
                    break;
    }
        },

        locationShow(){
            this.selectlocation = this.mysqlLocation.filter(item=>item.category_name === this.editData.categoryName)
            console.log(this.selectlocation);
        }
    },
    watch: {
        'rowdata.animal_enterdate': function(newVal) {
        this.editData.animalEnterdate = newVal;
        },
        //這裡主要作用是顯示所點選的資料並綁定在input上變成值
        rowdata: {
            deep: true, // 使用 deep: true 來監聽 rowdata 對象內部屬性的變化
            handler(newVal) { // newVal 是變化後的 rowdata 的值
                // 檢查 newVal 是否為真（即 rowdata 是否存在）
                if (newVal) {
                    // 將 rowdata 對象中的特定屬性賦值給 data 中的對應屬性
                    this.editData.animalSpecies = newVal.animal_species

                    this.editData.animalName = newVal.animal_name
                    this.editData.categoryName = newVal.category_name
                    // this.editData.locationName = newVal.location_name
                    this.editData.animalEnterdate = newVal.animal_enterdate
                    this.editData.animalLifespan = newVal.animal_lifespan
                    this.editData.animalArea = newVal.animal_area
                    this.editData.animalFood = newVal.animal_food
                    this.editData.animalFeatures = newVal.animal_features
                    this.editData.animalDescription = newVal.animal_description
                    

                    this.editFiles.animal_pic_a = newVal.animal_pic_a
                    this.editFiles.animal_pic_b = newVal.animal_pic_b
                    this.editFiles.animal_pic_c = newVal.animal_pic_c
                    
                    this.editFiles.animalIcon = newVal.animal_icon
                    this.editFiles.animalSound = newVal.animal_sound
                    this.editFiles.animal_small_pic = newVal.animal_small_pic
                }
            }
        },
        'editData.categoryName': {
            deep: true, // 使用 deep: true 來監聽 editedCategoryName 對象內部屬性的變化
            handler(newVal) { // newVal 是變化後的 editedCategoryName 的值
            // 檢查 newVal 是否為真（即 editedCategoryName 是否存在）
            if (newVal) {
                //抓取館別名稱顯示對應的館別位置
                this.locationShow()
                this.editData.locationName = this.rowdata.location_name
            }
            }
        },
        'editData.locationName':{
            deep: true, // 使用 deep: true 來監聽 editedCategoryName 對象內部屬性的變化
            handler() { // newVal 是變化後的 editedCategoryName 的值
                if(this.editData.locationName === this.rowdata.location_name){
                    this.editData.categoryName = this.rowdata.category_name
                }
                // console.log(this.editedCategoryName);
                // console.log(this.editedLocationName);
            }
        }
        
    },
    components: {
        animalConfirm,
        DatePicker
    },
};
</script>
