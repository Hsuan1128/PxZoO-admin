<template>

  <table>
    <caption>
      {{title}}
      <span>(單位: {{measure}})</span>
    </caption>

    <thead>
      <tr>
        <th>統計日期</th>
        <th v-for="(label, index) in labels" :key="index">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in frame" :key="i">
        <th :class="'option'+i">{{ item }}</th>
        <td v-for="(dataItem, index) in data[i]" :key="index">
          <span> {{ dataItem }} </span> 
        </td>
      </tr>
    </tbody>
  </table>
  
</template>

<script>

export default {
  props: {
    labels: Array,
    data: Array,
    frame: Array,
  },
  data() {
    return {
      title: '',
      measure: '',
    };
  },
  mounted(){
    if(this.frame[0].includes("金額")){
      this.title='銷售金額';
      this.measure='元';
    }else if(this.frame[0].includes("票券")) {
      this.title='入園人數';
      this.measure='人';
    }else{
      this.title='票種統計';
      this.measure='張';
    }
  },
}
</script>