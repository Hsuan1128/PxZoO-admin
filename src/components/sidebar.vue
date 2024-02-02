<template>
  <div class="sidebar">
    <img
      src="@/assets/images/sidebar/logo.svg"
      alt="logo"
      class="sidebarLogo"
    />

    <ul class="outerList">
      <li>
        <img
          src="../assets/images/sidebar/user.svg"
          alt="staff"
          class="sidebarIcon"
        />
        <RouterLink to="/staff">後台管理</RouterLink>
      </li>
      <li>
        <img
          src="../assets/images/sidebar/staff.svg"
          alt="mem"
          class="sidebarIcon"
        />
        <RouterLink to="/">會員管理</RouterLink>
      </li>
      <li @click="toggle('message')">
        <img
          src="../assets/images/sidebar/commit.svg"
          alt="commit"
          class="sidebarIcon"
        />
        <p>留言管理</p>
        <span>{{ messageIsOpen ? "▲" : "▼" }}</span>
        <ul v-if="messageIsOpen" class="innerList">
          <li>
            <RouterLink to="/">會員留言</RouterLink>
          </li>
          <li>
            <RouterLink to="/">檢舉留言</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <img
          src="../assets/images/sidebar/animal.svg"
          alt="animal"
          class="sidebarIcon"
        />
        <RouterLink to="/">動物管理</RouterLink>
      </li>
      <li @click="toggle('vote')">
        <img
          src="../assets/images/sidebar/star.svg"
          alt="star"
          class="sidebarIcon"
        />
        <p>投票管理</p>
        <span> {{ voteIsOpen ? "▲" : "▼" }}</span>
        <ul v-if="voteIsOpen" class="innerList">
          <li>
            <RouterLink to="/">投票活動</RouterLink>
          </li>
          <li>
            <RouterLink to="/">投票紀錄</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <img
          src="../assets/images/sidebar/pencil.svg"
          alt="pencil"
          class="sidebarIcon"
        /><RouterLink to="/">學堂管理</RouterLink>
      </li>
      <li>
        <img
          src="../assets/images/sidebar/coupon.svg"
          alt="animal"
          class="sidebarIcon"
        /><RouterLink to="/">優惠管理</RouterLink>
      </li>
      <li>
        <img
          src="../assets/images/sidebar/ticket.svg"
          alt="animal"
          class="sidebarIcon"
        /><RouterLink to="/tickets">門票管理</RouterLink>
      </li>
      <li @click="toggle('sale')">
        <img
          src="../assets/images/sidebar/coin.svg"
          alt="animal"
          class="sidebarIcon"
        />
        <p>銷售管理</p>
        <span>{{ saleOpen ? "▲" : "▼" }}</span>
        <ul v-if="saleOpen" class="innerList">
          <li>
            <RouterLink to="/">訂單總覽</RouterLink>
          </li>
          <li>
            <RouterLink to="/">銷售統計</RouterLink>
          </li>
        </ul>
      </li>
      <li class="exit" @click="logout">
        <img src="../assets/images/sidebar/exit.svg" alt="exit" class="exit" />
        <p class="exitText">登出</p>
      </li>
    </ul>

    <img src="@/assets/images/sidebar/land.svg" alt="land" class="land" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageIsOpen: false,
      voteIsOpen: false,
      saleOpen: false,
    };
  },
  methods: {
    toggle(section) {
      if (section === "message") {
        this.messageIsOpen = !this.messageIsOpen;
      } else if (section === "vote") {
        this.voteIsOpen = !this.voteIsOpen;
      } else if (section === "sale") {
        this.saleOpen = !this.saleOpen;
      }
      // 可以继续添加其他部分的切换逻辑
    },
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
