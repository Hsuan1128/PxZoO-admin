<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">留言管理 | 會員留言</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入留言資訊" v-model.trim="searchTerm"/>
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea">
        <Table
          stripe
          :columns="columns"
          :data="data"
          no-data-text="查無留言資料" 
          ref="table"
          class="custom-table"
        >
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch  size="large" v-model="row.com_status" :true-value="1" :false-value="0"  true-color="#13ce66"
            false-color="#ff9900" @on-change="switchChange($event, row)"> 
              <template #open>
                <span>上架</span>
              </template>
              <template #close>
                <span>下架</span>
              </template>
            </Switch>
          </template>
          <template #action="{ row, index }">
            <Button
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="show(index)"
              ><img src="../assets/images/formicon/revise.svg" alt=""
            /></Button>
            <Button
              type="error"
              class="trash"
              size="small"
              @click="remove(index)"
              ><img src="../assets/images/formicon/delete.svg" alt="" /></Button
          ></template>
        </Table>
        <!-- <template>
          <Page :total="100" />
        </template> -->
      </div>

      <div class="pages">
        <Page class="pcInnerText"  prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small"  @on-change="handleChangePage" />
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import { Switch } from "view-ui-plus";
// import Switch from "@/components/switchShelves.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios';
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "com_id",
          width: 70,
          align: "left",
        },
        {
          title: "會員編號",
          key: "mem_id",
          width: 100,
          align: "left",
        },
        {
          title: "會員姓名",
          key: "mem_name",
          width: 100,
          align: "left",
        },
        {
          title: "留言內容",
          key: "com_text",
          width: 400,
          align: "left",
        },
        {
          title: "留言照片",
          key: "com_pic",
          width: 180,
          align: "left",
        },
        {
          title: "留言時間",
          key: "com_date",
          width: 200,
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          width: 110,
          align: "left",
        },
        // {
        //   title: "刪改",
        //   slot: "action",
        //   align: "center",
        // },
      ],
      data: [],

      //查詢
      searchTerm:'',

      //分頁
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼

      //switch
      switchdata: {
        com_id: '',
        com_status: ''
      },
      statusData: [],
    };
  },
  methods: {
    remove(index) {
      this.data.splice(index, 1);
    },
    
    //查詢
    filterHandle(){
      axios.get(`${import.meta.env.VITE_API_URL}/commentSearch.php?type=comment`, { params: { searchTerm: this.searchTerm } })
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

    //分頁
    handleChangePage(page) {
     // 當使用者改變當前頁面時，這個函數被呼叫。
      // page 參數代表使用者所選擇的新頁碼。
      this.currentPage = page;

      // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

      axios.get(`${import.meta.env.VITE_API_URL}/commentShow.php?type=comment`)
      .then(response => {
        this.data = response.data; // 假設返回的數據是一個數組
        this.total = this.data.length;
        this.updatedata();
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    },
    updatedata() {
     // 這個函數用來更新當前頁面所顯示的資料

      // 計算起始索引 (startIndex) 和結束索引
      // 這些索引表示當前頁面在整個資料陣列中的範圍。
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
        // 從完整資料陣列 (this.orders) 中提取出當前頁面的部分資料。
      // 轉換部分型別
      this.data = this.data.slice(startIndex, endIndex).map(item => {
        return {
          ...item,
          com_status: parseInt(item.com_status)
        }
      })
    },

    //switch
    switchChange(status, row) {
      // if(row.com_status == 1){
      //   row.com_status = 0
      // }else{
      //   row.com_status = 1
      // }
      console.log(status)
      this.updateStatusData(row)
    },
    updateStatusData(row) {
      this.switchdata = {
        com_id: row.com_id,
        com_status: row.com_status
      }
      axios.post(`${import.meta.env.VITE_API_URL}/commentReviseSwitch.php`, this.switchdata, {
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
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
  },
  created() {
    // axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
    axios.get(`${import.meta.env.VITE_API_URL}/commentShow.php`)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  },

  watch:{
    //查詢
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
