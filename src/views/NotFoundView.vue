<template>
  <sidebar />
  <div class="staffArea notFound">
    <h1 class="errorTitle phDecBigTitle">
      404<br />
      ERROR
    </h1>
    <img
      src="../assets/images/404/cautionSign.svg"
      alt="cautionSign"
      class="cautionSign"
    />
    <img
      src="../assets/images/404/vetor_animal_chicken_4.svg"
      alt="errorChicken"
      class="errorChicken"
    />
    <img
      src="../assets/images/404/vetor_animal_alpaca.svg"
      alt="errorAlpaca"
      class="errorAlpaca"
    />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";

export default {
  components: {
    sidebar,
  },
};
</script>
