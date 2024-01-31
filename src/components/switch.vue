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
          <span>正常</span>
        </template>
        <template #close>
          <span>停權</span>
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
};
</script>
