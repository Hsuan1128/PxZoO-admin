<template>
  <sidebar />
  <!-- <input type="text" name="" id="test" v-model="userPosition" /> -->
  <staAdd v-if="aa" />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">後台管理</h2>
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
              @click="show(index)"
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
          @click="showSta"
        />
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import staAdd from "@/components/staffAdd.vue";
import { Table, Page } from "view-ui-plus";
import axios from "axios";
import apiInstance from "@/stores/acc";
import { mapActions } from "pinia";
import userStore from "@/stores/auth";
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
          slot: "action",
          align: "center",
        },
      ],
      data: [],
      show: false,
      aa: false,
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
  computed: {
    userPosition() {
      return userStore().position; // 使用 userStore().position
    },
  },
  methods: {
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
      "updatePosition",
    ]),
    staffDelete(dataId) {
      apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/deleteData.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: { sta_id: dataId },
      })
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            if (res.data.code == 1) {
              alert("删除成功");
              // 在这里可以执行其他操作，如更新界面等
            } else {
              alert("删除失败");
            }
          }
        })
        .catch((error) => {
          console.error("出现错误:", error);
        });
    },

    showSta() {
      this.aa = !this.aa;
    },
    delSta(row, index) {
      if (confirm("確定要刪除嗎?")) {
        const formData = new FormData();
        formData.append("sta_id", row.sta_id);

        axios
          .post(`${import.meta.env.VITE_API_URL}/deleteData.php`, formData)
          .then((res) => {
            console.log(res);
            if (!res.data.error) {
              alert(res.data.msg);
              // 删除成功后，更新数据源中的数据
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
/* 
position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000; */
</style>
