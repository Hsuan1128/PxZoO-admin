<template>
  <sidebar />
  <section class="staffArea">
    <div class="staffForm">
      <div class="titleSearch">
        <h2 class="pcSmTitle">門票管理xd</h2>
      </div>

      <div class="formArea">
        <Table stripe :columns="columns" :data="data" ref="table">
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
      data: [
        {
          tickets_id:"1",
          tickets_name:"成人票",
          tickets_price:"100",
          tickets_rule:"18~64歲",
          tickets_changetime:"2024/02/04 16:38:21"
        },
        {
          tickets_id:"2",
          tickets_name:"學生票",
          tickets_price:"80",
          tickets_rule:"12歲以上持學生證者",
          tickets_changetime:"2024/02/04 16:38:21"
        },
        {
          tickets_id:"3",
          tickets_name:"團體票",
          tickets_price:"60",
          tickets_rule:"15人以上適用",
          tickets_changetime:"2024/02/04 16:38:21"
        },
        {
          tickets_id:"4",
          tickets_name:"兒童票",
          tickets_price:"40",
          tickets_rule:"4~11歲",
          tickets_changetime:"2024/02/04 16:38:21"
        },
        {
          tickets_id:"5",
          tickets_name:"愛心票",
          tickets_price:"40",
          tickets_rule:"65歲以上",
          tickets_changetime:"2024/02/04 16:38:21"
        },
        
      ],
    };
  },
  methods: {
    updateReviseSwitch(newValue) {
      this.ReviseSwitch = newValue;
      this.$emit('change', this.ReviseSwitch);
    }
  },
  components: {
    sidebar,
    Switch,
    grass,
    Table,
    ticketsRevise,
  },
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
