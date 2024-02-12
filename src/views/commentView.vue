<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">留言管理 | 會員留言</h2>
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
import Switch from "@/components/switchShelves.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import axios from 'axios';
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "com_id",
          width: 70,
          align: "left",
        },
        {
          title: "留言內容",
          key: "com_text",
          width: 450,
          align: "left",
        },
        {
          title: "留言照片",
          key: "com_pic",
          width: 180,
          align: "left",
        },
        {
          title: "留言時間",
          key: "com_date",
          width: 180,
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          width: 110,
          align: "left",
        },
        // {
        //   title: "刪改",
        //   slot: "action",
        //   align: "center",
        // },
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
    axios.get(`${import.meta.env.VITE_API_URL}/commentShow.php`)
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
