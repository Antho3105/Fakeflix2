<template>
  <main>
    <section id="home" class="conteneur flex">
      <MainArea />
      <SideColumn />
    </section>
  </main>
</template>

<script>
import MainArea from "@/components/MainArea.vue";
import SideColumn from "@/components/Column.vue";

export default {
  name: "HomeView",
  components: {
    MainArea,
    SideColumn,
  },
  created: function () {
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
  },
};
</script>

<style>
body {
  min-height: 90vh;
  background-image: url("@/Images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom center;
  background-attachment: fixed;
  box-shadow: inset 1500px 1500px rgba(0, 0, 0, 0.424);
}
</style>