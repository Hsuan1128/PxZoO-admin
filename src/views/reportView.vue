<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">留言管理 | 檢舉留言</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入留言資訊" v-model.trim="searchTerm" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea">
        <Table stripe :columns="columns" :data="data"  no-data-text="查無留言資料" ref="table" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch v-model="row.active" />
          </template>
          <template #action="{ row, index }">
            <Button type="primary" class="trash" size="small" style="margin-right: 5px"
              @click="NewsModification(row)"><img src="../assets/images/formicon/revise.svg" alt="" /></Button>
            <!-- <Button
              type="error"
              class="trash"
              size="small"
              @click="remove(index)"
              ><img src="../assets/images/formicon/delete.svg" alt="" />
            </Button> -->
          </template>
        </Table>
        <template>
          <Page :total="100" />
        </template>
      </div>

      <div class="pages">
        <Page class="pcInnerText" prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small"
          @on-change="handleChangePage" />
      </div>
    </div>

    <reportrevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event" />

    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios';
import reportrevise from "@/components/reportRevise.vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "report_id",
          width: 70,
          align: "left",
        },
        {
          title: "檢舉人編號",
          key: "mem_id",
          width: 100,
          align: "left",
        },
        {
          title: "檢舉人姓名",
          key: "mem_name",
          width: 120,
          align: "left",
        },
        {
          title: "檢舉留言編號",
          key: "com_id",
          width: 100,
          align: "left",
        },
        {
          title: "檢舉原因",
          key: "report_text",
          width: 400,
          align: "left",
        },
        {
          title: "檢舉類別",
          key: "report_type",
          width: 130,
          align: "left",
        },
        {
          title: "檢舉時間",
          key: "report_date",
          width: 180,
          align: "left",
        },
        {
          title: "處理狀態",
          key: "report_status",
          width: 130,
          align: "left",
        },
        // {
        //   title: "處理者",
        //   key: "sta_id",
        //   width: 100,
        //   align: "left",
        // },
        // {
        //   title: "處理時間",
        //   key: "report_altertime",
        //   width: 180,
        //   align: "left",
        // },
        {
          title: "修改",
          slot: "action",
          width: 80,
          align: "left",
        },
      ],
      data: [],
      rowdata: [],

      //修改
      ReviseSwitch: false,

      //查詢
      searchTerm: '',

      //分頁
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
    };
  },
  methods: {
    // remove(index) {
    //   this.data.splice(index, 1);
    // },

    //修改
    NewsModification(row) {
      this.ReviseSwitch = !this.ReviseSwitch
      this.rowdata = row;
    },

    //查詢
    filterHandle() {
      axios.get(`${import.meta.env.VITE_API_URL}/reportSearch.php?type=report`, { params: { searchTerm: this.searchTerm } })
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

      axios.get(`${import.meta.env.VITE_API_URL}/reportShow.php`)
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
      this.data = this.data.slice(startIndex, endIndex);
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    reportrevise,
  },
  created() {
    // axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
    axios.get(`${import.meta.env.VITE_API_URL}/reportShow.php`)
      .then(response => {
        this.data = response.data; // 假設返回的數據是一個數組
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  },

  watch: {
    //查詢
    searchTerm() {
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
