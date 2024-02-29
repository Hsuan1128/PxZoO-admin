<template>
  <sidebar />
  <div class="add_list" v-if="addList">
    <staAdd />
  </div>

  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">後台管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input
              type="text"
              placeholder="請輸入後台人員資訊"
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
          :data="currentPageData"
          ref="table"
          class="custom-table"
          no-data-text="查人員資料"
        >
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row, index }">
            <template v-if="auth === 1">
              <Switch
                v-if="index !== 0"
                size="large"
                v-model="row.sta_status"
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
                </template>
              </Switch>
            </template>
            <template v-else-if="auth !== 1">
              <!-- 當auth不等於1時的代碼 -->
            </template>
          </template>

          <template #action="{ row, index }" class="actionArea">
            <Button
              v-if="auth == 1"
              type="primary"
              class="trash"
              size="small"
              @click="staffModification(row)"
              ><img src="../assets/images/formicon/revise.svg" alt=""
            /></Button>
            <div v-else></div>

            <div v-else></div
          ></template>
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
      <div class="add" v-if="auth == 1">
        <img
          src="@/assets/images/formicon/plus.svg"
          alt="add"
          class="add"
          @click="openAddLsit"
        />
      </div>
      <div v-else></div>
    </div>
    <staffRevise
      v-show="ReviseSwitch"
      :rowdata="rowdata"
      :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event"
    />

    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";
import staAdd from "@/components/staffAdd.vue";
import { Table, Switch } from "view-ui-plus";
import axios from "axios";
import { mapActions } from "pinia";
import userStore from "@/stores/auth";
import staffRevise from "@/components/staffRevise.vue";
export default {
  data() {
    return {
      ReviseSwitch: false,
      columns: [
        {
          title: "編號",
          key: "sta_id",
          align: "left",
        },
        {
          title: "職位",
          key: "sta_pos",
          color: "blue",
          width: 200,
          align: "left",
        },
        {
          title: "信箱",
          key: "sta_email",
          width: 180,
          align: "left",
        },
        {
          title: "帳號",
          key: "sta_acc",
          align: "left",
        },
        {
          title: "密碼",
          key: "sta_psw",
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          width: 100,
          align: "center",
        },
        {
          title: "刪改",
          width: 120,
          slot: "action",
          align: "center",
        },
      ],
      //儲存參數的陣列
      data: [],
      rowdata: [],
      //查詢
      searchTerm: "",

      currentPageData: [],
      //分頁
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼

      //修改燈箱
      show: false,
      addList: false,

      //switch參數
      switchdata: {
        sta_id: "",
        sta_status: "",
      },
      statusData: [],
      //管理員id辨識
      auth: "",
    };
  },
  created() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/staff.php`)
      .then((res) => {
        this.data = res.data;
        this.updateCurrentPageData();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    this.auth = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).id
      : "";
  },
  computed: {},
  methods: {
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
      "updatePosition",
    ]),
    staffModification(row) {
      //控制修改視窗的顯示/隱藏
      this.ReviseSwitch = !this.ReviseSwitch;
      //把我們所點擊的資料帶入rowdata的參數裡
      this.rowdata = row;
    },
    openAddLsit() {
      this.addList = true;
    },
    delSta(row, index) {
      if (confirm("確定要刪除嗎?")) {
        const formData = new FormData();
        formData.append("sta_id", row.sta_id);

        axios
          .post(`${import.meta.env.VITE_API_URL}/staffDelete.php`, formData)
          .then((res) => {
            console.log(res);
            if (!res.data.error) {
              alert(res.data.msg);
              this.data.splice(index, 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    //分頁
    handleChangePage(page) {
      // 當使用者改變當前頁面時，這個函數被呼叫。
      // page 參數代表使用者所選擇的新頁碼。
      this.currentPage = page;

      // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

      axios
        .get(`${import.meta.env.VITE_API_URL}/staff.php?type=staff`)
        .then((response) => {
          this.data = response.data; // 假設返回的數據是一個數組
          this.total = this.data.length;
          this.updatecurrentPageData();
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    filterHandle() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/staffSearch.php?type=member`, {
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
            sta_status: parseInt(item.sta_status),
          };
        });
    },
    switchChange(status, row) {
      console.log(status);
      this.updateStatusData(row);
    },
    updateStatusData(row) {
      this.switchdata = {
        sta_id: row.sta_id,
        sta_status: row.sta_status,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/staffStatusSwitch.php`,
          this.switchdata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
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
    staAdd,
    staffRevise,
  },
};
</script>
<style>
.trash {
  border: transparent;
  background-color: transparent;
}
#test {
  position: absolute;
  top: 0;
  right: 50px;

  z-index: 10000;
}

.add_list {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
