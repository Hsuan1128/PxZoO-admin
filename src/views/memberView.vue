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
        <Table
          stripe
          :columns="columns"
          ref="table"
          :data="data"
          class="custom-table"
        >
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>
          <template #status="{ row }">
            <Switch
              size="large"
              v-model="row.mem_status"
              :true-value="1"
              :false-value="0"
              true-color="#13ce66"
              false-color="#ff9900"
              @on-change="switchChange($event, row)"
            >
              <template #open>
                <span>正常</span>
              </template>
              <template #close>
                <span>停權</span>
              </template></Switch
            >
          </template>
        </Table>
      </div>
    </div>
    <grass />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
// import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import axios from "axios";
import { Table, Page, Switch } from "view-ui-plus";
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
          slot: "status",
          width: 100,
          align: "center",
        },
      ],
      data: [],
      rowdata: [],
      switchdata: {
        mem_id: "",
        mem_status: "",
      },
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
  methods: {
    switchChange(status, row) {
      console.log(status);
      this.updateStatusData(row);
    },
    updateStatusData(row) {
      this.switchdata = {
        mem_id: row.mem_id,
        mem_status: row.mem_status,
      };
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/memberStatusSwitch.php`,
          this.switchdata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          console.log(this.switchdata);
          // 提交成功後的處理
        })
        .catch((error) => {
          console.error("搜尋出錯:", error);
        });
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    Page,
  },
};
</script>
