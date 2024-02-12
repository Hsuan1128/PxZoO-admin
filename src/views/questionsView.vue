<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">學堂管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入學堂資訊" />
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
              @click="QuestionModification(row)">
              <img src="../assets/images/formicon/revise.svg" alt=""
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
      <div class="add"  @click="addSwitch = !addSwitch" >
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" >
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    <questionrevise v-show="ReviseSwitch" :rowdata="rowdata" :ReviseSwitch="ReviseSwitch" @update-switch="ReviseSwitch = $event"/>


<grass />
    <questionadd v-show="addSwitch" :addSwitch="addSwitch" @update-switch="addSwitch = $event"/>

<grass />
  </section>
</template>

<script>
import axios from 'axios';
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import questionadd from "@/components/questionadd.vue";
import questionrevise from "@/components/questionrevise.vue";

export default {
 
  data() {
    return {
     addSwitch: false,
      reviseSwitch: false,
      columns: [
        {
          title: "No.",
          key: "question_id",
          width: 70,
          align: "left",
        },
        {
          title: "題目內容",
          key: "question_text",
          color: "blue",
          width: 120,
          align: "left",
        },
        {
          title: "選項A",
          key: "question_option_a",
          width: 110,
          align: "left",
        },
        {
          title: "圖片A",
          key: "question_img_a",
          width: 110,
          align: "left",
        },
        {
          title: "選項B",
          key: "question_option_b",
          width: 110,
          align: "left",
        },
        {
          title: "圖片B",
          key: "question_img_b",
          width: 110,
          align: "left",
        },
        {
          title: "選項C",
          key: "question_option_c",
          width: 110,
          align: "left",
        },
        {
          title: "圖片C",
          key: "question_img_c",
          width: 110,
          align: "left",
        },
        {
          title: "選項D",
          key: "question_option_d",
          width: 110,
          align: "left",
        },
        {
          title: "圖片D",
          key: "question_img_d",
          width: 110,
          align: "left",
        },
        {
          title: "正確答案",
          key: "question_correctanswer",
          width: 110,
          align: "left",
        },
        {
          title: "答案解析",
          key: "question_answer_illustrate",
          width: 200,
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          width: 110,
          align: "left",
        },
        {
          title: "刪改",
          slot: "action",
          width: 130,
          align: "center",
        },
      ],
      data: [],
      rowdata:[]
     
    };
  },
  methods: {
    updateaddSwitch(newValue) {
      this.addSwitch = newValue;
      this.$emit('change', this.addSwitch);
    },
    QuestionModification(row){
      this.ReviseSwitch = !this.ReviseSwitch
      this.rowdata = row;
    },
remove(index) {
        const rowData = this.data[index]; // 獲取要刪除的資料列
        const question_id = rowData.question_id; // 假設資料中有一個名為 question_id 的欄位作為唯一標識

        // 向後端發送 DELETE 請求
        axios.delete(`${import.meta.env.VITE_API_URL}/questiondelete.php`, {
            data: { id: question_id } // 傳遞要刪除的資料列的 ID
        })
        .then(response => {
            // 成功刪除後處理前端資料
            this.data.splice(index, 1);
            console.log("資料已成功刪除");
        })
        .catch(error => {
            console.error("刪除資料時發生錯誤: ", error);
        });
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    questionadd,
    questionrevise,
},
  created(){
    axios.get(`${import.meta.env.VITE_API_URL}/questionShow.php`)
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
