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
      <div class="add" @click="questionadd">
        <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" >
        <p class="pcInnerText">新增</p>
      </div>
    </div>
    <grass />
    <!-- 新增問題對話框 -->
    <questionadd v-if="showquestionaddDialog" @close="showquestionaddDialog = false" />
  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
import questionadd from "@/components/questionadd.vue"

export default {
  data() {
    return {
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
          width: 110,
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
          width: 110,
          align: "center",
        },
      ],
      data: [
      {
        question_id: 1,
          question_text: "1.哪個動物天生沒有聲帶?",
          question_option_a: "長頸鹿",
          question_img_a: "giraffe.png",
          question_option_b: "無尾熊",
          question_img_b: "koala.png",
          question_option_c: "熊貓",
          question_img_c: "panda.png",
          question_option_d: "犀牛",
          question_img_d: "rhino.png",
          question_correctanswer: "長頸鹿",
          // question_answer_illustrate: "長頸鹿是沒有聲帶的。但是美國科學家的最新研究表明，長頸鹿事實上能夠彼此交談。我們聽不到它們的聲音是因為它們發出的聲音屬於次聲，次聲是一種低頻音波，遠遠低於人耳所能達到的聽力範圍。",
         
        },
        {
          question_id: 2,
          question_text: "2.樹懶至少需要幾星期消化食物?",
          question_option_a: "一個星期",
          question_img_a: "q1.png.png",
          question_option_b: "兩個星期",
          question_img_b: "q2.png",
          question_option_c: "三個星期",
          question_img_c: "q3.png",
          question_option_d: "四個星期",
          question_img_d: "q4.png",
          question_correctanswer: "兩個星期",
          // question_answer_illustrate: "樹懶是擁有非常緩慢的新陳代謝的動物，因此它們需要相當長的時間來消化食物。",
        },
      ],
      // 控制新增問題對話框的顯示狀態
      showquestionaddDialog: false,
    };
  },
  methods: {
    remove(index) {
      this.data.splice(index, 1);
    },
    questionadd() {
      this.showquestionaddDialog = true;
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    questionadd,
  },
};
</script>

<style>
.trash {
  border: transparent;
  background-color: transparent;
}
</style>
