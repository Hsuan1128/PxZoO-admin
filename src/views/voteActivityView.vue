<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">投票活動管理</h2>
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
        <Table stripe :columns="columns" :data="data" ref="table">
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
          key: "sta_id",
          align: "center",
        },
        {
          title: "職位",
          key: "sta_pos",
          width: 200,
          align: "center",
        },
        {
          title: "信箱",
          key: "sta_email",
          width: 180,
          align: "center",
        },
        {
          title: "帳號",
          key: "sta_acc",
        },
        {
          title: "密碼",
          key: "sta_psw",

          align: "center",
        },
        {
          title: "狀態",
          slot: "status",

          align: "center",
        },
        {
          title: "刪改",
          slot: "action",
          align: "center",
        },
      ],
      data: [
        {
          sta_id: "1",
          sta_pos: "超級管理員",
          sta_email: "test@gmail.com",
          sta_acc: "test",
          sta_psw: "123",
        },
        {
          sta_id: "2",
          sta_pos: "管理員",
          sta_email: "test@gmail.com",
          sta_acc: "test",
          sta_psw: "123",
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
