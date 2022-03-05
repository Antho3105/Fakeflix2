<template>
  <aside id="column">
    <h3>Films populaires :</h3>
    <CarouselVue />
  </aside>
</template>

<script>
import CarouselVue from "@/components/Carousel.vue";
export default {
  name: "SideColumn",
  components: {
    CarouselVue,
  },
};
</script>

<style scoped>
#column {
  width: 25%;
  text-align: center;
  font-size: 30px;
}
* {
  color: white;
}
</style>
