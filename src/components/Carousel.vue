<template>
  <section>
    <h3>Films populaires :</h3>
    <hooper id="carousel">
      <slide v-for="movie of carouselData" v-bind:key="movie.id">
        <router-link :to="/film/ + movie.id">
          <img v-if="movie.poster_path" :src="url(movie.poster_path)" alt="" />
          <img
            v-else
            :src="require('@/Images/image-non-disponible.png')"
            alt=""
          />
        </router-link>
      </slide>
    </hooper>
  </section>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import { mapState } from "vuex";

export default {
  name: "CarouselVue",
  components: {
    Hooper,
    Slide,
  },
  data: function () {
    return {
      // playSpeed: 10000,
      // autoPlay: true,
    };
  },
  computed: mapState(["carouselData"]),
  created: function () {
    this.$store.dispatch("getCarouselData");
  },
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script>

<style scoped>
* {
  color: white;
}
h6 {
  margin: 15px 0;
}
.hooper {
  height: auto;
}
</style>
