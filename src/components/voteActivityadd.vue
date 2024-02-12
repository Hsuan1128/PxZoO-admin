<template>
  <div class="voteActivityadd">
      <h1>新增投票活動</h1>
      <div class="voteActivityadd_content">
          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">活動名稱
              </label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.vote_activity_name">
          </div>

          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">內容</label>
              <input type="text" placeholder="請輸入敘述文字"  v-model="formData.vote_activity_content">
          </div>
          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">年月</label>
              <input type="month" placeholder="請輸入敘述文字" v-model="formData.	vote_activity_date">
          </div>
          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">第一名動物</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.animal_id_1 ">
          </div>
          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">第二名動物	</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.animal_id_2 ">
          </div>
          <div class="voteActivityadd_content_align">
              <label for="" class="pcInnerText">第三名動物</label>
              <input type="text" placeholder="請輸入敘述文字" v-model="formData.animal_id_3">
          </div>
      </div>
      
      <div class="voteActivityadd_btns">
          <button class="defaultBtn pcInnerText" @click="voteActivitysave" >
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
      vote_activity_name: '',
      vote_activity_content: '',       
      vote_activity_date: '',  
      animal_id_1: '',  
      animal_id_2: '',
      animal_id_3: '',
      
       
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
    voteActivitysave() {
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      axios.post('http://localhost/pxzoo/voteActivityadd.php', formData, {
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
.voteActivityadd{
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
  .voteActivityadd_content{
      width: 60.82vw;
      margin: 3vw auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2vw;
   
      .voteActivityadd_content_align{
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
          .voteActivityadd_textarea{
              width: 85%;
              height: 10vw;
          }
      }
  }
  .voteActivityadd_btns{
      width: 280px;
      margin: 3vw auto;
      display: flex;
      justify-content: space-between;
  }
}
</style>