<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">門票管理</h2>
      </div>

      <div class="formArea">
        <Table stripe :columns="columns" :data="data" ref="table" class="custom-table">
          <template #name="{ row }">
            <strong> {{ row.name }}</strong>
          </template>

          <template #action="{ row, index }">
            <Button
              type="primary"
              class="trash"
              size="small"
              style="margin-right: 5px"
              @click="ReviseSwitch = !ReviseSwitch">
              <img src="../assets/images/formicon/revise.svg" alt=""/>
            </Button>
            
          </template>
        </Table>
      </div>
    </div>

    <ticketsRevise v-show="ReviseSwitch" :ReviseSwitch="ReviseSwitch" @update-switch="ReviseSwitch = $event"/>

    <grass />

  </section>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import Switch from "@/components/switch.vue";
import grass from "@/components/grass.vue";
import {Table} from "view-ui-plus";
import ticketsRevise from "@/components/ticketsRevise.vue"
import axios from 'axios';

export default {
  data() {
    return {
      ReviseSwitch:false,
      columns: [
        {
          title: "編號",
          key: "tickets_id",
          width:70,
        },
        {
          title: "門票名稱",
          key: "tickets_name",
        },
        {
          title: "門票票價",
          key: "tickets_price",
        },
        {
          title: "門票使用規則",
          key: "tickets_rule",
          width:170,
        },
        {
          title: "門票修改時間",
          key: "tickets_changetime",
          width:170,
        },
        {
          title: "刪改",
          slot: "action",
          align: "right",
        },
      ],
      data: [],
    };
  },
  methods: {
    updateReviseSwitch(newValue) {
      this.ReviseSwitch = newValue;
      this.$emit('change', this.ReviseSwitch);
    },
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    ticketsRevise,
  },
  created() {
    axios.get('http://localhost/phpLab/pxzoo/ticketsShow.php')
    .then(response => {
      this.data = response.data; // 假設返回的數據是一個數組
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  }
};
</script>

<style lang="scss">
.trash {
  border: transparent;
  background-color: transparent;
  &:hover{
    cursor: pointer;
  }
}
</style>
