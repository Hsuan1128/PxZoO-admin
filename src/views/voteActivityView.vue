<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">投票管理|投票紀錄</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入投票活動資訊" />
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
      <div class="add">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" />

        <p class="pcInnerText">新增</p>
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
          key: "vote_activity_id",
          width: 70,
          align: "center",
        },
        {
          title: "活動名稱",
          key: "vote_activity_name", 
          width: 130,
          align: "left",
        },
        {
          title: "內容",
          key: "vote_activity_content",
          width: 160,
          align: "left",
        },
        {
          title: "年月",
          key: "vote_activity_date",
          width: 110,
          align: "left",
        },
        {
          title: "第一名動物",
          key: "animal_id_1",
          width: 110,
          align: "left",
        },
        {
          title: "第二名動物",
          key: "animal_id_2",
          width: 110,
          align: "left",
        },
        {
          title: "第三名動物",
          key: "animal_id_3",
          width: 110,
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
          slot: "action",
          width: 100,
          align: "center",
        },
      ],
      data: [
        {
          vote_activity_id: 1,
          vote_activity_name: "12月動物投票",
          vote_activity_content: "大象以其智慧...",
          vote_activity_date: "2023-12",
          animal_id_1: "威廉",
          animal_id_2: "索拉",
          animal_id_3: "曼陀",
        },
       
        {
          vote_activity_id: 2,
          vote_activity_name: "1月動物投票",
          vote_activity_content: "大象以其智慧...",
          vote_activity_date: "2024-1",
          animal_id_1: "威廉",
          animal_id_2: "索拉",
          animal_id_3: "曼陀",
        },
       
      ],
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
};
</script>
<style>
.trash {
  border: transparent;
  background-color: transparent;
}
</style>
