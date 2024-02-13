import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/scss/style.scss";

const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);

import { 
    Button, Table, Page, Space, Switch, DatePicker
    
    // Input, Select, Option, Upload, InputNumber, Badge,
} from 'view-ui-plus';
import "view-ui-plus/dist/styles/viewuiplus.css";

// import ViewUIPlus from "view-ui-plus";
import App from "./App.vue";
import router from "./router";

vueApp.component('Button', Button)
vueApp.component('Table', Table)
vueApp.component('Page', Page)
vueApp.component('Space', Space)
vueApp.component('Switch', Switch)
vueApp.component('DatePicker', DatePicker)
// vueApp.component('InputNumber', InputNumber)
// vueApp.component('Badge', Badge)

vueApp.mount("#app");
