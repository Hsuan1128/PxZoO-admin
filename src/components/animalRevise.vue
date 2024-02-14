<template>
    <div class="Revise_bg">
        <div class="Revise" id="animalRevise">
            <h1>編輯動物資訊</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="animal_species" class="pcInnerText">動物種類</label>
                    <input type="text" :placeholder="rowdata.animal_species" id="animal_species">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_name" class="pcInnerText">動物名稱</label>
                    <input type="text" :placeholder="rowdata.animal_name" id="animal_name">
                </div>

                <div class="Revise_content_align">
                    <label for="category_name" class="pcInnerText">館別名稱</label>
                    <select name="category_name" 
                    id="category_name">
                     <option value="">{{ rowdata.category_name }}</option>
                    </select> 
                </div>

                <div class="Revise_content_align">
                    <label for="location_name" class="pcInnerText">館別位置</label>
                    <select name="location_name" 
                    id="location_name">
                     <option value="">{{ rowdata.location_name }}</option>
                    </select> 
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_enterdate" class="pcInnerText">入園時間</label>
                    <input type="date" placeholder="請輸入消息日期"  v-model="rowdata.animal_enterdate">
                </div>
    
                <div class="Revise_content_align">
                    <label for="animal_lifespan" class="pcInnerText">平均壽命</label>
                    <textarea class="Revise_textarea" :placeholder="rowdata.animal_lifespan" id="animal_lifespan"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_area" class="pcInnerText">分布地區</label>
                    <textarea class="Revise_textarea" :placeholder="rowdata.animal_area" id="animal_area"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_food" class="pcInnerText">食性</label>
                    <textarea class="Revise_textarea" :placeholder="rowdata.animal_food" id="animal_food"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_features" class="pcInnerText">特徵</label>
                    <textarea class="Revise_textarea" :placeholder="rowdata.animal_features" id="animal_features"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_description" class="pcInnerText">介紹</label>
                    <textarea class="Revise_textarea" :placeholder="rowdata.animal_description" id="animal_description"></textarea>
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_a" class="pcInnerText">圖片A</label>
                    <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_a', $event)">
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_b" class="pcInnerText">圖片B</label>
                    <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_b', $event)">
                </div>

                <div class="Revise_content_align">
                    <label for="animal_pic_c" class="pcInnerText">圖片C</label>
                    <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_c', $event)">
                </div>

                <div class="Revise_content_align">
                    <label for="animal_icon" class="pcInnerText">Icon</label>
                    <input type="file" placeholder="請上傳圖片，檔案類型：png"  @change="handleFileChange('animal_icon', $event)">
                </div>

                <div class="Revise_content_align">
                    <label for="animal_sound" class="pcInnerText">動物聲音</label>
                    <input type="file" placeholder="請上傳音檔，檔案類型：mp3"  @change="handleFileChange('animal_sound', $event)">
                </div>

                <div class="Revise_content_align">
                    <label for="animal_small_pic" class="pcInnerText">列表圖</label>
                    <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_small_pic', $event)">
                </div>
            </div>
            
            <div class="Revise_btns">
                <button class="defaultBtn pcInnerText" @click="ConfirmSwitch =!ConfirmSwitch ">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>
        <animalConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"/>
    </div>
</template>

<script>
import animalConfirm from "@/components/animalConfirm.vue"
import {DatePicker} from "view-ui-plus";

export default {
    props:{
        ReviseSwitch:false,
        rowdata: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            ConfirmSwitch:false,
            //建立v-model的參數,才能綁定到input上
            editedAnimalSpecies: '',
            editedAnimalName: '',

            editedCategoryName: '',//未用
            editedLocationName: '',//未用
            editedAnimalEnterdate: '',

            editedAnimalLifespan: '',
            editedAnimalArea: '',
            editedAnimalFood: '',
            editedCategoryFeatures: '',
            editedAnimalDescription: '',
            editedAnimal_pic_a: '',
            editedAnimal_pic_b: '',
            editedAnimal_pic_c: '',
            editedAnimalIcon: '',
            editedCategorySound: '',
            editedAnimal_small_pic: '',

        };
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        },
        updateConfirmSwitch(newValue) {
            this.ConfirmSwitch = newValue;
            this.$emit('change', this.ConfirmSwitch);
        },

    },
    components: {
        animalConfirm,
        DatePicker
    },
};
</script>
<style>
input, select{
    width: 85%;
    height: 2vw;
    padding-inline: 8px;
    border: none;
}
</style>