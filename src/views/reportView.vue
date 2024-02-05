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
          width:180,
          align: "left",
        },
        {
          title: "處理狀態",
          key: "report_status",
          width:120,
          align: "left",
        },
        {//因為這個壞板
          title: "處理時間",
          key: "report_altertime",
          width:180,
          align: "left",
        },
      ],
      data: [
        {
          report_id: "1",
          report_text: "宣揚或促使暴力行為的內容。",
          report_type: "暴力",
          report_date: "2024-01-07  16:38:21",
          report_status: "未審核",
          report_altertime: "2024-01-10  16:38:21",
        },
        {
          report_id: "2",
          report_text: "裸露、色情內容或性暗示的內容。",
          report_type: "裸露",
          report_date: "2024-01-07  16:38:21",
          report_status: "審核未通過",
          report_altertime: "2024-01-10  16:38:21",
        },
        {
          report_id: "3",
          report_text: "任何涉及兒童的不當內容或性剝削。",
          report_type: "涉及兒童",
          report_date: "2024-01-07  16:38:21",
          report_status: "審核通過",
          report_altertime: "2024-01-10  16:38:21",
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
