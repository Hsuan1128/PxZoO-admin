<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm charts">
      <div class="titleSearch">
        <h2>銷售管理 | 銷售統計</h2>
        <div class="datePicker">
          <Space size="large" wrap>
            <DatePicker type="daterange"
            :start-date="new Date()"
            :options="dateOP1"  
            :editable="false" 
            format="yyyy/MM/dd" 
            placement="bottom-end" 
            placeholder="請選擇基準日期"
            style="width: 205px" 
            v-model="date1" 
            @on-clear="clearDate(1)"
            class="datePicker1" />

            <DatePicker type="daterange"
            :start-date="new Date()"
            :options="dateOP2"  
            :editable="false" 
            format="yyyy/MM/dd" 
            placement="bottom-end" 
            placeholder="請選擇比較日期"
            style="width: 205px" 
            v-model="date2" 
            @on-clear="clearDate(2)"
            class="datePicker2" />
          </Space>（雙擊日期即可選擇單日）
        </div>
      </div>
      <div class="formArea chartsHead">
          <section class="people" @click="toggle('people')">
            <div>
              入園人數
              <span>{{ open1 ? "▼" : "▲" }}</span>
            </div>
            <p><span> {{this.datePickers[1].totalPeople}} </span>人</p>
          </section>
          
          <section class="tiqty" @click="toggle('tiqty')">
            <div>
              票種統計
              <span>{{ open2 ? "▼" : "▲" }}</span>
            </div>
            <p><span> 300 </span>張</p>
          </section>

          <section class="money" @click="toggle('money')">
            <div>
              銷售金額
              <span>{{ open3 ? "▼" : "▲" }}</span>
            </div>
            <p><span> 5670 </span>元</p>
          </section>
      </div>
      <div class="formArea chartsBody">

        <section class="people" v-show="peopleOpen">
          <table>
            <caption>入園人數</caption>
            <thead>
              <tr>
                <th>統計日期</th>
                <th class="option1">
                  {{this.datePickers[1].startDateData}}
                  <span v-show="dateArr1">
                     - {{this.datePickers[1].endDateData}}
                  </span>
                </th>
                <th class="option2" v-show="comparison">
                  {{this.datePickers[2].startDateData}}
                  <span v-show="dateArr2">
                     - {{this.datePickers[2].endDateData}}
                  </span>
                </th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <th>實體票券</th>
              <td><span> {{this.datePickers[1].totalDigitalTicket}} </span>人</td>
              <td v-show="comparison"><span> {{this.datePickers[2].totalDigitalTicket}} </span>人</td>
            </tr>
            <tr>
              <th>數位票券</th>
              <td><span> {{this.datePickers[1].totalEntityTicket}} </span>人</td>
              <td v-show="comparison"><span> {{this.datePickers[2].totalEntityTicket}} </span>人</td>
            </tr>

          </tbody>
          </table>
          <main>我是圖表</main>
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
// import { stringifyQuery } from "vue-router";

