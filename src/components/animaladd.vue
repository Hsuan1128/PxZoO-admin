<template>
  <div class="animal_add_bg">
    <div class="animaladd">
        <h1 class="pcSmallTitle">新增動物資訊</h1>
        <div class="animaladd_content">
            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">動物種類
                </label>
                <input type="text"  placeholder="請輸入動物種類" v-model="formData.animal_species">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">動物名稱</label>
                <input type="text" placeholder="請輸入動物名稱"  v-model="formData.animal_name">
            </div>
            <!-- 改下拉 -->
            <div class="animaladd_content_align">
              <label for="category" class="pcInnerText">館別名稱
                </label>
              <select name="category" placeholder="請選擇館別名稱" v-model="formData.category_name" id="category">
                <option value="" disabled hidden>請選擇館別名稱</option>
                <option v-for="category in categoriesName">{{category}}</option>
              </select>
            </div>
            <!-- 改下拉 -->
            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">館別位置</label>
                <select name="location" placeholder="請選擇館別位置" v-model="formData.location_name" id="location">
                <option value="" disabled hidden>請選擇館別位置</option>
                <option v-for="location in selectlocation">{{location.location_name}}</option>
              </select>
            </div>
            <!-- 改日期選擇 -->
            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">入園日期
                </label>
                <input type="date" placeholder="請輸入消息日期"  v-model="formData.animal_enterdate">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">平均壽命</label>
                <textarea class="animaladd_textarea" placeholder="請輸入平均壽命" v-model="formData.animal_lifespan"></textarea>
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">分布地區</label>
                <textarea class="animaladd_textarea" placeholder="請輸入分布地區" v-model="formData.animal_area"></textarea>
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">食性</label>
                <textarea class="animaladd_textarea" placeholder="請輸入食性" v-model="formData.animal_food"></textarea>
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">特徵</label>
                <textarea class="animaladd_textarea" placeholder="請輸入特徵" v-model="formData.animal_features"></textarea>
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">介紹</label>
                <textarea class="animaladd_textarea" placeholder="請輸入介紹" v-model="formData.animal_description"></textarea>
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">圖片A</label>
                <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_a', $event)">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">圖片B</label>
                <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_b', $event)">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">圖片C</label>
                <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_pic_c', $event)">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">Icon</label>
                <input type="file" placeholder="請上傳圖片，檔案類型：png"  @change="handleFileChange('animal_icon', $event)">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">動物聲音</label>
                <input type="file" placeholder="請上傳音檔，檔案類型：mp3"  @change="handleFileChange('animal_sound', $event)">
            </div>

            <div class="animaladd_content_align">
                <label for="" class="pcInnerText">列表圖</label>
                <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('animal_small_pic', $event)">
            </div>
        </div>
        
        <div class="animaladd_btns">
            <button class="defaultBtn pcInnerText" @click="saveAnimaldata" >
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
    
            <button class="defaultBtn pcInnerText" @click="updateaddSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        <animalConfirm v-show="ConfirmSwitch" :ConfirmSwitch="ConfirmSwitch" @update-switch="ConfirmSwitch = $event"/>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'; // 引入 axios
import animalConfirm from "@/components/animalConfirm.vue"
import {DatePicker} from "view-ui-plus";
export default {
  props:{
      addSwitch: false,
      animalData: {
            type: Array,
            required: true,
        }
  },
  data() {
  return {
    formData: {
      animal_species:'',
      animal_name:'',
      category_name:'',
      location_name:'',
      animal_enterdate:'',
      animal_lifespan:'',
      animal_area:'',
      animal_food:'',
      animal_features:'',
      animal_description:'',
      animal_pic_a:'' ,
      animal_pic_b:'' ,
      animal_pic_c:'' ,
      animal_icon:'',
      animal_sound:'' ,
      animal_small_pic:'',
      animal_status:''
       
      },
      //位置資訊
      categories: [],
      categoriesName: ["草原之聲","極地秘境","叢林奇蹟","鳥園樂章","海洋奇觀"],
      selectlocation:[],
      ConfirmSwitch:false,
  };
  },
  created() {
    axios.get(`${import.meta.env.VITE_API_URL}/locationShow.php`)
    .then(response => {
      this.categories = response.data; // 假設返回的數據是一個數組
      console.log(this.categories)
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  },
  watch:{
    // 監聽 formData 屬性的變化
    formData: {
      deep: true, // 使用 deep: true 來監聽 formData 對象內部屬性的變化
      handler(newVal) { // newVal 是變化後的 formData 的值
        // 檢查 newVal 是否為真（即 formData 是否存在）
        if (newVal) {
          //抓取館別名稱顯示動物id是null值的位置
          this.selectlocation = this.categories.filter(item=>item.category_name === this.formData.category_name)
          // console.log(this.selectlocation);
        }
      }
    },
  },
  methods: {
      // 更新开关状态
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
      this.$nextTick(() => {
    // console.log(this.addSwitch);
  });
    },
    updateConfirmSwitch(newValue) {
      this.ConfirmSwitch = newValue;
      this.$emit('change', this.ConfirmSwitch);
    },
    handleFileChange(field, event) {
      // 當文件選擇時觸發，將文件對象存儲到 formData 中
      this.formData[field] = event.target.files[0];
    },
    // handleDateChange(date) {
    // // 將選擇的日期值設置到 formData.animal_enterdate 中
    // this.formData.animal_enterdate = date;
    // console.log('Formatted Date:', this.formData.animal_enterdate);

    // },
    // 提交表单数据
    saveAnimaldata() {
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      axios.post(`${import.meta.env.VITE_API_URL}/animaladd.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 指定文件上傳格式
        },
      })
        .then(response => {
          console.log(response.data);
          console.log(this.formData)
          // 提交成功後的處理
          this.updateaddSwitch(); // 觸發關閉表單的方法
        })
        .catch(error => {
          console.error('Error:', error);
          // 提交失敗時的處理
        });
    }
  },
  components: {
        animalConfirm,
        DatePicker
    },
};
</script>

<style lang="scss">
.animal_add_bg{
  width: 100%;
  height: 100%;
  background-color: #000000dc;
  position: absolute;
  z-index: 21;
}
.animaladd{
  overflow: auto;
  width: 73.64vw;
  height: 90vh;
  background-color: #f5efeb;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%,-50%);
  z-index: 10;
  h1{
      margin-top: 2vw;
      text-align: center;
  }
  .animaladd_content{
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vw;
   
      .animaladd_content_align{
          display: flex;
          width: 100%;
          label{
              margin-right: 20px;
              display: block;
              width: 15%;
          }
          input, select{
            width: 85%;
            height: 2vw;
            padding-inline: 8px;
            border: none;

          }
          .animaladd_textarea{
            width: 85%;
            height: 10vw;
            resize: none;
            padding-inline: 8px;
            border: none;

          }
      }
  }
  .animaladd_btns{
      width: 280px;
      margin: 3vw auto;
      display: flex;
      justify-content: space-between;
  }
}
</style>