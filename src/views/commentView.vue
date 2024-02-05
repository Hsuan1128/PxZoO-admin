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
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import { Table, Page } from "view-ui-plus";
export default {
  data() {
    return {
      columns: [
        {
          title: "編號",
          key: "com_id",
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
          width:180,
          align: "left",
        },
        {
          title: "狀態",
          slot: "status",
          align: "left",
        },
        // {
        //   title: "刪改",
        //   slot: "action",
        //   align: "center",
        // },
      ],
      data: [
        {
          com_id: "1",
          com_text: "這是我第三次造訪這個動物園，每次都有不同的驚喜！孩子們特別喜歡互動區，能近距離觀察動物真是太棒了！",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "2",
          com_text: "這個動物園的設施很棒，動物品種豐富多樣，但有些地方需要更多資訊牌，讓遊客更了解動物的生態習性。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "3",
          com_text: "我喜歡這個動物園的環境，很寧靜舒適。工作人員非常熱心，他們對動物的照顧真的很投入。強烈推薦！",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "4",
          com_text: "看到這麼多種類的動物很值得。我特別喜歡他們的猩猩區，能夠近距離觀察猩猩的行為真是太有趣了！",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "5",
          com_text: "這個動物園真的很適合家庭遊玩，有許多互動體驗讓孩子們玩得很開心。但是建議增加一些休息區域，讓遊客可以休息片刻再繼續探索。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "6",
          com_text: "動物園的環境很美，但是有些動物的展示區可能需要擴建。不過整體來說，是個不錯的地方，特別是他們的教育活動非常有意義。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "7",
          com_text: "這是我第一次來這個動物園，我完全愛上了！工作人員很親切，動物看起來都很幸福，這裡的氛圍令人感到愉悅。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "8",
          com_text: "動物園的設施和種類都很豐富，但是人流量有些大，特別是在假日。建議增加一些導覽團或者提供更多資訊，幫助遊客更好地欣賞動物。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "9",
          com_text: "這裡的設施非常乾淨整潔，動物看起來都很健康。但希望能增加一些飲料站或者小吃亭，方便遊客在觀賞動物時能夠休息補充能量。",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
        },
        {
          com_id: "10",
          com_text: "我是動物愛好者，這個動物園真的讓我感到驚艷！看到這麼多種類的動物，學到了很多新知識。下次還會再來！",
          com_pic: "2024.01.07.jpg",
          com_date: "2024-01-07  16:38:21",
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
