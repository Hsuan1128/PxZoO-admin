<template>
  <div class="newsadd_bg">
    <div class="newsadd">
      <h1>新增消息</h1>
      <div class="newsadd_content">
          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息標題
            </label>
            <input type="text" class="newsadd_text" placeholder="請輸入消息標題" v-model="formData.news_title">
          </div>

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息分類</label>
            <select name="newstype" id="news-select" v-model="formData.news_type">
              <option value="">請選擇消息分類</option>
              <option value="最新活動">最新活動</option>
              <option value="園區動態">園區動態</option>
              <option value="動物知識">動物知識</option>
            </select>
          </div>

          <div class="newsadd_content_align newsadd_img">
            <label class="pcInnerText">
              分類圖片  
            </label>
            <label class="pcInnerText newsadd_imgtext ">
              <span v-if="typefileName">{{ typefileName }}</span>
              <span v-else>請選擇檔案</span>   
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

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息日期</label>
            <input type="date" class="newsadd_text" placeholder="請輸入消息日期"  v-model="formData.news_date">
          </div>

          <div class="newsadd_content_align newsadd_img">
            <label class="pcInnerText">
              消息圖片 
            </label>
            <label class="pcInnerText newsadd_imgtext ">
              <span v-if="fileName">{{ fileName }}</span>
              <span v-else>請選擇檔案</span>   
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

          <div class="newsadd_content_align">
              <label for="" class="pcInnerText">描述1</label>
              <textarea class="newsadd_textarea" placeholder="請輸入段落文字" v-model="formData. news_text_1"></textarea>
          </div>

          <div class="newsadd_content_align">
              <label for="" class="pcInnerText">描述2</label>
              <textarea class="newsadd_textarea" placeholder="請輸入段落文字" v-model="formData. news_text_2"></textarea>
          </div>

          <div class="newsadd_content_align">
              <label for="" class="pcInnerText">描述3</label>
              <textarea class="newsadd_textarea" placeholder="請輸入段落文字" v-model="formData. news_text_3"></textarea>
          </div>

          <div class="newsadd_content_align">
              <label for="" class="pcInnerText">描述4</label>
              <textarea class="newsadd_textarea" placeholder="請輸入段落文字" v-model="formData. news_text_4"></textarea>
          </div>
      </div>
      
      <div class="newsadd_btns">
          <button class="defaultBtn pcInnerText" @click="saveNews" >
              儲存
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>

          <button class="defaultBtn pcInnerText" @click="updateaddSwitch">
              返回列表
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 引入 axios 库
export default {
  props:{
      addSwitch:false,
  },
  data() {
  return {
    formData: {
      news_title: '',
      news_type: '',
      news_typepic: '',
      news_date: '',
      news_pic: '',
      news_text_1: '',
      news_text_2: '',
      news_text_3: '',
      news_text_4: '',
    },
    typefileName: '',
    fileName: '',
  };
  },    
  methods: {
    // 更新開關狀態
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
      window.location.reload();
    },

    // 處理檔案更改（消息圖片）
    handleFileChange(field, event, fileType) {
      // 當選擇文件時，將文件對象存儲到 formData 中的指定字段
      this.formData[field] = event.target.files[0];
      
      // 根據文件類型更新相應的文件名
      if (fileType === 'news_typepic') {
        this.typefileName = this.formData[field].name;
        console.log(this.typefileName);
      } else if (fileType === 'news_pic') {
        this.fileName = this.formData[field].name;
        console.log(this.fileName);
      }
    },

    // 提交表單數據
    saveNews() {
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      axios.post(`${import.meta.env.VITE_API_URL}/newsAdd.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 指定文件上傳格式
        },
      })
      .then(response => {
        console.log('新增資料成功');
        console.log(response.data);
        // 提交成功後的處理
        this.updateaddSwitch(); // 觸發關閉表單的方法
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
        // 提交失敗時的處理
      });
    },
  },
  components: {
  },
};
</script>

<style lang="scss">
.newsadd_bg{
  width: 100%;
  height: 100%;
  background-color: #000000dc;
  position: absolute;
  z-index: 21;
}
.newsadd{
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
    color: #11A729;
  }
  .pcInnerText{
    color: #3F3F3F;
  }
  .newsadd_content{
    width: 60.82vw;
    margin: 3vw auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5vw;
  
    .newsadd_content_align{
      display: flex;
      width: 100%;

      label{
        // margin-right: 20px;
        display: block;
        width: 15%;
      }

      input{
        width: 85%;
        height: 2vw;
        padding-inline: 8px;
        border: none;
      }

      input[type="file"] {
        display: none;
      }

      .newsadd_text{
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

      .newsadd_imgtext{
        display: flex;
        justify-content: space-between;
        width: 100%;
        .iconBtn{
          width: 140px;
        }
      } 

      .newsadd_textarea{
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
  .newsadd_btns{
    width: 280px;
    margin: 3vw auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>