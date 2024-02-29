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

          <!-- <div class="newsadd_content_align newsadd_img">
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
          </div> -->

          <div class="newsadd_content_align">
            <label for="" class="pcInnerText">消息日期</label>
            <input type="date" class="newsadd_text" placeholder="請輸入消息日期"  v-model="formData.news_date">
          </div>

          <div class="newsadd_content_align newsadd_img">
            <label class="pcInnerText">
              消息圖片 
            </label>
            <label class="pcInnerText newsadd_imgtext" for="uploads">
              <span v-if="fileName !== undefined && fileName !== null && fileName !== ''" >{{ fileName }}</span>
              <span v-else>請選擇檔案</span>   
              <div class="iconBtn pcInnerText">
                <p class="iconText">
                  <img src="@/assets/images/login/icon/image.svg" alt="" class="buttonIcon"/>
                  選擇檔案
                </p>
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon"/>
              </div>
              <!-- <input type="file" id="news_pic" name="news_pic" accept="image/png, image/jpeg" @change="handleFileChange('news_pic', $event, 'news_pic')"/> -->
            </label>
          </div>
          <!-- v-loading="loading"  -->
          <div class="cropper-content">
            <div class="cropper">
                <vue-cropper
                ref="cropper"
                :img="option.img"
                :output-size="option.outputSize"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixed-number="option.fixedNumber"
                :full="option.full"
                :fixed-box="option.fixedBox"
                :can-move="option.canMove"
                :can-move-box="option.canMoveBox"
                :original="option.original"
                :center-box="option.centerBox"
                :height="option.height"
                :info-true="option.infoTrue"
                :max-img-size="option.maxImgSize"
                :enlarge="option.enlarge"
                :mode="option.mode"
                :fillColor="option.fillColor"
                @realTime="realTime"
                @imgLoad="imgLoad"
                />
                <!-- <vue-cropper
                ref="cropper"
                :img="option.img"
                :outputType="option.outputType"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                @realTime="realTime"
                /> -->
            </div>

            <!--預覽效果圖-->
            <div class="show-preview">
                <div :style="previews.div" class="preview">
                  <img :src="previews.url" :style="previews.img">
                </div>
            </div>

            <!--底部操作工具按钮-->
            <div class="footer-btn">
              <div class="scope-btn">
                <!-- <label class="btn" for="uploads">選擇圖片</label> -->
                <input id="uploads" type="file" style="position:absolute; clip:rect(0 0 0 0);" 
                  accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">

                <div class="iconBtn pcInnerText" @click="changeScale(1)">
                    <p class="iconText">
                        <img src="@/assets/images/cutpic/home_icon_add.svg" alt="" class="buttonIcon" />
                        
                    </p>
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                </div>

                <div class="iconBtn pcInnerText" @click="changeScale(-1)">
                    <p class="iconText">
                        <img src="@/assets/images/cutpic/home_icon_minus.svg" alt="" class="buttonIcon" />
                        
                    </p>
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                </div>

                <div class="iconBtn pcInnerText" @click="rotateLeft">
                    <p class="iconText">
                        <img src="@/assets/images/cutpic/home_icon_left.svg" alt="" class="buttonIcon" />
                        
                    </p>
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                </div>

                <div class="iconBtn pcInnerText" @click="rotateRight">
                    <p class="iconText">
                        <img src="@/assets/images/cutpic/home_icon_right.svg" alt="" class="buttonIcon" />
                        
                    </p>
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                </div>
              </div>
            </div>
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
          <button class="defaultBtn pcInnerText" @click="saveNews('news_pic','blob')" >
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
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
export default {
  props:{
    addSwitch:false,

    //vue-cropper
    autoCropWidth: { // 默認生成截圖框寬度
      type: Number,
      default: 410
    },
    autoCropHeight: { // 默認生成截圖框高度
      type: Number,
      default: 150
    },
    busType: {
      type: String,
      default: 'advertPic'
    }
  },
  name: 'CropperImage',
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

    //vue-cropper
    loading: false,
    name: this.Name,
    previews: {},
    modelSrc: "",
    option: {
      img: '', // 裁剪圖片的地址,圖片來源 (空) (url 地址, base64, blob)
      outputSize: 1, // 裁剪生成影像的品質 (1) (0.1～1)
      outputType: 'jpeg', // 產生圖片的格式 (jpg (jpg 需要確定 jpeg)) (jpeg, png,webp)
      info: true, // 圖片大小信息 (true) (true,false)
      canScale: true, // 圖片是否允許滚輪缩放 (true) (true,false)
      autoCrop: true, // 是否要有截圖框 (false) (true,false)
      autoCropWidth: 245, // 截圖框寬 (容器的80%) (0 ~ 最大)
      autoCropHeight: 163, //截圖框高 (容器的80%) (0 ~ 最大)
      fixed: true, // 是否開啟截圖框寬高固定比例 (false) (true,false)
      fixedNumber: [4, 2.3], // 截圖框的寬高比例 ([1, 1]) ([ 寬度 ,  高度 ])
      full: false, // false按原比例裁切圖片，不失真 (false) (true, false)
      fixedBox: false, // 固定截圖框大小， (不允許改變) (false)
      canMove: true, // 上傳圖片是否可以移動 (true) (true, false)
      canMoveBox: true, // 截圖框能否拖動 (true) (true, false)
      original: false, // 上傳圖片按照原始比例渲染 (false) (true, false)
      centerBox: false, // 截圖框是否被限制在圖片里面 (false) (true, false)
      height: true, // 是否按照設備的dpr 輸出等比例圖片 (true) (true, false)
      infoTrue: false, // true为展示真实輸出圖片寬高，false展示看到的截圖框寬高 (false) (true, false)
      maxImgSize: 3000, // 限制圖片最大寬度和高度 (2000) (0 ~ max)
      enlarge: 1, // 圖片根據截圖框輸出比例倍數 (1) (0 ~ max(建議不要太大不然會卡死)
      mode: 'cover', // 圖片默认渲染方式 (contain) (contain , cover, 100px, 100% auto)
      // limitMinSize: '10', // 裁剪框限制最小區域 (10) (Number, Array, String)
      fillColor: '#ffffff' // 導出時背景顏色填充 (空) (#ffffff, white)
      
    },
    randomFileName: '',
    fileNameFinal: '',
    crap: false,
    downImg: '#',
    imgFile:'',
    uploadImgRelaPath:'', //上傳後的圖片的地址（不帶服務器域名）
  };
  },    
  methods: {
    // 更新開關狀態
    updateaddSwitch() {
      this.$emit('update-switch', !this.addSwitch);
      window.location.reload();
    },

    // 處理檔案更改（消息圖片）
    // handleFileChange(field, event, fileType) {
    //   // 當選擇文件時，將文件對象存儲到 formData 中的指定字段
    //   this.formData[field] = event.target.files[0];
    //   this.typefileName = this.formData[field].name;
    //   // // 根據文件類型更新相應的文件名
    //   // if (fileType === 'news_typepic') {
    //   //   this.typefileName = this.formData[field].name;
    //   //   console.log(this.typefileName);
    //   // } else if (fileType === 'news_pic') {
    //   //   this.fileName = this.formData[field].name;
    //   //   console.log(this.fileName);
    //   // }
    // },

    // 提交表單數據
    saveNews(field, type) {
      console.log('finish')
      
      let _this = this;
      // 使用 FormData 來處理文件上傳
      let formData = new FormData();
      for (let key in this.formData) {
        formData.append(key, this.formData[key]);
      }

      if (type === 'blob') { 
        this.$refs.cropper.getCropBlob((data) => { 
          let img = window.URL.createObjectURL(data) 
          this.model = true; 
          this.modelSrc = img; 
          let newFileName = this.regularFileName() + '.jpg';
          for (let key in this.formData) {
            formData.append(key, this.formData[key]);
          }
          
          formData.append(field, data, newFileName);

          if (this.formData.news_type.toLowerCase() === '最新活動') {
            console.log('orangeFrame');
            formData.append('news_typepic', 'orangeFrame.svg');
          } else if (this.formData.news_type.toLowerCase() === '園區動態') {
            console.log('greenFrame');
            formData.append('news_typepic', 'greenFrame.svg');
          } else if (this.formData.news_type.toLowerCase() === '動物知識') {
            console.log('blueFrame');
            formData.append('news_typepic', 'blueFrame.svg');
          }

          axios.post(`${import.meta.env.VITE_API_URL}/newsAdd.php`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // 指定文件上傳格式
            },
          })
          .then((response)=>{
            console.log('新增資料成功');
            console.log(response.data);
            // 提交成功後的處理
            this.updateaddSwitch(); // 觸發關閉表單的方法
            // window.location.reload();
            // 打開writeTqp組件
            console.log('Opening writeTqp component');
            this.showWriteTqp = true;
            document.body.style.overflow = "hidden";

            var res = response.data;
            if(res.success == 1){
            $('#btn1').val('');
            _this.imgFile = '';
            _this.headImg = res.realPathList[0];  //完整路径
            _this.uploadImgRelaPath = res.relaPathList[0];  //非完整路径
            _this.$message({　　//element-ui的消息Message消息提示组件
                type: 'success',
                message: '上傳成功'
            });
            }
          })
        }) 
      } else { 
        this.$refs.cropper.getCropData((data) => { 
          this.model = true; 
          this.modelSrc = data; 
          formData.append(field, data, this.com_pic);
        }) 
    } 

    
      // axios.post(`${import.meta.env.VITE_API_URL}/newsAdd.php`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', // 指定文件上傳格式
      //   },
      // })
      // .then(response => {
      //   console.log('新增資料成功');
      //   console.log(response.data);
      //   // 提交成功後的處理
      //   this.updateaddSwitch(); // 觸發關閉表單的方法
      //   window.location.reload();
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      //   // 提交失敗時的處理
      // });
    },

    //vue-cropper
    // 初始化函數
    imgLoad(msg) {
      console.log('工具初始化函數=====' + msg)
    },

    // 圖片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },

    // 向左旋轉
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },

    // 向右旋轉
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    // 預覽目前截圖結果
    preview() {
    this.$refs.cropper.getCropData((data) => {
      // console.log(data);
      this.modelSrc = data;
    });
    },

    // 即時預覽函數
    realTime(data) {
      this.previews = data;
      // console.log(data);
    },

    // 得到截圖的 base64 數據
    demo() {
      this.$refs.cropper.getCropData((data) => {
        console.log(data);
      });
    },

    // 選擇圖片
    selectImg(event) {
      this.fileNameFinal = event.target.files[0];
      console.log('handleFileChange',this.fileNameFinal);
      // const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(event.target.value)) {
        this.$message({
        message: '圖片類型要求：jpeg、jpg、png',
        type: 'error'
        })
        return false
      }
      this.fileName = this.fileNameFinal.name;

      // 轉化为blob
      const reader = new FileReader()
      reader.onload = (event) => {
        let data
        if (typeof event.target.result === 'object') {
        data = window.URL.createObjectURL(new Blob([event.target.result]))
        } else {
          data = event.target.result
        }
        this.option.img = data
      }
      
      console.log(`file.name => ${this.fileNameFinal.name}`)
      // 轉化为base64
      reader.readAsDataURL(this.fileNameFinal)
    },
    imgLoad (msg) { 
      console.log('imgLoad')
      console.log(msg) 
    },
    regularFileName() {
      const now = new Date();
      // const year = now.getFullYear();
      // const month = (now.getMonth() + 1).toString().padStart(2, '0');
      // const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
      // const randomString = Math.random().toString(36).substring(2, 15);
      return `${hours}${minutes}${seconds}${milliseconds}`;
    },


  },
  components: {
    VueCropper
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
  .cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-top: 0.85vw;
    text-align: right;
    @media (width <= 768px) {
        flex-direction: column;
        align-items: center;
    }
    .cropper {
        width: 245px;
        height: 163px;
        @media (width <= 768px) {
            width: 200px;
            height: 150px;
        }
    }
    .show-preview {
      // flex: 1;
      // -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      width: 245px;
      height: 163px;
      margin: 0 3vw;
      @media (width <= 768px) {
        display: none;
      }
      
      .preview {
        overflow: hidden;
        border: 1px solid #11a729;
        background: #cccccc;
        width: 245px;
        height: 163px;
        @media (width <= 768px) {
          display: none;
        }
      }
      }
    }
  .footer-btn {
    // margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    
    
    .scope-btn {
      display: flex;
      display: -webkit-flex;
      justify-content: space-evenly;
      flex-direction: column;
      padding-right: 10px;
      @media (width <= 768px) {
        padding-top: 5vw;
        flex-direction: row;
      }
    }
    .upload-btn {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
    }
    .btn {
      outline: none;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      margin-right: 10px;
    }
    .iconBtn{
      width: 50px;
      @media (width <= 768px) {
        margin: 0 10px;
      }
    }
  }
}
</style>