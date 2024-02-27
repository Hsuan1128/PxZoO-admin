<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    labels: Array,
    data: Array,
    frame: Array,
  },
  data(){
    return{
      chartInstance: null,
      yMax: 0,
      yMin: 0,
      y2Max: 0,
      y2Min: 0,
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: this.frame[0], // 數據集的標籤
            data: this.data[0],
            borderColor: "#11a729",
            backgroundColor: "#11a729",
            order: 1,
          },
          {
            label: this.frame[1], // 數據集的標籤
            data: this.data[1],
            borderColor: "#008fc8",
            backgroundColor: "#008fc8",
            order: 2,
          },
          {
            label: this.labels[2], // 數據集的標籤
            data: this.data[2],
            borderColor: "#fed001",
            backgroundColor: "#fed001",
            order: 0,
            // type: 'line',
            pointStyle: "circle",
            fill: false, // 是否填滿底色
            pointRadius: 4, // 每個數據點的半徑為 10px
            pointHoverRadius: 8, // hover 時該點的半徑為 15px
            tension: 1, // 控制線條的平滑度。該值介於 0 和 1 之間。值越高，線條就越平滑
            cubicInterpolationMode: "monotone", // 使用立方插值模式來平滑線條
          },
        ],
      },
      options: {
        responsive: true, // 設置圖表是否響應大小變化
        plugins: {
          legend: {
            display: true,
            position: 'right', // 設置圖例的位置
          },
          title: {
            display: true, // 顯示標題
            text: '近 3 個月銷售金額統計', // 標題文字
            color: '#3f3f3f',
            font: {
              size: 14,
              family: "Montserrat",
              weight: '500',
            },
          },
        },
        scales: {
          y:{
            type: 'logarithmic', // 對數刻度
            min: 0, // 設定 y 軸的最小值
          }
        },
        animations: {
          radius: {
            duration: 500,
            easing: 'linear',
            loop: (context) => context.active
          }
        },
      },
    }
  },
  computed:{
    y(){
      const maxValues = this.data[0].map((value, index) => Math.max(value, this.data[1][index])); // 最高值
      const minValues = this.data[0].map((value, index) => Math.min(value, this.data[1][index])); // 最低值
      this.yMax= Math.ceil(maxValues); // 最高值無條件進位的值
      this.yMin = Math.floor(minValues); // 最低值無條件捨去的值
    },
    y2(){
      const maxValue = Math.max(...this.data[2]); // 最高值
      const minValue = Math.min(...this.data[2]); // 最低值
      this.y2Max= Math.ceil(maxValue); // 最高值無條件進位的值
      this.y2Min = Math.floor(minValue); // 最低值無條件捨去的值
    },
  },
  mounted() {
    // 獲取 canvas 元素的引用
    let chartRef = this.$refs.myChart;
    if (chartRef) {
      let ctx = chartRef.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {type: 'line', data: this.chartData, options: this.options});
        console.log('getContext 成功');
      } else {
        console.error('getContext 失敗');
      }
    } else {
      console.error('$refs.myChart 不存在');
    }
  },
  created(){},
}
</script>