export default {
  components: {
    sidebar,
    grass,
  },
  data() {
    return {
      dateOP1: {
        shortcuts: Array.from({ length: 12 }, (_, i) => {
          const start = new Date();
          start.setMonth(i, 1); // 設定為該月的第一天
          const end = new Date();
          end.setMonth(i + 1, 0); // 設定為該月的最後一天
          return {
            text: `今年 ${i + 1}月`,
            value: () => [start, end],
          };
        }),
      },
      dateOP2: {
        shortcuts: [
          {
            text: '今日',
            value () {
              return [new Date(), new Date()];
            },
          },
          {
            text: '昨日',
            value () {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
                return [date, date];
            },
          },
          {
            text: '明日',
            value () {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
                return [date, date];
            },
          },
          {
            text: '過去 7 天',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '過去 30 天',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: '過去 90 天',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      datePickers: {
        1: {
          startDate: new Date(),
          endDate: new Date(),
          startDateData: null,
          endDateData: null,
          people1: {},
          tiqty1: {},
          money1: {},
          totalDigitalTicket: 0,
          totalEntityTicket: 0,
          totalPeople: 0,

        },
        2: {
          startDate: new Date(),
          endDate: new Date(),
          startDateData: null,
          endDateData: null,
          people2: {},
          tiqty2: {},
          money2: {},
          totalDigitalTicket: 0,
          totalEntityTicket: 0,
        },
      },
      comparison: false,
      peopleOpen: true,
      open1: true,
      open2: false,
      open3: false,
    }
  },
  methods: {
    fetchChartData(num) {
      // 取得訂單明細資料
      axios.get(`${import.meta.env.VITE_API_URL}/chartsQtyShow.php`, {
        params: {
          startDate: this.datePickers[num].startDate.toLocaleDateString('en-CA'),
          endDate: this.datePickers[num].endDate.toLocaleDateString('en-CA'),
        }
      })
      .then(response => {
        // console.log('response',response);
        
        this.datePickers[num][`people${num}`] = response.data.result1;
        // console.log(typeof response.data.result1);
        console.log('人', this.datePickers[1]['people1']);
        // console.log('人0', this.datePickers[1]['people1'][0]);
        // console.log('typeof',typeof this.datePickers[1]['people1']);
        this.datePickers[num][`tiqty${num}`] = response.data.result2;
        this.datePickers[num][`money${num}`] = response.data.result3;
        this.getChartData(num);
        // console.log('chartData', this.datePickers[num].chartData);
        // this.tiqtyData = response.result2;
        // console.log(this.chartData);
        // console.log(this.tiqtyData);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      })
    },
    toggle(chart){
      this[`open${chart}`] = true; //模板字面量
      let chartArr = [1,2,3];
      chartArr.forEach(num => {
        if(num !== chart){
          this[`open${chart}`] = false;
        }
      })
    },
    initDateData(){
      const initDate = new Date();
      return initDate.toLocaleDateString('zh-TW', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
      });
    },
    clearDate(num){
      this.datePickers[num].startDate=new Date();
      this.datePickers[num].endDate=new Date();
      
      this.datePickers[num].startDateData=this.initDateData();
      this.datePickers[num].endDateData=this.initDateData();

      this.datePickers[num].totalDigitalTicket=0;
      this.datePickers[num].totalEntityTicket=0;
      this.datePickers[num].totalPeople=0;

    },
    getDateComputed(num, value){
      // console.log(value);
      // console.log('datepickers', this.datePickers);

      if (value.length === 2 && value[0] instanceof Date && value[1] instanceof Date){
        this.datePickers[num].startDate=value[0];
        this.datePickers[num].endDate=value[1];

        this.datePickers[num].startDateData=value[0].toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        this.datePickers[num].endDateData= value[1].toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }
    },
    dateChange(){
      if(this.datePickers[2].startDateData !== this.datePickers[1].startDateData){
        this.comparison = true;
      }else{ this.comparison = false; }
    },
    getChartData(num){
      console.log("get");
      
      // this.clearDate(num);

      this.datePickers[num][`people${num}`].forEach(item => {
        this.datePickers[num].totalDigitalTicket += parseInt(item.digitalTicket, 10);
        this.datePickers[num].totalEntityTicket += parseInt(item.entityTicket, 10);
        
      // console.log( this.datePickers[num].totalDigitalTicket, this.datePickers[num].totalEntityTicket);
      });
      this.datePickers[num].totalPeople = this.datePickers[num].totalDigitalTicket + this.datePickers[num].totalEntityTicket;
    }
  },
  computed:{
    dateArr1(){
      return this.datePickers[1].startDateData !== this.datePickers[1].endDateData;
    },
    dateArr2(){
      return this.datePickers[2].startDateData !== this.datePickers[2].endDateData;
    },
    date1: {
      get() {},
      set(value) {
        this.getDateComputed(1, value);
        this.dateChange();
        this.fetchChartData(1);
      },
    },
    date2: {
      get() {},
      set(value) {
        this.getDateComputed(2, value);
        this.dateChange();
        this.fetchChartData(2);
      },
    },
  },
  created(){
    // datePicker init
    for (let i = 1; i <=  Object.keys(this.datePickers).length; i++) {
      // 連接資料庫
      this.fetchChartData(i);

      // console.log('init', this.datePickers[i].startDate);
      // console.log('init', this.datePickers[i].startDate.toLocaleDateString('en-CA'));

      this.datePickers[i].startDateData = this.initDateData();
      this.datePickers[i].endDateData = this.initDateData();
    }

  },
};
</script>