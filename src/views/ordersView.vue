<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">銷售管理 | 購票訂單</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入姓名 / 訂單編號" v-model.trim="searchTerm" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea orders">
        <Table stripe :columns="columns" :data="currentPageData" ref="table" no-data-text="查無訂單資料" :default-sort="defaultSort" class="custom-table" :border="false">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>

          <template #action="{ row, index }">
            <Button type="primary" class="trash" size="small" style="margin-right: 5px" @click="openRevise(row)">
              <img src="../assets/images/formicon/revise.svg" alt="" />
            </Button>
          </template>
        </Table>
      </div>

      <div class="pages">
        <Page class="pcInnerText" prev-text="|<" next-text=">|" :current="currentPage" :total="total" size="small" @on-change="handleChangePage" />
      </div>
    </div>

    <ordersRevise :orderData="selectedOrder" :orderDetailData="orderDetail" @newDetail="fetchOrderUpdate" @closeRevise="reviseToggle" v-if="showRevise" />

    <grass />
  </section>
</template>
  
<script>
import { getStaId } from '@/stores/getStaId.js';
import axios from 'axios';
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";
import ordersRevise from "@/components/orders/ordersRevise.vue"

export default {
  mixins: [getStaId],
  components: {
    sidebar, grass, ordersRevise, 
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          title: "No",
          // width: 65,
        },
        {
          title: "訂單編號",
          key: "ord_id",
          sortable: true,
          sortType: 'asc',
          // width: 100,
        },
        {
          title: "姓名",
          key: "mem_name",
          ellipsis: true,
          // width: 90,
        },
        {
          title: "稱謂",
          key: "mem_title",
          ellipsis: true,
          // width: 75,
        },
        {
          title: "票券日期",
          key: "ord_tidate",
          ellipsis: true,
          // width: 115,
        },
        {
          title: "付款金額",
          key: "ord_payprice",
          ellipsis: true,
          // width: 100,
        },
        {
          title: "總票數",
          key: "allqty",
          ellipsis: true,
          // width: 90,
        },
        {
          title: "票券型態",
          key: "ord_ticktype",
          ellipsis: true,
          // width: 100,
        },
        {
          title: "處理狀態",
          key: "ord_status",
          ellipsis: true,
          // width: 85,
        },
        {
          title: "修改",
          slot: "action",
          align: "right",
          width: 70,
        },
      ],
      defaultSort: {
        key: 'ord_id', // 設置預設排序的欄位
        order: 'asc', // 設置排序方式，'asc' 為升序，'desc' 為降序
      },
      searchTerm: '', //搜尋
      orders: [], //所有數據
      currentPageData: [], // 當前頁顯示的數據
      orderDetail: [],
      total: 0, // 總條數
      pageSize: 10, // 每頁顯示條數
      currentPage: 1, // 當前頁碼
      selectedOrder: null,
      showRevise: false,
    };
  },
  methods: {
    handleChangePage(page) {
      this.currentPage = page; // page 參數表示用戶切換到的新頁碼（頁面）的數字值
      this.fetchOrders();
    },
    updateCurrentPageData() {
      // 更新當前頁面所顯示的資料 (this.currentPageData)
      // 索引當前頁面在整個資料陣列中的範圍
      const startIndex = (this.currentPage - 1) * this.pageSize; // 起始索引
      const endIndex = startIndex + this.pageSize; // 結束索引
      this.currentPageData = Object.values(this.orders).slice(startIndex, endIndex); // 從完整資料陣列 (this.orders) 中提取出當前頁面的部分資料。
    },
    async fetchOrders() {
      try { // 取得所有訂單資料
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/ordersShow.php`, {
          params: {
            searchTerm: this.searchTerm
          }
        });
        
        this.orders = response.data;
        for(var key in this.orders){
          let order = this.orders[key];
          if(order.cou_name===null){
            order.cou_name='不使用優惠券';
          }
        }
        this.total = this.orders.length;
        this.updateCurrentPageData();
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    fetchOrderDetail(val) {
      // 取得訂單明細資料
      axios.get(`${import.meta.env.VITE_API_URL}/orderDetailShow.php`, {
        params: {
          ord_id: val,
        }
      })
        .then(response => {
          this.orderDetail = response.data;
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        })
    },
    fetchOrderUpdate(staff, status, bool) {
      // 修改訂單明細
      axios.post(`${import.meta.env.VITE_API_URL}/orderUpdate.php`, {
        // sta_id: this.sta_id, //等localstorage補上再試用
        sta_id: 1,
        ord_status: status,
        ord_id: this.selectedOrder.ord_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          this.fetchOrders();
          this.reviseToggle(bool);
          return response.data;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        })
    },
    openRevise(row) {
      this.selectedOrder = row;
      this.showRevise = true;
      this.fetchOrderDetail(row.ord_id);
    },
    reviseToggle(bool) {
      this.showRevise = bool;
    },
  },
  watch: {
    searchTerm() {
      this.fetchOrders();
    }
  },
  created(){
    this.fetchOrders();
  },
};
</script>
<style lang="scss">
.trash {
  border: transparent;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
}

.orders {
  .ivu-table-cell {
    padding-right: 8px;
    padding-left: 8px;
  }

  tr :first-child .ivu-table-cell {
    padding-left: 18px;
  }

  .ivu-table-header .ivu-table-column-right .ivu-table-cell {
    padding-right: 18px;
  }
}
</style>