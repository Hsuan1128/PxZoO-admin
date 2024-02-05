<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">消息管理</h2>
        <div class="searchArea">
          <button class="search pcInnerText">查詢</button>
          <div class="inputArea">
            <input type="text" placeholder="請輸入消息資訊" />
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
          key: "news_id",
          width: 100,
          align: "left",
        },
        {
          title: "標題",
          key: "news_title",
          width: 200,
          align: "left",
        },
        {
          title: "類別",
          key: "news_type",
          width: 100,
          align: "left",
        },
        {
          title: "日期",
          key: "news_date",
          width: 140,
          align: "left",
        },
        {
          title: "圖片",
          key: "news_pic",
          align: "left",
        },
        {
          title: "描述",
          key: "news_text",
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
      data: [
        {
          news_id: "1",
          news_title: "動物明星新一輪投票即將啟動！",
          news_type: "最新活動",
          news_date: "2024.01.04",
          news_pic: "new_activity_1.png",
          news_text: "動物園即將迎來一場令人期待的「動物明星投票」活動！經過上一期12月的人氣投票，大象索拉、長頸鹿蘇菲和獅子威廉成功脫穎而出，成為前三名的熱門動物明星。這次的活動將提供遊客們一個難得的機會，以票選心中最喜愛的動物，讓牠們成為動物園的代表性明星。參與投票的遊客不僅能夠支持自己心目中的動物候選人，還有機會贏得豐富的獎品。動物園希望透過這次活動，拉進與遊客之間的距離，同時讓大家更深入認識動物園的居民。這場「動物明星投票」活動將成為動物園最新、最受期待的亮點之一。歡迎大家踴躍參與，共同打造一個充滿歡笑和驚喜的動物園體驗！",
        },
        {
          news_id: "2",
          news_title: "動物園為家人共度佳節與動物提供寧靜休息環境，宣布農曆新年休假",
          news_type: "園區動態",
          news_date: "2024.01.02",
          news_pic: "zoo_news_1.png",
          news_text: "動物園宣布，將在農曆除夕至初二期間暫停對外開放，讓工作人員有機會與家人共度新春佳節，並為動物提供一個寧靜的休息環境。雖然部分區域將休息，但我們鼓勵大眾在這段時間內，細細品味與親友相聚的溫馨時光。動物園也想藉此機會，衷心感謝大家一直以來對動物的支持與關注。期待在初三之後，再度歡迎各位遊客的蒞臨，一同探索動植物的奧秘，共同度過美好的時光。在這個特別的農曆新年，動物園祝福大家充滿喜悅，新的一年帶給你們健康、幸福與美好的時光。讓我們攜手迎接新年的曙光，共同期待更美好的未來。",
        },
        {
          news_id: "3",
          news_title: "兒童攝影大賽：小攝影師們快來動物園捕捉最美瞬間，贏得豐富獎品",
          news_type: "最新活動",
          news_date: "2023.12.29",
          news_pic: "new_activity_2.png",
          news_text: "動物園宣布舉辦兒童攝影大賽，鼓勵小攝影師們透過鏡頭捕捉動物園中最美的瞬間。這項賽事的宗旨在於啟發更多小朋友對於攝影藝術的熱愛，同時豐富他們對動物的認識。本次大賽的參賽資格為年滿6歲至12歲的兒童，參賽作品必須在動物園內拍攝，且主題必須與動物相關。評審團將從作品的創意、構圖、技術等方面進行評分，並選出前三名、優選獎和佳作獎。動物園希望透過這項活動，讓小朋友們有機會展現自己的攝影天賦，並透過觀察動物，增進對自然界的了解。同時，動物園也希望透過這項活動，讓更多人關注動物保育的重要性。",
        },
        {
          news_id: "4",
          news_title: "貓頭鷹的生活習性和獵食技巧，揭開夜間狩獵的神秘面紗",
          news_type: "動物知識",
          news_date: "2023.12.28",
          news_pic: "animal_knowledge_1.png",
          news_text: "貓頭鷹，是夜晚活躍的獵食者，其生活習性和獵食技巧令人嘆為觀止。這些神秘的猛禽在夜間展現出卓越的狩獵本領，主要以嚙齒類、昆蟲和小型哺乳動物為食。擁有特殊的聽覺結構，貓頭鷹能夠靈敏地捕捉獵物的細微聲音，並以無聲的飛行方式接近目標。其迅捷的狩獵技巧和夜行性生活使得猫頭鷹成為夜間狩獵中的佼佼者，同時也為夜晚的生態環境增添一抹神秘的色彩。觀察貓頭鷹的狩獵行為，讓我們更加謙卑地欣賞大自然中各種生物的獨特之處。這些優雅而高效的夜獵者，在黑夜中彷彿舞動著神秘的幕布，展現著生命力與自然之美。",
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
