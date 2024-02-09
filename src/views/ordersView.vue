<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">銷售管理 | 購票訂單</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入姓名 / 訂單編號" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea orders">
<!-- content -->
        <Table stripe :columns="columns" :data="orders" ref="table"  :default-sort="defaultSort" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>

          <template #action="{ row, index }">
            <Button 
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="openRevise(row)" >
              <img src="../assets/images/formicon/revise.svg" alt=""/>
            </Button>
          </template>
        </Table>
        
        <Page :page-size ="2" :total="40" size="small" />

      </div>
    </div>
      
    <grass />
  </section>
</template>
  
<script>
import axios from 'axios';
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";

export default {
  components: {
    sidebar,
    grass,
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          title: "No",
          width: 50,
        },
        {
          title: "訂單編號",
          key: "ord_id",
          sortable: true,
          sortType: 'asc',
          // width: 75,
        },
        {
          title: "姓名",
          key: "mem_name",
          sortable: true,
          ellipsis: true,
          // width: 100,
        },
        {
          title: "稱謂",
          key: "mem_title",
          sortable: true,
          ellipsis: true,
          // width: 40,
        },
        {
          title: "票券日期",
          key: "ord_tidate",
          sortable: true,
          ellipsis: true,
          width: 110,
        },
        {
          title: "付款金額",
          key: "ord_payprice",
          sortable: true,
          ellipsis: true,
          // width: 88,
        },
        {
          title: "總票數",
          key: "allqty",
          sortable: true,
          ellipsis: true,
          // width: 70,
        },
        {
          title: "票券型態",
          key: "ord_ticktype",
          sortable: true,
          ellipsis: true,
          // width: 88,
        },
        {
          title: "處理狀態",
          key: "ord_status",
          sortable: true,
          ellipsis: true,
          // width: 88,
        },
        {
          title: "修改",
          slot: "action",
          align: "right",
          // width: 62,
        },
      ],
      defaultSort: {
        key: 'ord_id', // 設置預設排序的欄位
        order: 'asc', // 設置排序方式，'asc' 為升序，'desc' 為降序
      },
      orders: [],
      orderDetail:[],
      selectedOrder: null,
      showRevise: false,
    };
  },
  methods: {
    fetchOrders(){
      // 取得訂單資料
      axios.get(`${import.meta.env.VITE_API_URL}/ordersShow.php`)
      .then(response => {
        this.orders = response.data;
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      })
    },
    openRevise(row) {
      this.selectedOrder = row;
      this.showRevise = true;
      this.fetchOrderDetail(row.ord_id);
    },
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
  &:hover{
    cursor: pointer;
  }
}
.orders{
  .ivu-table-cell{
    padding-right: 8px;
    padding-left: 8px;
  }
  tr :first-child .ivu-table-cell{
    padding-left: 18px;
  }
  .ivu-table-header .ivu-table-column-right .ivu-table-cell{
    padding-right: 18px;
  }
}
</style>