<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">投票管理|投票活動</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入投票活動資訊" v-model.trim="searchTerm" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea">
        <Table stripe :columns="columns" :data="data" ref="table" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch v-model="row.active" />
          </template>
          <template #action="{ row, index }">
            <Button type="primary" class="trash" size="small" style="margin-right: 5px" @click="voteActivityModification(row)"><img
                src="../assets/images/formicon/revise.svg" alt="" /></Button>
            <Button type="error" class="trash" size="small" @click="remove(index)"><img
                src="../assets/images/formicon/delete.svg" alt="" /></Button></template>
        </Table>
        <template>
          <Page :total="100" />
        </template>
      </div>
      <div class="add" @click="addSwitch = !addSwitch">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add">
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    <voteActivityadd v-show="addSwitch" :addSwitch="addSwitch" @update-switch="addSwitch = $event" />
    <voteActivityRevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event" />
    <grass />
  </section>
</template>

<script>

import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switchShelves.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios'; // 導入axios套件
import voteActivityadd from "@/components/voteActivityadd.vue";
import voteActivityRevise from "@/components/voteActivityRevise.vue";
export default {
  data() {
    return {
      addSwitch: false,
      ReviseSwitch: false,
      columns: [
        {
          title: "編號",
          key: "vote_activity_id",
          width: 200,
          align: "left",
        },
        // {
        //   title: "活動名稱",
        //   key: "vote_activity_name",
        //   color: "blue",
        //   width: 120,
        //   align: "left",
        // },
        // {
        //   title: "內容",
        //   key: "vote_activity_content",
        //   width: 250,
        //   align: "left",
        // },
        {
          title: "活動月份",
          key: "vote_activity_date",
          width: 350,
          align: "left",
        },
        // {
        //   title: "第一名動物",
        //   key: "animal_id_1",
        //   width: 110,
        //   align: "left",
        // },
        // {
        //   title: "第二名動物",
        //   key: "animal_id_2",
        //   width: 110,
        //   align: "left",
        // },
        // {
        //   title: "第三名動物",
        //   key: "animal_id_3",
        //   width: 110,
        //   align: "left",
        // },
        {
          title: "狀態",
          slot: "status",
          width: 200,
          align: "left",
        },
        {
          title: "刪改",
          slot: "action",
          width: 130,
          align: "center",
        },
      ],
      data: [],
      rowdata: [],
      searchTerm:'',//搜尋
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
    };
  },
  methods: {
    handleChangePage(page) {
     // 當使用者改變當前頁面時，這個函數被呼叫。
    // page 參數代表使用者所選擇的新頁碼。
    this.currentPage = page;

    // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

    axios.get(`${import.meta.env.VITE_API_URL}/voteActivityShow.php `)
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
      axios.get(`${import.meta.env.VITE_API_URL}/voteActivitySearch.php?`, { params: { searchTerm: this.searchTerm } })
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

    updateaddSwitch(newValue) {
      this.addSwitch = newValue;
      this.$emit('change', this.addSwitch);
    },
    voteActivityModification(row) {
      this.ReviseSwitch = !this.ReviseSwitch
      this.rowdata = row;
    },
    remove(index) {
      const rowData = this.data[index]; // 獲取要刪除的資料列
      const vote_activity_id = rowData.vote_activity_id; // 假設資料中有一個名為 vote_activity_id 的欄位作為唯一標識

      // 向後端發送 DELETE 請求
      axios.delete(`${import.meta.env.VITE_API_URL}/voteActivityDelete.php`, {
        data: { id: vote_activity_id } // 傳遞要刪除的資料列的 ID
      })
        .then(response => {
          // 成功刪除後處理前端資料
          this.data.splice(index, 1);
          console.log("資料已成功刪除");
        })
        .catch(error => {
          console.error("刪除資料時發生錯誤: ", error);
        });
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    voteActivityadd,
    voteActivityRevise
  },
  created() {
    axios.get(`${import.meta.env.VITE_API_URL}/voteActivityShow.php`)
      .then(response => {
        this.data = response.data; // 假設返回的數據是一個數組
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
