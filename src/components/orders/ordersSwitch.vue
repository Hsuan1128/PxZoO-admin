<template>
  <Space direction="vertical">
    <Space>
      <Switch
        size="large"
        true-color="#13ce66"
        false-color="#ff9900"
        v-model="value"
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
      reverseStatus: this.statusData.replace("未","已"),
    };
  },
  methods:{
    bindStatus(value){
      if(value){
        console.log("if");
        this.$emit('newStatus', false);
      }else{
        console.log("else");
        this.$emit('newStatus', this.reverseStatus);
      }
    },
  },
  watch:{
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.bindStatus(newValue);
      }
    }
  }
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