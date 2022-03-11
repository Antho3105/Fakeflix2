<template>
  <hooper :settings="hooperSettings" id="carousel">
    <slide v-for="actor of actors" v-bind:key="actor.id">
      <figure>
        <router-link :to="/artiste/ + actor.id">
          <img
            v-if="actor.profile_path"
            :src="url(actor.profile_path)"
            alt=""
          />
          <img
            v-else
            :src="require('@/Images/image-non-disponible.png')"
            alt=""
          />
        </router-link>
        <figcaption>
          <h4>{{ actor.name }}</h4>
          <h5>{{ actor.character }}</h5>
        </figcaption>
      </figure>
    </slide>
  </hooper>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  props: ["actors"],
  name: "CarouselActors",
  components: {
    Hooper,
    Slide,
  },
  data: function () {
    return {
      hooperSettings: {
        itemsToShow: 4,
        autoPlay: true,
        playSpeed: 5000,
      },
    };
  },

  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500${link}`;
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
  width: 50vw;
}
figure {
  height: 250px;
}
img {
  width: 150px;
  object-fit: contain;
}

@media screen and (max-width: 800px) {
  img {
    height: 20vh;
  }
}
</style>
