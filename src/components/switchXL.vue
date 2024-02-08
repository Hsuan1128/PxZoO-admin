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
          <span>已用票</span>
        </template>
        <template #close>
          <span>未用票</span>
        </template>
      </Switch>
    </Space>
  </Space>
</template>

<script>
export default {
  props:{
    status: {
        type: String,
        required: true,
    },
  },
  data() {
    return {
      value: true,
    };
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