<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">消息管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入消息資訊" v-model.trim="searchTerm"/>
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
          ref="table"
          class="custom-table"
        >
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch v-model="row.active" />
          </template>
          <template #action="{ row, index }">
            <Button
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="NewsModification(row)"
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
        <template>
          <Page :total="100" />
        </template>
      </div>

      <div class="pages">
        <Page class="pcInnerText"  prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small"  @on-change="handleChangePage" />
      </div>

      <div class="add" @click="addSwitch = !addSwitch">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add">
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    
    <newsrevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event" />

    <newsadd v-show="addSwitch" :addSwitch="addSwitch" @update-switch="addSwitch = $event" />

    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switchShelves.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios';
import newsadd from "@/components/newsAdd.vue";
import newsrevise from "@/components/newsRevise.vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "news_id",
          width: 70,
          align: "left",
        },
        {
          title: "標題",
          key: "news_title",
          width: 250,
          align: "left",
        },
        {
          title: "類別",
          key: "news_type",
          width: 100,
          align: "left",
        },
        {
          title: "日期",
          key: "news_date",
          width: 140,
          align: "left",
        },
        {
          title: "圖片",
          key: "news_pic",
          width: 180,
          align: "left",
        },
        {
          title: "描述1",
          key: "news_text_1",
          width: 400,
          align: "left",
        },
        {
          title: "描述2",
          key: "news_text_2",
          width: 400,
          align: "left",
        },
        {
          title: "描述3",
          key: "news_text_3",
          width: 400,
          align: "left",
        },
        {
          title: "描述4",
          key: "news_text_4",
          width: 400,
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
      //搜尋
      searchTerm:'',
      //全部資訊
      data: [],
      rowdata:[],

      // data: [], // 當前頁顯示的數據
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
      
      //顯示頁面
      addSwitch : false,
      ReviseSwitch:false,
    };
  },

  methods: {
    updateaddSwitch(newValue) {
      this.addSwitch = newValue;
      this.$emit('change', this.addSwitch);
    },
    NewsModification(row) {
      this.ReviseSwitch = !this.ReviseSwitch
      this.rowdata = row;
    },
    remove(index) {
      const rowData = this.data[index]; // 獲取要刪除的資料列
      const news_id = rowData.news_id; // 假設資料中有一個名為 news_id 的欄位作為唯一標識

      // 向後端發送 DELETE 請求
      axios.delete(`${import.meta.env.VITE_API_URL}/newsDelete.php`, {
        data: { id: news_id } // 傳遞要刪除的資料列的 ID
      })
        .then(response => {
          // 成功刪除後處理前端資料
          this.data.splice(index, 1);
          console.log("資料已成功刪除");
          const confirmed = window.confirm("確定要刪除此商品嗎?");
          if (!response.data.error && confirmed) {
              this.prodclass.splice(index, 1)
          }
        })
        .catch(error => {
          console.error("刪除資料時發生錯誤: ", error);
        });
    },

    handleChangePage(page) {
     // 當使用者改變當前頁面時，這個函數被呼叫。
      // page 參數代表使用者所選擇的新頁碼。
      this.currentPage = page;

      // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

      axios.get(`${import.meta.env.VITE_API_URL}/newsShow.php?type=news`)
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
      axios.get(`${import.meta.env.VITE_API_URL}/newsSearch.php?type=news`, { params: { searchTerm: this.searchTerm } })
      .then(response => {
        this.data = response.data;
        this.total = this.data.length;
        this.currentPage = 1
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
      this.data = this.data.slice(startIndex, endIndex);
    },
  },

  components: {
    sidebar,
    Switch,
    grass,
    Table,
    newsadd,
    newsrevise,
  },

  created() {
    // axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
    axios.get(`${import.meta.env.VITE_API_URL}/newsShow.php`)
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
    searchTerm(newTerm, oldTerm){
      this.filterHandle()
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
