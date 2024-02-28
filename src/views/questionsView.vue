<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">學堂管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入學堂資訊" v-model.trim="searchTerm"/>
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea">
        <Table stripe 
        :columns="columns" 
        :data="data" 
        ref="table" 
        class="custom-table">
        <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch  size="large" v-model="row.question_status" :true-value="1" :false-value="0"  true-color="#13ce66"
        false-color="#ff9900" @on-change="switchChange($event, row)"> <template #open>
          <span>上架</span>
        </template>
        <template #close>
          <span>下架</span>
        </template></Switch>
          </template>
          <template #action="{ row, index }">
            <Button type="primary" class="trash" size="small" style="margin-right: 5px"
              @click="QuestionModification(row)">
              <img src="../assets/images/formicon/revise.svg" alt="" /></Button>
            <Button type="error" class="trash" size="small" @click="remove(index)"><img
                src="../assets/images/formicon/delete.svg" alt="" /></Button></template>
        </Table>
      
          <div class="pages">
        <Page class="pcInnerText"  prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small"  @on-change="handleChangePage" />
      </div>
    
      </div>
      <div class="add" @click="addSwitch = !addSwitch">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add">
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    <questionrevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event" />



    <questionadd v-show="addSwitch" :addSwitch="addSwitch" @update-switch="addSwitch = $event" />

    <grass />
  </section>
</template>

<script>
// import Switch from "@/components/switchShelves.vue";
import axios from 'axios';
import sidebar from "@/components/sidebar.vue";
import { Table, Page, Switch } from "view-ui-plus"; // 假設 iview 的開關元件位於這個位置
import questionadd from "@/components/questionadd.vue";
import questionrevise from "@/components/questionrevise.vue";
import grass from "@/components/grass.vue";
export default {
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    questionadd,
    questionrevise,
  },
  data() {
    return {
      addSwitch: false,
      ReviseSwitch: false,
      columns: [
        {
          title: "編號",
          key: "question_id",
          width: 70,
          align: "left",
        },
        {
          title: "題目內容",
          key: "question_text",
          color: "blue",
          width: 120,
          align: "left",
        },
        {
          title: "選項A",
          key: "question_option_a",
          width: 110,
          align: "left",
        },
        {
          title: "圖片A",
          key: "question_img_a",
          width: 110,
          align: "left",
        },
        {
          title: "選項B",
          key: "question_option_b",
          width: 110,
          align: "left",
        },
        {
          title: "圖片B",
          key: "question_img_b",
          width: 110,
          align: "left",
        },
        {
          title: "選項C",
          key: "question_option_c",
          width: 110,
          align: "left",
        },
        {
          title: "圖片C",
          key: "question_img_c",
          width: 110,
          align: "left",
        },
        {
          title: "選項D",
          key: "question_option_d",
          width: 110,
          align: "left",
        },
        {
          title: "圖片D",
          key: "question_img_d",
          width: 110,
          align: "left",
        },
        {
          title: "正確答案",
          key: "question_correctanswer",
          width: 110,
          align: "left",
        },
        {
          title: "答案解析",
          key: "question_answer_illustrate",
          width: 200,
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          width: 110,
          align: "left",
        },
        {
          title: "刪改",
          slot: "action",
          width: 130,
          align: "center",
        },
      ],

      
      searchTerm:'',//搜尋
      data: [],
      rowdata: [],
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
      switchdata: {
       question_id: '',
       question_status: ''
      },
    };
  },
  methods: {
//switch
switchChange(status, row) {
   
      console.log(status)
      this.updateStatusData(row)
    },
    updateStatusData(row) {
      this.switchdata = {
       question_id: row.question_id,
       question_status: row.question_status
      }
      axios.post(`${import.meta.env.VITE_API_URL}/questionReviseSwitch.php`, this.switchdata, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          console.log(response.data);
          console.log(this.switchdata);
          // 提交成功後的處理
        })
        .catch(error => {
          console.error('搜尋出錯:', error);
        });
    },



    handleChangePage(page) {
     // 當使用者改變當前頁面時，這個函數被呼叫。
    // page 參數代表使用者所選擇的新頁碼。
    this.currentPage = page;

    // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

    axios.get(`${import.meta.env.VITE_API_URL}/questionShow.php `)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
      this.total = this.data.length;
      this.updatedata();
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  },
  filterHandle(){
      axios.get(`${import.meta.env.VITE_API_URL}/questionSearch.php?`, { params: { searchTerm: this.searchTerm } })
      .then(response => {
        if (response.data.errMsg){
          this.data = [];
        }else{
          this.data = response.data;
          this.total = this.data.length;
        }
        this.updatedata();
      })
      .catch(error => {
        console.error('搜尋出錯:', error);
      });
  },
  updatedata() {
     // 這個函數用來更新當前頁面所顯示的資料

      // 計算起始索引 (startIndex) 和結束索引
      // 這些索引表示當前頁面在整個資料陣列中的範圍。
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
        // 從完整資料陣列 (this.orders) 中提取出當前頁面的部分資料。
        this.data = this.data.slice(startIndex, endIndex).map(item => {
        return {
          ...item,
          animal_status: parseInt(item.animal_status)
        }
      })
    },
    updateaddSwitch(newValue) {
      this.addSwitch = newValue;
      this.$emit('change', this.addSwitch);
    },
    QuestionModification(row) {
      this.ReviseSwitch = !this.ReviseSwitch
      this.rowdata = row;
    },
    remove(index) {
      const rowData = this.data[index]; // 獲取要刪除的資料列
      const question_id = rowData.question_id; // 假設資料中有一個名為 question_id 的欄位作為唯一標識

      // 向後端發送 DELETE 請求
      const confirmed = window.confirm("確定要刪除此資料嗎?");
  if (!confirmed) {
    return; // 如果用戶取消了操作，則不執行刪除操作
  }axios.delete(`${import.meta.env.VITE_API_URL}/questionDelete.php`, {
        data: { id: question_id } // 傳遞要刪除的資料列的 ID
      })
      .then(response => {
    if (!response.data.error) {
      this.data.splice(index, 1);
      console.log("資料已成功刪除");
    }
  })
        .catch(error => {
          console.error("刪除資料時發生錯誤: ", error);
        });
    },
  },
  
  created() {
 // 初始化數據
 axios.get(`${import.meta.env.VITE_API_URL}/questionShow.php`)
    .then(response => {
    this.data = response.data; // 假設返回的數據是一個數組
      this.total = this.data.length;
      console.log(this.data);
      this.updatedata();
      
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
},
  watch:{
    searchTerm(){
      this.filterHandle()
      this.currentPage = 1
    }
  },
  
};
</script>

<style>
.trash {
  border: transparent;
  background-color: transparent;
}
</style>
