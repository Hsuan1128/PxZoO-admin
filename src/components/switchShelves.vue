<template>
  <Space direction="vertical">
    <Space>
      <Switch
        size="large"
        true-color="#13ce66"
        false-color="#ff9900"
        v-model="value"
        :value="value"
        @on-change="handleChange"
      >
        <template #open>
          <span>上架</span>
        </template>
        <template #close>
          <span>下架</span>
        </template>
      </Switch>
    </Space>
  </Space>
</template>

<script>
import { Space, Switch } from "view-ui-plus";
export default {
  components: { Switch, Space },
  data() {
    return {
      value: true,
    };
  },
    methods:{
      handleChange(value){
        console.log("here");
        this.$emit('value',value);
      }
    }
};
</script>
