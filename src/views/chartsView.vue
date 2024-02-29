<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm charts" v-if="loaded">
      <div class="titleSearch">
        <h2>銷售管理 | 銷售統計</h2>
      </div>
      <div class="formArea chartsHead">
          <section :class="{click: peopleOpen}" @click="toggle('people')">
            <div>
              入園人數
              <span>{{ peopleOpen ? "▼" : "▲" }}</span>
            </div>
            <p><span> {{ formatPeople[2][2] }} </span> 人</p>
          </section>
          
          <section :class="{click: tiqtyOpen}" @click="toggle('tiqty')">
            <div>
              票種統計
              <span>{{ tiqtyOpen ? "▼" : "▲" }}</span>
            </div>
            <p><span> {{ formatTicket[5][2] }} </span> 張</p>
          </section>

          <section :class="{click: moneyOpen}" @click="toggle('money')">
            <div>
              銷售金額
              <span>{{ moneyOpen ? "▼" : "▲" }}</span>
            </div>
            <p><span> {{ formatMoney[2][2] }} </span> 元</p>
          </section>
      </div>
      <div class="formArea chartsBody">

        <section class="people" v-if="peopleOpen">
          <chartTable :labels="labels" :data="formatPeople" :frame="peopleFrame" />
          <peopleChart :labels="labels" :data="people" :frame="peopleFrame"/>
        </section>

        <section class="tiqty" v-if="tiqtyOpen">
          <chartTable :labels="labels" :data="formatTicket" :frame="ticketFrame" />
          <ticketChart :labels="labels" :data="ticket" :frame="ticketFrame"/>
        </section>

        <section class="money" v-if="moneyOpen">
          <chartTable :labels="labels" :data="formatMoney" :frame="moneyFrame" />
          <moneyChart :labels="labels" :data="money" :frame="moneyFrame"/>
        </section>

      </div>
    </div>
      
    <grass />
  </section>
</template>
  
<script>
import axios from 'axios';
import sidebar from "@/components/sidebar.vue";
import grass from "@/components/grass.vue";
import chartTable from "@/components/charts/chartTable.vue";
import peopleChart from "@/components/charts/peopleChart.vue";
import ticketChart from "@/components/charts/ticketChart.vue";
import moneyChart from "@/components/charts/moneyChart.vue";

export default {
  components: {
    sidebar, grass, chartTable, peopleChart, 
    ticketChart, moneyChart, 
  },
  data() {
    return {
      peopleOpen: true,
      tiqtyOpen: false,
      moneyOpen: false,
      loaded: false,
      people: {},
      formatPeople:{},
      ticket: {},
      formatTicket:{},
      money: {},
      formatMoney:{},
      labels: ["上上月", "上月", "本月"],
      peopleFrame: ["數位票券", "實體票券", "人數總計"],
      ticketFrame: ["成人票", "學生票", "團體票", "兒童票", "愛心票", "票數總計"],
      moneyFrame: ["票券金額", "優惠金額", "收入總計"],
    }
  },
  methods: {
    async fetchPeopleData() {
      try{ // 取得入園人數資料
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/chartPeople.php`);
        let data = this.formatFetchData(response.data);

        this.people = JSON.parse(JSON.stringify(data));
        // 使用 JSON.parse 和 JSON.stringify 實現深拷貝
        // 回傳資料順序: digitalTicket、entityTicket、peopleTotal 

        this.formatPeople = this.formatNumber(data);
        // 將數字千分位格式化

      }catch(error){
        console.error('this', error);
      }
    },
    async fetchTicketData() {
      try{ // 取得票種銷售資料
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/chartTicket.php`);
        let data = this.formatFetchData(response.data);

        this.ticket=JSON.parse(JSON.stringify(data));
        // 使用 JSON.parse 和 JSON.stringify 實現深拷貝
        // 回傳資料順序: 成人票、學生票、團體票、兒童票、愛心票、總計

        this.formatTicket=this.formatNumber(data);
        // 將數字千分位格式化

      }catch(error){
        console.error(error);
      }
    },
    async fetchMoneyData() {
      try{ // 取得金額統計資料
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/chartMoney.php`);
        let data = this.formatFetchData(response.data);

        this.money=JSON.parse(JSON.stringify(data));
        // 使用 JSON.parse 和 JSON.stringify 實現深拷貝
        // 回傳資料順序: tiprice、couprice、payprice

        this.formatMoney=this.formatNumber(data);
        // 將數字千分位格式化

        this.loaded=true;

      }catch(error){
        console.error(error);
      }
    },
    formatFetchData(fetchData){
      let sortData=[];

      let formatData = fetchData.map(array => {
        // 移除每個陣列的第一個元素(日期)
        array.shift();
        // 將剩餘的元素映射為數字
        return array.map(Number);
      });

      // 按照圖表需求重新排列資料
      for(let i=0; i<formatData[0].length; i++){
        sortData[i] = formatData.map(array=>array[i]);
      }

      return sortData;

    },
    formatNumber(payload){
      if(!Array.isArray(payload)){
        payload= Object.values(payload);
      }

      for (let i = 0; i < payload.length; i++) {
        for (let j = 0; j < payload[i].length; j++) {
          payload[i][j]=payload[i][j].toLocaleString('zh-TW', { useGrouping: true });
        }
      }
      return payload;
    },
    toggle(chart){
      this[`${chart}Open`] = true; //模板字面量
      let chartArr = ['people','tiqty','money'];
      chartArr.forEach(name => {
        if(name !== chart){
          this[`${name}Open`] = false;
        }
      })
    },
  },
  created(){
    this.fetchPeopleData();
    this.fetchTicketData();
    this.fetchMoneyData();
  },
};
</script>