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
            type: 'line',
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
            text: '近 3 個月入園人數統計', // 標題文字
            color: '#3f3f3f',
            font: {
              size: 14,
              family: "Montserrat",
              weight: '500',
            },
          },
        },
        scales: {
          x: {
            stacked: true, // 將柱狀圖堆疊
          },
          y: {
            stacked: true, // 將柱狀圖堆疊
            min: 0, // 設定 y 軸的最小值
          },
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
  mounted() {
    // 獲取 canvas 元素的引用
    let chartRef = this.$refs.myChart;
    if (chartRef) {
      let ctx = chartRef.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {type: 'bar', data: this.chartData, options: this.options});
        console.log('getContext 成功');
      } else {
        console.error('getContext 失敗');
      }
    } else {
      console.error('$refs.myChart 不存在');
    }
  },
  created(){},
};
</script>
