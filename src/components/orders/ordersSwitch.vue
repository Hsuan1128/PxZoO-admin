<template>
  <Space direction="vertical">
    <Space>
      <Switch
        size="large"
        true-color="#13ce66"
        false-color="#ff9900"
        v-model="value"
        @change="bindStatus"
      >
        <template #open>
          <span v-text="statusData"></span>
        </template>
        <template #close>
          <span v-text="reverseStatus"></span>
        </template>
      </Switch>
    </Space>
  </Space>
</template>

<script>
export default {
  props:{
    statusData: {
        type: String,
        required: true,
    },
  },
  data() {
    return {
      value: true,
    };
  },
  methods:{
  },
  computed:{
    reverseStatus(){
      return this.statusData.replace("未","已");
    },
    bindStatus(){
      console.log('os: bindStatus', this.value ? this.statusData : this.reverseStatus);
      console.log('newStatus', this.value ? this.statusData : this.reverseStatus);
      
      this.$emit('newStatus', this.value ? this.statusData : this.reverseStatus);
    },
  },
};
</script>
<style lang="scss">
.ivu-switch-large {
  width: 66px;
  height: 23px;
}
.ivu-switch-large.ivu-switch-checked:after{
  left: 45px;
}
</style>