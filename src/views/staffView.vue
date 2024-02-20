<template>
  <sidebar />
  <div class="add_list" v-if="addList">
    <staAdd />
  </div>

  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">後台管理</h2>
        <!-- <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入後台人員資訊" />
            <button class="scope">
              <img src="../assets/images/formicon/scope.svg" alt="scope" />
            </button>
          </div>
        </div> -->
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
          <template #action="{ row, index }" class="actionArea">
            <Button
              type="primary"
              class="trash"
              size="small"
              @click="staffModification(row)"
              ><img src="../assets/images/formicon/revise.svg" alt=""
            /></Button>
            <Button
              type="error"
              class="trash"
              size="small"
              @click="delSta(row, index)"
              ><img src="../assets/images/formicon/delete.svg" alt="" /></Button
          ></template>
        </Table>
      </div>
      <div class="add">
        <img
          src="@/assets/images/formicon/plus.svg"
          alt="add"
          class="add"
          @click="openAddLsit"
        />
      </div>
    </div>
    <staffRevise
      v-show="ReviseSwitch"
      :rowdata="rowdata"
      :ReviseSwitch="ReviseSwitch"
      @update-switch="ReviseSwitch = $event"
    />

    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import staAdd from "@/components/staffAdd.vue";
import { Table } from "view-ui-plus";
import axios from "axios";
import { mapActions } from "pinia";
import userStore from "@/stores/auth";
import staffRevise from "@/components/staffRevise.vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "sta_id",
          align: "left",
        },
        {
          title: "職位",
          key: "sta_pos",
          color: "blue",
          width: 200,
          align: "left",
        },
        {
          title: "信箱",
          key: "sta_email",
          width: 180,
          align: "left",
        },
        {
          title: "帳號",
          key: "sta_acc",
          align: "left",
        },
        {
          title: "密碼",
          key: "sta_psw",
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          align: "left",
        },
        {
          title: "刪改",
          width: 120,
          slot: "action",
          align: "center",
        },
      ],
      data: [],
      rowdata: [],
      show: false,
      addList: false,
      sta_id: "",
    };
  },
  created() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/staff.php`)
      .then((res) => {
        this.data = res.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  computed: {},
  methods: {
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
      "updatePosition",
    ]),
    staffModification(row) {
      //控制修改視窗的顯示/隱藏
      this.ReviseSwitch = !this.ReviseSwitch;
      //把我們所點擊的資料帶入rowdata的參數裡
      this.rowdata = row;
    },
    openAddLsit() {
      this.addList = true;
    },
    delSta(row, index) {
      if (confirm("確定要刪除嗎?")) {
        const formData = new FormData();
        formData.append("sta_id", row.sta_id);

        axios
          .post(`${import.meta.env.VITE_API_URL}/staffDelete.php`, formData)
          .then((res) => {
            console.log(res);
            if (!res.data.error) {
              alert(res.data.msg);
              this.data.splice(index, 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    staAdd,
    staffRevise,
  },
};
</script>
<style>
.trash {
  border: transparent;
  background-color: transparent;
}
#test {
  position: absolute;
  top: 0;
  right: 50px;

  z-index: 10000;
}

.add_list {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
