<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">動物管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入動物資訊" v-model.trim="searchTerm"/>
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
          class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch v-model="row.animal_status" @click="switchChange(row)"
            />
          </template>
          <template #action="{ row, index }">
            <Button
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="AnimalModification(row)"
              >
              <img src="../assets/images/formicon/revise.svg" alt=""/>
            </Button>
          </template>
        </Table>
      </div>
      <div class="pages">
        <Page class="pcInnerText"  prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small"  @on-change="handleChangePage" />
      </div>
      <div class="add" @click="addAnimalItem">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" >
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    <animaladd v-show="addSwitch"  :addSwitch="addSwitch" :animalData="data" @update-switch="addSwitch = $event"/>
    <animalRevise v-show="ReviseSwitch" :rowdata="rowdata"
    :ReviseSwitch="ReviseSwitch" 
    @update-switch="ReviseSwitch = $event" />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page, } from "view-ui-plus";
import axios from 'axios'; // 導入axios套件

import animaladd from "@/components/animaladd.vue"
import animalRevise from "@/components/animalRevise.vue"

export default {
  
  data() {
    return {
      columns: [
      {
          title: "No.",
          key: "animal_id",
          width:60,
          align: "left",
        },
        {
          title: "館別名稱",
          key: "category_name",
          width:110,
          align: "left",
        },
        {
          title: "位置名稱",
          key: "location_name",
          width:140,
          align: "left",
        },
        {
          title: "動物種類",
          key: "animal_species",
          width:110,
          align: "left",
        },
        {
          title: "動物名稱",
          key: "animal_name",
          width:110,
          align: "left",
        },
        {
          title: "入園日期",
          key: "animal_enterdate",
          // width: 160,
          align: "left",
        },

        {
          title: "狀態",
          slot: "status",
          width: 90,
          align: "left",
        },
        {
          title: "修改",
          slot: "action",
          width: 110,
          align: "center",
        },
      ],
      
      //搜尋
      searchTerm:'',
      //動物全部資訊
      data: [],
      rowdata:[],

      currentPageData: [], // 當前頁顯示的數據
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼

      switchdata:{
        animal_id:'',
        animal_status:''
      },
      
      statusData:[],
      //顯示新增頁面
      addSwitch : false,
      ReviseSwitch:false,
    };
  },
  created(){
    axios.get(`${import.meta.env.VITE_API_URL}/animalShow.php?type=animals`)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
      this.total = this.data.length;
      // console.log(this.data);
      this.updateCurrentPageData();
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
  methods: {
    remove(index) {
      this.data.splice(index, 1);
    },
    handleChangePage(page) {
     // 當使用者改變當前頁面時，這個函數被呼叫。
    // page 參數代表使用者所選擇的新頁碼。
    this.currentPage = page;

    // 重新從數據源（可能是伺服器或其他地方）獲取新頁碼的資料，以便更新顯示在頁面上。

    axios.get(`${import.meta.env.VITE_API_URL}/animalShow.php?type=animals`)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
      this.total = this.data.length;
      this.updateCurrentPageData();
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  },
  filterHandle(){
      axios.get(`${import.meta.env.VITE_API_URL}/animalsearch.php?type=animals`, { params: { searchTerm: this.searchTerm } })
        .then(response => {
          this.data = response.data;
          this.total = this.data.length;
          this.currentPage = 1
          this.updateCurrentPageData();
        })
        .catch(error => {
          console.error('搜尋出錯:', error);
        });
  },

  updateCurrentPageData() {
     // 這個函數用來更新當前頁面所顯示的資料

      // 計算起始索引 (startIndex) 和結束索引
      // 這些索引表示當前頁面在整個資料陣列中的範圍。
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
        // 從完整資料陣列 (this.orders) 中提取出當前頁面的部分資料。
      this.currentPageData = this.data.slice(startIndex, endIndex);
    },
    //switch
  switchChange(row){
    if(row.animal_status == 1){
      row.animal_status = 0
    }else{
      row.animal_status = 1
    }
    this.updateStatusData(row)
  },
  updateStatusData(row){
    this.switchdata ={
      animal_id: row.animal_id,
      animal_status: row.animal_status
    }
    axios.post(`${import.meta.env.VITE_API_URL}/animalReviseSwitch.php`, this.switchdata, {
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

  //新增資料
  addAnimalItem(){
    this.addSwitch = true
  },
  // updateReviseSwitch(newValue) {
  //   this.ReviseSwitch = newValue;
  //   this.$emit('change', this.ReviseSwitch);
  // },
  //修改資料
  AnimalModification(row){
    this.ReviseSwitch = !this.ReviseSwitch
    this.rowdata = row;
    console.log(this.rowdata)
  }
},
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    animaladd,
    animalRevise
   
  },
};
</script>

<style>
.trash {
  border: transparent;
  background-color: transparent;
}
</style>
