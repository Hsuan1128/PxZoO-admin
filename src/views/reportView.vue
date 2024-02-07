<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">留言管理 | 檢舉留言</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入留言資訊" />
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
        <template>
          <Page :total="100" />
        </template>
      </div>
      <!-- <div class="add">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" />

        <p class="pcInnerText">新增</p>
      </div> -->
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios';
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "report_id",
          align: "left",
        },
        {
          title: "檢舉人編號",
          key: "mem_id",
          align: "left",
        },
        {
          title: "檢舉留言",
          key: "com_id",
          align: "left",
        },
        {
          title: "檢舉原因",
          key: "report_text",
          width: 450,
          align: "left",
        },
        {
          title: "檢舉類別",
          key: "report_type",
          width: 100,
          align: "left",
        },
        {
          title: "檢舉時間",
          key: "report_date",
          width:170,
          align: "left",
        },
        {
          title: "處理狀態",
          key: "report_status",
          width:80,
          align: "left",
        },
        {
          title: "處理者",
          key: "sta_id",
          width:80,
          align: "left",
        },
        {
          title: "處理時間",
          key: "report_altertime",
          width:170,
          align: "left",
        },
      ],
      data: [],
    };
  },
  methods: {
    remove(index) {
      this.data.splice(index, 1);
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
    axios.get(`${import.meta.env.VITE_API_URL}/report.php`)
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  }
};
</script>
<style>
.trash {
  border: transparent;
  background-color: transparent;
}
</style>
