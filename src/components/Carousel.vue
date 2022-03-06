<template>
  <hooper :settings="hooperSettings" id="carousel">
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
      hooperSettings: {
        autoPlay: true,
        playSpeed: 5000,
      },
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
img {
  height: 45vh;
  object-fit: contain;
}

@media screen and (max-width: 800px) {
  img {
    height: 50vh;
  }
}
</style>
