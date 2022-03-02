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
};
</script>

<style>
</style>