<template>
  <aside id="column">
    <h3>Films populaires</h3>
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
  width: 35%;
  text-align: center;
  font-size: 30px;
}
* {
  color: white;
}
h3 {
  margin: 0;
  padding-top: 15px;
  padding-bottom: 20px;
}
@media screen and (max-width: 800px) {
  #column {
    width: 95%;
  }
}
</style>
