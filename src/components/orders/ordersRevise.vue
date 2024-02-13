<template>
    <div class="Revise_bg od" @click.self="closeRevise">
        <div class="Revise">
            <h1>訂單明細</h1>
            <div class="Revise_content">
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">姓名稱謂</label>
                    <input type="text" :placeholder="orderData.mem_name + '　' + orderData.mem_title" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">訂單編號</label>
                    <input type="text" :placeholder="orderData.ord_id" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">票券日期</label>
                    <input type="text" :placeholder="orderData.ord_tidate" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">票種數量</label>
                    <input type="text" :placeholder="formattedOrderDetailQty" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">優惠折抵</label>
                    <input type="text" :placeholder="orderData.cou_name" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">付款方式</label>
                    <input type="text" :placeholder="orderData.ord_payway" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">票券型態</label>
                    <input type="text" :placeholder="orderData.ord_ticktype" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">訂單金額</label>
                    <input type="text" :placeholder="formattedOrderDetailPrice" readonly>
                </div>
                <div class="Revise_content_align">
                    <label for="" class="pcInnerText">處理狀態</label>
                    <div class="alter">
                        <ordersSwitch v-if="ordStatus" 
                        :statusData="orderData.ord_status"
                        @newStatus="updateStatus"
                        />
                        <input v-else type="text" :placeholder="orderData.ord_status" readonly>
                    </div>
                </div>
                <div class="Revise_content_align" v-show="this.orderData.ord_altertime !== null">
                    <label for="" class="pcInnerText">更新情形</label>
                    <input type="text" :placeholder="formattedOrderDetailAlter" readonly>
                </div>
            </div>
            
            <div class="Revise_btns">
                <button v-show="ordStatus && this.orderData.ord_status !== this.alterStatus" class="defaultBtn pcInnerText" @click="orderSave">
                    儲存
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
        
                <button class="defaultBtn pcInnerText" @click="closeRevise">
                    返回列表
                    <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
                </button>
            </div>
        </div>

        <ordersConfirm v-show="openConfirm" 
        @confirmSave="orderSave" 
        @newAlterStatus="updateAlterStatus" 
        />

    </div>
</template>

<script>
import ordersSwitch from "@/components/orders/ordersSwitch.vue"
import ordersConfirm from "@/components/orders/ordersConfirm.vue"

export default {
    components: {
        ordersSwitch,
        ordersConfirm,
    },
    props:{
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
        updateStatus(status){
            this.alterStatus=status;
        },
        orderSave(){
            console.log(this.alterStatus);
            this.$emit('newDetail', 1 ,this.alterStatus, false);
        },
        closeRevise() {
            console.log('tests',this.alterStatus);
            if(this.alterStatus !== '' && this.orderData.ord_altertime === null){
                this.openConfirm=true;
            }else{
                this.$emit('closeRevise', false);
            }
            console.log('testf',this.alterStatus);
        },
        updateAlterStatus(){
            this.alterStatus='';
            this.closeRevise();
        },
    },
    computed:{
        formattedOrderDetailQty(){
            return this.orderDetailData.map((item)=> `${item.tickets_name} ${item.ord_detail_qty} 張`).join(" / ") + `，總計 ${this.orderData.allqty} 張`;
        },
        formattedOrderDetailPrice(){
            return `票卷金額 ${this.orderData.ord_tiprice} 元 / 優惠金額 ${this.orderData.ord_couprice} 元 / 付款金額 ${this.orderData.ord_payprice} 元`;
        },
        ordStatus(){
            return this.orderData.ord_status.includes("未");
        },
        formattedOrderDetailAlter(){
            return `${this.orderData.sta_pos} ${this.orderData.ord_altertime} 更新`;
        },
    },
    created(){
    },
};
</script>

<style lang="scss">

.od{
    .Revise{
        overflow-y: scroll;
        .Revise_btns{
            width: max-content;
            margin: 44px auto;
            gap: 40px;
        }
    }
    .alter{
        width: 85%;
        display: flex;
        gap: 20px;
        justify-content: space-between;
        align-items: center;
    }
    .Revise .Revise_content .Revise_content_align .alter{
        input{
            width: 100%;
        }
    }
}
</style>