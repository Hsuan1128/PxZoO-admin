<template>
    <div class="Revise_bg">
        <div class="Revise" id="animalRevise">
            <h1>編輯動物資訊</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="animal_species" class="pcInnerText">動物種類</label>
                    <input type="text" maxlength="10"  
                    v-model="editedAnimalSpecies">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_name" class="pcInnerText">動物名稱</label>
                    <input type="text" maxlength="10"
                    v-model="editedAnimalName">
                </div>

                <div class="Revise_content_align">
                    <label for="category_name" class="pcInnerText">館別名稱</label>
                    <select name="category_name" 
                    v-model="editedCategoryName">
                     <option disabled hidden>{{ rowdata.category_name }}</option>
                     <option v-for="category in categoriesName">{{category}}</option>
                    </select> 
                </div>

                <div class="Revise_content_align">
                    <label for="location_name" class="pcInnerText">館別位置</label>
                    <select name="location_name" 
                    v-model="editedLocationName">
                     <option :value="rowdata.location_name">目前位置：{{ rowdata.location_name }}</option>
                     <option v-for="location in selectlocation">{{location.location_name}}</option>
                    </select> 
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_enterdate" class="pcInnerText"
                    >入園時間</label>
                    <input type="date"  v-model="rowdata.animal_enterdate">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_lifespan" class="pcInnerText">平均壽命</label>
                    <textarea class="Revise_textarea" 
                    maxlength="100" rows="7" v-model="editedAnimalLifespan"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_area" class="pcInnerText">分布地區</label>
                    <textarea class="Revise_textarea" 
                    maxlength="100" rows="7"  v-model="editedAnimalArea"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_food" class="pcInnerText">食性</label>
                    <textarea class="Revise_textarea" 
                    maxlength="150" rows="9" v-model="editedAnimalFood"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_features" class="pcInnerText">特徵</label>
                    <textarea class="Revise_textarea" 
                    maxlength="150" rows="9" v-model="editedAnimalFeatures"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_description" class="pcInnerText">介紹</label>
                    <textarea class="Revise_textarea" v-model="editedAnimalDescription"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_a" class="pcInnerText">圖片A</label>
                    <div>
                        <span v-if="rowdata.animal_pic_a && !fileChanged.a">{{ rowdata.animal_pic_a }}</span>
                        <span  v-else-if="!isNewFile.a">{{ uploadImagePlaceholder }}</span>
                        <input type="file" accept="image/*" id="animal_pic_a" @change="handleFileChange('editedAnimal_pic_a', $event)">
                    </div>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_b" class="pcInnerText">圖片B</label>
                    <div>
                        <span v-if="rowdata.animal_pic_b && !fileChanged.b">{{ rowdata.animal_pic_b }}</span>
                        <span  v-else-if="!isNewFile.b">{{ uploadImagePlaceholder }}</span>
                        <input type="file" accept="image/*" id="animal_pic_b" @change="handleFileChange('editedAnimal_pic_b', $event)">
                    </div>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_c" class="pcInnerText">圖片C</label>
                    <div>
                        <span v-if="rowdata.animal_pic_c && !fileChanged.c">{{ rowdata.animal_pic_c }}</span>
                        <span  v-else-if="!isNewFile.c">{{ uploadImagePlaceholder }}</span>
                        <input type="file" id="animal_pic_c" @change="handleFileChange('editedAnimal_pic_c', $event)">
                    </div>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_icon" class="pcInnerText">Icon</label>
                    <div>
                        <span v-if="rowdata.animal_icon && !fileChanged.icon">{{ rowdata.animal_icon }}</span>
                        <span  v-else-if="!isNewFile.icon">{{ uploadImagePlaceholder }}</span>
                        <input type="file" accept="image/png"  id="animal_icon"  @change="handleFileChange('editedAnimalIcon', $event)">
                    </div>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_sound" class="pcInnerText">動物聲音</label>
                    <div>
                        <span v-if="rowdata.animal_sound && !fileChanged.sound">{{ rowdata.animal_sound }}</span>
                        <span  v-else-if="!isNewFile.sound">{{ uploadSoundPlaceholder }}</span>
                        <input type="file" accept="audio/*" id="animal_sound" 
                        @change="handleFileChange('editedAnimalSound', $event)">
                    </div>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_small_pic" class="pcInnerText">列表圖</label>
                    <div>
                        <span v-if="rowdata.animal_small_pic && !fileChanged.small">{{ rowdata.animal_small_pic }}</span>
                        <span  v-else-if="!isNewFile.small">{{ uploadImagePlaceholder }}</span>
                        <input type="file" accept="image/*" id="animal_small_pic" @change="handleFileChange('editedAnimal_small_pic', $event)">
                    </div>
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
            //建立v-model的參數,才能綁定到input上
            editedAnimalSpecies: '',
            editedAnimalName: '',

            editedCategoryName: '',
            editedLocationName: '',
            editedAnimalEnterdate: '',

            editedAnimalLifespan: '',
            editedAnimalArea: '',
            editedAnimalFood: '',
            editedAnimalFeatures: '',
            editedAnimalDescription: '',
            editedAnimal_pic_a: '',
            editedAnimal_pic_b: '',
            editedAnimal_pic_c: '',
            editedAnimalIcon: '',
            editedAnimalSound: '',
            editedAnimal_small_pic: '',
            categoriesName: ["草原之聲","極地秘境","叢林奇蹟","鳥園樂章","海洋奇觀"],
            mysqlLocation: [],//儲存館別的值
            selectlocation:[],

            //是否上傳新圖片
            isNewFile: {
                a: false,
                b: false,
                c: false,
                icon: false,
                small: false,
                sound: false,
            },
             // 添加用於追蹤圖片是否已更改的變量
             fileChanged: {
                a: false, // 初始化為 false，表示圖片尚未更改
                b: false,
                c: false,
                icon: false,
                small: false,
                sound: false,
            },
            uploadImagePlaceholder: '請上傳圖片',
            uploadSoundPlaceholder: '請上傳音檔'
        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/locationShow.php`)
        .then(response => {
        this.mysqlLocation = response.data; // 假設返回的數據是一個數組
        //console.log(this.mysqlLocation)
        })
        .catch(error => {
        console.error("Error fetching data: ", error);
        });
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        },

        prepareConfirmData() {

            // 將每個屬性添加到 FormData 對象中
            this.rowdata.animal_id = this.rowdata.animal_id,
            this.rowdata.animal_species= this.editedAnimalSpecies,
            this.rowdata.category_name= this.editedCategoryName,
            this.rowdata.location_name= this.editedLocationName,
            this.rowdata.animal_enterdate= this.editedAnimalEnterdate,
            this.rowdata.animal_lifespan= this.editedAnimalLifespan,
            this.rowdata.animal_area= this.editedAnimalArea,
            this.rowdata.animal_food= this.editedAnimalFood,
            this.rowdata.animal_features= this.editedAnimalFeatures,
            this.rowdata.animal_description= this.editedAnimalDescription,
            this.rowdata.pic_a= this.editedAnimal_pic_a,
            this.rowdata.pic_b= this.editedAnimal_pic_b,
            this.rowdata.pic_c= this.editedAnimal_pic_c,
            this.rowdata.animal_icon= this.editedAnimalIcon,
            this.rowdata.animal_sound= this.editedAnimalSound,
            this.rowdata.animal_small_pic= this.editedAnimal_small_pic;
            
             // 建立一個新的 FormData 對象
            let formData = new FormData();
            for (let key in this.rowdata) {
                console.log(key, this.rowdata)
                formData.append(key, this.rowdata[key]);
                console.log(formData)
            }
            // 將 FormData 對象賦值給 confirmData
            this.confirmData = formData;
            console.log(this.confirmData)
        },
        animalRevise(){
            //判斷輸入資料的情況做出對應的行為
            if (this.editedAnimalSpecies && this.editedAnimalName 
            // && this.editedCategoryName && this.editedLocationName 
            // && this.editedAnimalEnterdate && this.editedAnimalLifespan 
            // && this.editedAnimalArea && this.editedAnimalFood 
            // && this.editedAnimalFeatures && this.editedAnimalDescription 
            // && this.editedAnimal_pic_a && this.editedAnimal_pic_b 
            // && this.editedAnimal_pic_c && this.editedAnimalIcon 
            // && this.editedAnimalSound && this.editedAnimal_small_pic
            ) {
                if (this.rowdata.animal_name != this.editedAnimalName 
                    // this.rowdata.animal_species != this.editedAnimalSpecies ||
                    // this.rowdata.category_name != this.editedCategoryName ||
                    // this.rowdata.location_name != this.editedLocationName ||
                    // this.rowdata.animal_enterdate != this.editedAnimalEnterdate ||
                    // this.rowdata.animal_lifespan != this.editedAnimalLifespan ||
                    // this.rowdata.animal_area != this.editedAnimalArea ||
                    // this.rowdata.animal_food != this.editedAnimalFood ||
                    // this.rowdata.animal_features != this.editedAnimalFeatures ||
                    // this.rowdata.animal_description != this.editedAnimalDescription ||
                    // this.rowdata.pic_a != this.editedAnimal_pic_a ||
                    // this.rowdata.pic_b != this.editedAnimal_pic_b ||
                    // this.rowdata.pic_c != this.editedAnimal_pic_c ||
                    // this.rowdata.animal_icon != this.editedAnimalIcon ||
                    // this.rowdata.animal_sound != this.editedAnimalSound ||
                    // this.rowdata.animal_small_pic != this.editedAnimal_small_pic
                    ) {

                    this.ConfirmSwitch = !this.ConfirmSwitch;
                    this.prepareConfirmData();
                } else {
                    // console.log(this.editedCategoryName)
                    //     console.log(this.editedLocationName)
                    this.updateReviseSwitch();
                }
            } else {
                alert("請填寫所有欄位");
            }
        },
        transferData(){
            //判斷輸入資料的情況做出對應的行為
            if (this.rowdata.animal_name != this.editedAnimalName || 
                    this.rowdata.animal_species != this.editedAnimalSpecies || 
                    this.rowdata.category_name != this.editedCategoryName ||
                    this.rowdata.location_name != this.editedLocationName ||
                    this.rowdata.animal_enterdate != this.editedAnimalEnterdate ||
                    this.rowdata.animal_lifespan != this.editedAnimalLifespan ||
                    this.rowdata.animal_area != this.editedAnimalArea ||
                    this.rowdata.animal_food != this.editedAnimalFood ||
                    this.rowdata.features != this.editedAnimalFeatures ||
                    this.rowdata.description != this.editedAnimalDescription ||
                    this.rowdata.pic_a != this.editedAnimal_pic_a ||
                    this.rowdata.pic_b != this.editedAnimal_pic_b ||
                    this.rowdata.pic_c != this.editedAnimal_pic_c ||
                    this.rowdata.animal_icon != this.editedAnimalIcon ||
                    this.rowdata.animal_sound != this.editedAnimalSound ||
                    this.rowdata.animal_small_pic != this.editedAnimal_small_pic) {
                //傳遞更新的資料到ConfirmData物件裡
                this.prepareConfirmData()
                //引入修改的PHP
                axios.post(`${import.meta.env.VITE_API_URL}/animalRevise.php`, this.confirmData,{
                    headers: {
                        
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(() => {
                    //關閉修改的彈窗
                    this.updateReviseSwitch()
                    console.log(this.confirmData)
                    // location.reload();
                })
                .catch(error => {
                    console.error('更新錯誤:', error);
                });
            } else {
                this.updateReviseSwitch();
            }
        },

        handleFileChange(field, event) {
            console.log(field, event)
            
            const file = event.target.files[0];
            // 將文件資料保存到對應的 rowdata 屬性中
            // 如果您只需要保存檔案名稱，請使用下面的代碼
            this.rowdata[field] = file;
            // 將相應的 fileChanged 設置為 true，表示圖片已更改
            this.fileChanged[field.split('_').pop()] = true;
            // 將相應的 isNewFile 設置為 true，表示新圖片已選擇
            this.isNewFile[field.split('_').pop()] = true;
            //const fileName = file.name;
    
            // 將文件資料保存到對應的 rowdata 屬性中
            // this.rowdata[field] = fileName;
            console.log(file)
            // 顯示上傳的文件名（或其他信息）
            console.log(`${field} uploaded: ${file.name}`);
        },

        openFileInput(refName) {
            // 從buttom觸發file
            this.$refs[refName].click();
        },
        locationShow(){
            this.selectlocation = this.mysqlLocation.filter(item=>item.category_name === this.editedCategoryName)
            // console.log(this.selectlocation);
        }
    },
    watch: {
        'rowdata.animal_enterdate': function(newVal) {
        this.editedAnimalEnterdate = newVal;
        },
        //這裡主要作用是顯示所點選的資料並綁定在input上變成值
        rowdata: {
            deep: true, // 使用 deep: true 來監聽 rowdata 對象內部屬性的變化
            handler(newVal) { // newVal 是變化後的 rowdata 的值
                // 檢查 newVal 是否為真（即 rowdata 是否存在）
                if (newVal) {
                    // 將 rowdata 對象中的特定屬性賦值給 data 中的對應屬性
                    this.editedAnimalSpecies = newVal.animal_species
                    this.editedAnimalName = newVal.animal_name
                    this.editedCategoryName = newVal.category_name
                    this.editedLocationName = newVal.location_name
                    this.editedAnimalEnterdate = newVal.animal_enterdate
                    this.editedAnimalLifespan = newVal.animal_lifespan
                    this.editedAnimalArea = newVal.animal_area
                    this.editedAnimalFood = newVal.animal_food
                    this.editedAnimalFeatures = newVal.animal_features
                    this.editedAnimalDescription = newVal.animal_description
                    //有關於圖片和聲音的我先註解掉
                    this.editedAnimal_pic_a = newVal.animal_pic_a
                    this.editedAnimal_pic_b = newVal.animal_pic_b
                    this.editedAnimal_pic_c = newVal.animal_pic_c
                    
                    this.editedAnimalIcon = newVal.animal_icon
                    this.editedAnimalSound = newVal.animal_sound
                    this.editedAnimal_small_pic = newVal.animal_small_pic
                }

            }
        },
        editedCategoryName: {
            deep: true, // 使用 deep: true 來監聽 editedCategoryName 對象內部屬性的變化
            handler(newVal) { // newVal 是變化後的 editedCategoryName 的值
            // 檢查 newVal 是否為真（即 editedCategoryName 是否存在）
            if (newVal) {
                //抓取館別名稱顯示對應的館別位置
                this.locationShow()
                this.editedLocationName = ""
            }
            }
        },
        editedLocationName:{
            deep: true, // 使用 deep: true 來監聽 editedCategoryName 對象內部屬性的變化
            handler() { // newVal 是變化後的 editedCategoryName 的值
                if(this.editedLocationName === this.rowdata.location_name){
                    this.editedCategoryName = this.rowdata.category_name
                }
                console.log(this.editedCategoryName);
                console.log(this.editedLocationName);
            }
        }
        
    },
    components: {
        animalConfirm,
        DatePicker
    },
};
</script>
