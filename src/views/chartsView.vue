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
            :options="options1"  
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
            :options="options2"  
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
              <span>{{ peopleOpen ? "▼" : "▲" }}</span>
            </div>
            
            <p><span> 300 </span>人</p>

            <div class="empty">
              <!-- 匯入
              select ticktype, sum(qty) orders
              where tidate=selected
              group by ticktype
              join orders_detail -->
            </div>
          </section>
          
          <section class="tiqty" @click="toggle('tiqty')">
            <div>
              票種統計
              <span>{{ tiqtyOpen ? "▼" : "▲" }}</span>
            </div>
            <p><span> 300 </span>張</p>

            <div class="empty">
              <!-- 匯入
              select tiname, sum(qty)
              from orders
              where tidate=selected
              group by tiname
              join tickets
              join orders_detail  -->
            </div>
          </section>

          <section class="money" @click="toggle('money')">
            <div>
              銷售金額
              <span>{{ moneyOpen ? "▼" : "▲" }}</span>
            </div>
            <p><span> 5670 </span>元</p>
            <div class="empty">
              <!-- 匯入
              select sum(tiprice), sum(couprice), sum(payprice)
              from orders
              where tidate=selected -->
            </div>
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
                  <span v-show="this.datePickers[1].startDateData !== this.datePickers[1].endDateData">
                    <br v-if="comparison"> - {{this.datePickers[1].endDateData}}
                  </span>
                </th>
                <th class="option2" v-show="comparison">
                  {{this.datePickers[2].startDateData}}
                  <span v-show="this.datePickers[2].startDateData !== this.datePickers[2].endDateData">
                    <br>
                     - {{this.datePickers[2].endDateData}}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>實體票券</th>
                <td><span> 300 </span>人</td>
                <td v-show="comparison"><span> 400 </span>人</td>
              </tr>
              <tr>
                <th>數位票券</th>
                <td><span> 570 </span>人</td>
                <td v-show="comparison"><span> 420 </span>人</td>
              </tr>
            </tbody>
          </table>
          <main>我是圖表</main>
        </section>

        <section class="tiqty" v-show="tiqtyOpen">
          <table>
            <caption>票種統計</caption>
            <thead>
              <tr>
                <th>統計日期</th>
                <th class="option1">
                  {{this.datePickers[1].startDateData}}
                  <span v-show="this.datePickers[1].startDateData !== this.datePickers[1].endDateData">
                    <br v-if="comparison"> - {{this.datePickers[1].endDateData}}
                  </span>
                </th>
                <th class="option2" v-show="comparison">
                  {{this.datePickers[2].startDateData}}
                  <span v-show="this.datePickers[2].startDateData !== this.datePickers[2].endDateData">
                    <br>
                     - {{this.datePickers[2].endDateData}}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>成人票</th>
                <td><span> 300 </span>張</td>
                <td v-show="comparison"><span> 400 </span>張</td>
              </tr>
              <tr>
                <th>學生票</th>
                <td><span> 120 </span>張</td>
                <td v-show="comparison"><span> 30 </span>張</td>
              </tr>
              <tr>
                <th>團體票</th>
                <td><span> 450 </span>張</td>
                <td v-show="comparison"><span> 320 </span>張</td>
              </tr>
              <tr>
                <th>兒童票</th>
                <td><span> 12 </span>張</td>
                <td v-show="comparison"><span> 93 </span>張</td>
              </tr>
              <tr>
                <th>愛心票</th>
                <td><span> 15 </span>張</td>
                <td v-show="comparison"><span> 40 </span>張</td>
              </tr>
            </tbody>
          </table>
          <main>我是圖表</main>
        </section>

        <section class="money" v-show="moneyOpen">
          <table>
            <caption>銷售金額</caption>
            <thead>
              <tr>
                <th>統計日期</th>
                <th class="option1">
                  {{this.datePickers[1].startDateData}}
                  <span v-show="this.datePickers[1].startDateData !== this.datePickers[1].endDateData">
                    <br v-if="comparison"> - {{this.datePickers[1].endDateData}}
                  </span>
                </th>
                <th class="option2" v-show="comparison">
                  {{this.datePickers[2].startDateData}}
                  <span v-show="this.datePickers[2].startDateData !== this.datePickers[2].endDateData">
                    <br>
                     - {{this.datePickers[2].endDateData}}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>付款金額</th>
                <td><span> 5670 </span>元</td>
                <td v-show="comparison"><span> 7890 </span>元</td>
              </tr>
              <tr>
                <th>票券金額</th>
                <td><span> 1310 </span>元</td>
                <td v-show="comparison"><span> 9230 </span>元</td>
              </tr>
              <tr>
                <th>優惠金額</th>
                <td><span> 150 </span>元</td>
                <td v-show="comparison"><span> 470 </span>元</td>
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
      options1: {
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
      options2: {
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
        },
        2: {
          startDate: new Date(),
          endDate: new Date(),
          startDateData: null,
          endDateData: null,
        },
      },
      comparison: false,
      peopleOpen: true,
      tiqtyOpen: false,
      moneyOpen: false,
    }
  },
  methods: {
    toggle(chart){
      this[`${chart}Open`] = true; //模板字面量
      let chartArr = ['people', 'tiqty', 'money'];
      chartArr.forEach(string => {
        if(string !== chart){
          this[`${string}Open`] = false;
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
      // const picker = this.datepickers[num];
      this.datePickers[num].startDate=new Date();
      this.datePickers[num].endDate=new Date();
      
      this.datePickers[num].startDateData=this.initDateData();
      this.datePickers[num].endDateData=this.initDateData();
      // console.log(this.startDate1, this.endDate1, this.startDateData1, this.endDateData1);
    },
    getDateComputed(num, value){
      console.log(value);
      console.log('datepickers', this.datePickers);

      if (value.length === 2 && value[0] instanceof Date && value[1] instanceof Date){
        // console.log("true");
      //   // const picker = this.datepickers[num];
      //   // console.log("value", value);
        this.datePickers[num].startDate=value[0];
        this.datePickers[num].endDate=value[1];

      //   // console.log("startDate", this.startDate);
      //   // console.log("endDate", this.endDate);

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
      //   // console.log("startDateData", this.startDateData);
      //   // console.log("endDateData", this.endDateData);
      }
    },
    dateChange(){
      if(this.datePickers[2].startDateData !== this.datePickers[1].startDateData){
        this.comparison = true;
      }else{ this.comparison = false; }
    },
  },
  computed:{
    date1: {
      get() {},
      set(value) {
        this.getDateComputed(1, value);
        this.dateChange();
      },
    },
    date2: {
      get() {},
      set(value) {
        this.getDateComputed(2, value);
        this.dateChange();
      },
    },
  },
  created(){
    for (let i = 1; i <=  Object.keys(this.datePickers).length; i++) {
      // const picker = ;
      // console.log(`第${i}組開始日期`, picker);

      this.datePickers[i].startDateData = this.initDateData();

      // console.log(`第${i}組初始後`, picker.startDateData);
      this.datePickers[i].endDateData = this.initDateData();
    }
  },
};
</script>