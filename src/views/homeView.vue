<template>
  <sidebar />
  <div class="home">
    <img src="../assets/images/main/logo.svg" alt="logo" class="homeLogo" />
    <h1 class="welcome">WELCOME</h1>
    <div class="homeAnimals">
      <img
        src="../assets/images/main/vetor_animal_monkey.svg"
        alt="monkey"
        class="homeAnimal"
      />
      <img
        src="../assets/images/main/vetor_animal_rhino.svg"
        alt="rhino"
        class="homeAnimal"
      />
      <img
        src="../assets/images/main/vetor_animal_tiger.svg"
        alt="riger"
        class="homeAnimal"
      />
      <img
        src="../assets/images/main/vetor_animal_penguin.svg"
        alt="rhino"
        class="homeAnimal"
      />
      <img
        src="../assets/images/main/vetor_animal_polarbear.svg"
        alt="polarbear"
        class="homeAnimal"
      />
      <img
        src="../assets/images/main/vetor_animal_raccoon.svg"
        alt="raccoon"
        class="homeAnimal"
      />
    </div>
  </div>
</template>
<script>
import sidebar from "@/components/sidebar.vue";
export default {
  data() {
    return {};
  },
  components: {
    sidebar,
  },
};
</script>
