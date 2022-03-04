<template>
  <section id="column">
    <CarouselVue />
  </section>
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
