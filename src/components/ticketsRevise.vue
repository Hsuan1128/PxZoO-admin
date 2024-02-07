<template>
    <div class="ticketsRevise">
        <h1>編輯門票內容</h1>
        <div class="ticketsRevise_content">
            <div class="ticketsRevise_content_align">
                <label for="" class="pcInnerText">門票名稱</label>
                <input type="text" placeholder="學生票">
            </div>

            <div class="ticketsRevise_content_align">
                <label for="" class="pcInnerText">門票價錢</label>
                <input type="text" placeholder="40">
            </div>

            <div class="ticketsRevise_content_align">
                <label for="" class="pcInnerText">門票使用規則</label>
                <textarea class="ticketsRevise_textarea" placeholder="12歲以上持有學生票可使用"></textarea>
            </div>
        </div>
        
        <div class="ticketsRevise_btns">
            <button class="defaultBtn pcInnerText">
                儲存
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
    
            <button class="defaultBtn pcInnerText" @click="updateReviseSwitch">
                返回列表
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        ReviseSwitch:false,
    },
    data() {
    return {
        
    };
    },
    methods: {
        updateReviseSwitch() {
            this.$emit('update-switch', !this.ReviseSwitch);
        }
    },
    components: {
    },
};
</script>

<style lang="scss">
.ticketsRevise{
    width: 73.64vw;
    height: 32.5vw;
    background-color: #f5efeb;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%,-50%);
    z-index: 10;
    h1{
        margin-top: 3vw;
        text-align: center;
    }
    .ticketsRevise_content{
        width: 60.82vw;
        margin: 3vw auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2vw;
        .ticketsRevise_content_align{
            display: flex;
            width: 100%;
            label{
                margin-right: 20px;
                display: block;
                width: 15%;
            }
            input{
                width: 85%;
                height: 2vw;
            }
            .ticketsRevise_textarea{
                width: 85%;
                height: 10vw;
            }
        }
    }
    .ticketsRevise_btns{
        width: 280px;
        margin: 1.5vw auto 0;
        display: flex;
        justify-content: space-between;
    }
}
</style>