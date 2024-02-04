<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">會員管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入後台人員資訊" />
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
        <template>
          <Page :total="100" />
        </template>
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
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
          width: 150,
          align: "left",
        },
        {
          title: "頭像",
          key: "mem_pic",
        },
        {
          title: "生日",
          key: "mem_birthbay",
          width: 110,
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
      data: [
        {
          mem_id: 1,
          mem_name: "喔挖",
          mem_title: "先生",
          mem_email: "123@gmail.com",
          mem_pic: "123.png",
          mem_birthbay: "2000/11/11",
          mem_phone: "0922111445",
        },
        {
          mem_id: 2,
          mem_name: "酷喔",
          mem_title: "先生",
          mem_email: "456@gmail.com",
          mem_pic: "456.png",
          mem_birthbay: "1990/11/11",
          mem_phone: "0928411445",
        },
        {
          mem_id: 3,
          mem_name: "欸欸",
          mem_title: "小姐",
          mem_email: "745@gmail.com",
          mem_pic: "452.png",
          mem_birthbay: "2004/11/11",
          mem_phone: "0922852445",
        },
        {
          mem_id: 4,
          mem_name: "哈哈",
          mem_title: "先生",
          mem_email: "789@gmail.com",
          mem_pic: "789.png",
          mem_birthbay: "2002/2/11",
          mem_phone: "0925211445",
        },
      ],
    };
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
