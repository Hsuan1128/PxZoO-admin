<template>
  <Space direction="vertical">
    <Space>
      <Switch
        size="large"
        true-color="#13ce66"
        false-color="#ff9900"
        v-model="value"
        @change="handleChange"
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
import apiInstance from "@/stores/acc"; // 請根據您的路徑設置正確的 API 實例路徑

export default {
  components: { Switch, Space },
  data() {
    return {
      value: true,
    };
  },
  methods: {
    handleChange(newValue) {
      this.$emit("change", newValue);
      const mem_status = newValue ? 1 : 0; // 如果開關為開啟狀態，mem_status 設置為 1，否則設置為 0
      // 發送 API 請求更新資料庫中的 mem_status
      apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/switch.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: { mem_status },
      })
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            // 在此處處理 API 請求成功後的邏輯
            console.log("資料庫更新成功");
          }
        })
        .catch((error) => {
          // 在此處處理 API 請求失敗後的邏輯
          console.error("資料庫更新失敗", error);
        });
    },
  },
};
</script>
