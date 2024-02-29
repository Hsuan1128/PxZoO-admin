<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">會員管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input
              type="text"
              placeholder="請輸入會員資訊"
              v-model.trim="searchTerm"
            />
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
          ref="table"
          no-data-text="查無會員資料"
          :data="currentPageData"
          class="custom-table"
        >
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch
              size="large"
              v-model="row.mem_status"
              :true-value="1"
              :false-value="0"
              true-color="#13ce66"
              false-color="#ff9900"
              @on-change="switchChange($event, row)"
            >
              <template #open>
                <span>正常</span>
              </template>
              <template #close>
                <span>停權</span>
              </template></Switch
            >
          </template>
        </Table>
      </div>

      <div class="pages">
        <Page
          class="pcInnerText"
          prev-text="|<"
          next-text=">|"
          :current="currentPage"
          :total="total"
          size="small"
          @on-change="handleChangePage"
        />
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";
import axios from "axios";
import { Table, Page, Switch } from "view-ui-plus";
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "mem_id",
          width: 70,
          align: "center",
        },
        {
          title: "姓名",
          key: "mem_name",
        },
        {
          title: "稱謂",
          key: "mem_title",
          width: 70,
          align: "left",
        },
        {
          title: "信箱",
          key: "mem_email",
          width: 180,
          align: "left",
        },
        {
          title: "頭像",
          key: "mem_pic",
        },
        {
          title: "生日",
          key: "mem_birthday",
          width: 120,
          align: "center",
        },
        {
          title: "手機",
          key: "mem_phone",
          width: 120,
          align: "center",
        },
        {
          title: "狀態",
          slot: "status",
          width: 120,
          align: "center",
        },
      ],

      currentPageData: [],

      //分頁
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
      //查詢
      searchTerm: "",

      //儲存參數的陣列
      data: [],
      rowdata: [],

      //switch參數
      switchdata: {
        mem_id: "",
        mem_status: "",
      },
    };
  },
  created() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/member.php`)
      .then((res) => {
        this.data = res.data;
        this.total = this.data.length;
        this.updateCurrentPageData();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {
    //分頁
    handleChangePage(page) {
      // 當使用者改變當前頁面時，這個函數被呼叫。
      // page 參數代表使用者所選擇的新頁碼。
      this.currentPage = page;

      // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

      axios
        .get(`${import.meta.env.VITE_API_URL}/member.php`)
        .then((response) => {
          this.data = response.data; // 假設返回的數據是一個數組
          this.total = this.data.length;
          this.updateCurrentPageData();
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    filterHandle() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/memberSearch.php`, {
          params: { searchTerm: this.searchTerm },
        })
        .then((response) => {
          if (response.data.errMsg) {
            this.data = [];
          } else {
            this.data = response.data;
            this.total = this.data.length;
          }
          this.updateCurrentPageData();
        })
        .catch((error) => {
          console.error("搜尋出錯:", error);
        });
    },
    updateCurrentPageData() {
      // 這個函數用來更新當前頁面所顯示的資料

      // 計算起始索引 (startIndex) 和結束索引
      // 這些索引表示當前頁面在整個資料陣列中的範圍。
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // 從完整資料陣列 (this.orders) 中提取出當前頁面的部分資料。
      this.currentPageData = this.data
        .slice(startIndex, endIndex)
        .map((item) => {
          return {
            ...item,
            mem_status: parseInt(item.mem_status),
          };
        });
    },

    //狀態切換功能
    switchChange(status, row) {
      console.log(status);
      this.updateStatusData(row);
    },
    updateStatusData(row) {
      this.switchdata = {
        mem_id: row.mem_id,
        mem_status: row.mem_status,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/memberStatusSwitch.php`,
          this.switchdata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          console.log(this.switchdata);
          // 提交成功後的處理
        })
        .catch((error) => {
          console.error("搜尋出錯:", error);
        });
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
      this.filterHandle();
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    Page,
  },
};
</script>
