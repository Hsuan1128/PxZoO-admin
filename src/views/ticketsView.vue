<template>
    <sidebar />
    <section class="staffArea">
      <div class="staffForm">
        <div class="titleSearch">
          <h2 class="pcSmTitle">門票管理</h2>
          <div class="searchArea">
            <button class="search pcInnerText">查詢</button>
            <div class="inputArea">
              <input type="text" placeholder="請輸入後台人員資訊" />
              <button class="scope">
                <img src="../assets/images/formicon/scope.svg" alt="scope" />
              </button>
            </div>
          </div>
        </div>
        <div class="formArea">
          <table class="formTable">
            <thead>
              <tr>
                <th v-for="title in titles" :key="title" class="pcInnerText">
                  {{ title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in lists" class="pcInnerText">
                <td>{{ list.num }}</td>
                <td>{{ list.title }}</td>
                <td>{{ list.email }}</td>
                <td>{{ list.acc }}</td>
                <td>{{ list.psw }}</td>
                <td><Switch /></td>
                <td>
                  <img :src="list.edit" alt="icon" />
                  <img v-if="list.remove" :src="list.remove" alt="icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="add">
          <img src="@/assets/images/formicon/plus.svg" alt="add" class="add" />
  
          <p class="pcInnerText">新增</p>
        </div>
      </div>
      <grass />
    </section>
  </template>
  
  <script>
  import sidebar from "@/components/sidebar.vue";
  import Switch from "@/components/switch.vue";
  import grass from "@/components/grass.vue";
  const revise = new URL("../assets/images/formicon/revise.svg", import.meta.url)
    .href;
  const rm = new URL("../assets/images/formicon/delete.svg", import.meta.url)
    .href;
  export default {
    data() {
      return {
        titles: ["No.", "職位", "信箱", "帳號", "密碼", "狀態", "刪改"],
        lists: [
          {
            num: "1",
            title: "超級管理員",
            email: "test@gmail.com",
            acc: "test",
            psw: "123",
            edit: revise,
            remove: "",
          },
          {
            num: "2",
            title: "管理員",
            email: "test@gmail.com",
            acc: "test",
            psw: "123",
            edit: revise,
            remove: rm,
          },
        ],
      };
    },
    components: {
      sidebar,
      Switch,
      grass,
    },
  };
  </script>
  