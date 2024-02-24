<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">門票管理</h2>
      </div>

      <div class="formArea">
        <Table stripe :columns="columns" :data="data" ref="table" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>

          <template #action="{ row, index }">
            <Button
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="TicketModification(row)">
              <img src="../assets/images/formicon/revise.svg" alt=""/>
            </Button>
            
          </template>
        </Table>
      </div>
    </div>

    <ticketsRevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch" @update-switch="ReviseSwitch = $event"/>


    <grass />

  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";
import ticketsRevise from "@/components/ticketsRevise.vue"
import axios from 'axios';

export default {
  data() {
    return {
      ReviseSwitch:false,
      columns: [
        {
          title: "編號",
          key: "tickets_id",
          width:70,
        },
        {
          title: "門票名稱",
          key: "tickets_name",
        },
        {
          title: "門票票價",
          key: "tickets_price",
        },
        {
          title: "門票使用規則",
          key: "tickets_rule",
          width:170,
        },
        {
          title: "門票修改時間",
          key: "tickets_changetime",
          width:180,
        },
        {
          title: "修改",
          slot: "action",
          align: "right",
        },
      ],
      data: [],
      rowdata:[]
    };
  },
  methods: {
    TicketModification(row){
      //控制修改視窗的顯示/隱藏
      this.ReviseSwitch = !this.ReviseSwitch
      //把我們所點擊的資料帶入rowdata的參數裡
      this.rowdata = row;
    }
  },
  components: {
    sidebar,
    grass,
    ticketsRevise,
  },
  created() {
    axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  }
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
</style>
