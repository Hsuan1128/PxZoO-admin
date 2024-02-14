<template>
  <div class="newsadd">
      <h1>新增消息</h1>
      <div class="newsadd_content">
          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息標題
            </label>
            <input type="text" placeholder="請輸入消息標題" v-model="formData.news_title">
          </div>

          <div class="newsadd_content_align">
              <label for="" class="pcInnerText">消息分類</label>
              <input type="text" placeholder="請輸入消息分類"  v-model="formData.news_type">
          </div>

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">分類圖片</label>
            <input type="file" placeholder="請上傳圖片"  @change="handleFileChange('news_typepic', $event)">
          </div>

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息日期</label>
            <input type="date" placeholder="請輸入消息日期"  v-model="formData.news_date">
          </div>

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息圖片</label>
            <input type="file" placeholder="請上傳圖片" @change="handleFileChange('news_pic', $event)">
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
    }
  };
  },
  methods: {
      // 更新开关状态
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
    },handleFileChange(field, event) {
      // 當文件選擇時觸發，將文件對象存儲到 formData 中
      this.formData[field] = event.target.files[0];
    },
    // 提交表单数据
    saveNews() {
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      axios.post('http://localhost/pxzoo/newsAdd.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 指定文件上傳格式
        },
      })
        .then(response => {
          console.log(response.data);
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
  },
};
</script>

<style lang="scss">
.newsadd{
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
      margin-top: 3vw;
      text-align: center;
  }
  .newsadd_content{
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2vw;
   
      .newsadd_content_align{
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
        }
        .newsadd_textarea{
            width: 85%;
            height: 10vw;
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