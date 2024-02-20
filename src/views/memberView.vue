<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">會員管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入會員資訊" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div>
      </div>
      <div class="formArea">
        <Table stripe :columns="columns" :data="data" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #action="{ row }">
            <Switch v-model="row.active" />
          </template>
        </Table>
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import axios from "axios";
import { Table, Page } from "view-ui-plus";
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
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      data: [],
    };
  },
  created() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/member.php`)
      .then((res) => {
        this.data = res.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {},
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    Page,
  },
};
</script>
<!-- <style>
@import "bootstrap/dist/css/bootstrap.css";
</style> -->
