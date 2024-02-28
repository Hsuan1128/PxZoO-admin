<template>
  <div class="Revise_bg od" @click.self="closeRevise">
    <div class="Revise">
      <h1>訂單明細</h1>
      <div class="Revise_content pcInnerText">
        <div class="Revise_content_align">
          <label for="">姓名稱謂</label>
          <input type="text" class="revise_text" :value="orderData.mem_name + '　' + orderData.mem_title" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">訂單編號</label>
          <input type="text" class="revise_text" :value="orderData.ord_id" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">票券日期</label>
          <input type="text" class="revise_text" :value="orderData.ord_tidate" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">票種數量</label>
          <input type="text" class="revise_text" :value="formattedOrderDetailQty" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">優惠折抵</label>
          <input type="text" class="revise_text" :value="orderData.cou_name" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">付款方式</label>
          <input type="text" class="revise_text" :value="orderData.ord_payway" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">票券型態</label>
          <input type="text" class="revise_text" :value="orderData.ord_ticktype" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">訂單金額</label>
          <input type="text" class="revise_text" :value="formattedOrderDetailPrice" readonly>
        </div>
        <div class="Revise_content_align">
          <label for="">票券狀態</label>
          <div class="switch" v-if="ordStatus">
            <ordersSwitch :statusData="orderData.ord_status" @newStatus="updateStatus" />
          </div>
          <input v-else type="text" class="revise_text" :value="orderData.ord_status" readonly>
        </div>
        <div class="Revise_content_align" v-show="this.orderData.ord_altertime !== null">
          <label for="">更新情形</label>
          <input type="text" class="revise_text" :value="formattedOrderDetailAlter" readonly>
        </div>
      </div>

      <div class="Revise_btns">
        <button v-show="ordStatus && this.alterStatus !== false" class="defaultBtn pcInnerText" @click="orderSave">
          儲存
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="btn_decoration" />
        </button>

        <button class="defaultBtn pcInnerText" @click="closeRevise">
          返回列表
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="btn_decoration" />
        </button>
      </div>
    </div>

    <ordersConfirm v-show="openConfirm" @keepEdit="closeConfirm" @newAlterStatus="updateAlterStatus" />

  </div>
</template>

<script>
import ordersSwitch from "@/components/orders/ordersSwitch.vue"
import ordersConfirm from "@/components/orders/ordersConfirm.vue"

export default {
  components: {
    ordersSwitch, ordersConfirm,
  },
  props: {
    orderData: {
      type: Object,
      required: true,
    },
    orderDetailData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      alterStatus: false,
      openConfirm: false,
    };
  },
  methods: {
    updateStatus(status) {
      this.alterStatus = status;
    },
    orderSave() {
      this.$emit('newDetail', 1, this.alterStatus, false);
    },
    closeRevise() {
      if (this.alterStatus !== false && this.orderData.ord_altertime === null) {
        this.openConfirm = true;
      } else {
        this.$emit('closeRevise', false);
      }
    },
    updateAlterStatus() {
      this.alterStatus = false;
      this.$emit('closeRevise', false);
    },
    closeConfirm() {
      this.openConfirm = false;
    }
  },
  computed: {
    formattedOrderDetailQty() {
      return this.orderDetailData.map((item) => `${item.tickets_name} ${item.ord_detail_qty} 張`).join(" / ") + `，總計 ${this.orderData.allqty} 張`;
    },
    formattedOrderDetailPrice() {
      return `票卷金額 ${this.orderData.ord_tiprice} 元 - 優惠金額 ${this.orderData.ord_couprice} 元 = 付款金額 ${this.orderData.ord_payprice} 元`;
    },
    ordStatus() {
      const today = new Date();
      const currentHour = today.getHours();

      if (currentHour >= 17) {
        today.setDate(today.getDate() + 1);
      }

      today.setHours(0, 0, 0, 0);

      return (this.orderData.ord_status.includes("未") && new Date(this.orderData.ord_tidate) >= today);
    },
    formattedOrderDetailAlter() {
      return `${this.orderData.sta_pos} ${this.orderData.ord_altertime} 更新`;
    },
  },
};
</script>

<style lang="scss">
.od {
  .Revise {
    overflow-y: scroll;

    .Revise_btns {
      width: max-content;
      margin: 44px auto;
      gap: 40px;
    }
  }
  .switch{
    width: 100%;
  }
}
</style>