<template>
  <main>
    <section id="favorites" class="conteneur">
      <h1>Mes films favoris</h1>
      <transition-group name="card" tag="div" class="flex">
        <figure
          v-for="movie of myFavorites"
          v-bind:key="movie.id"
          :id="movie.id"
        >
          <router-link :to="/film/ + movie.id">
            <img
              v-if="movie.poster_path"
              :src="url(movie.poster_path)"
              alt=""
            />
            <img
              v-else
              :src="require('@/Images/image-non-disponible.png')"
              alt=""
            />
          </router-link>
          <figcaption>{{ movie.title }}</figcaption>
        </figure>
      </transition-group>
    </section>
  </main>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "FavoriteView",

  computed: mapState(["myFavorites"]),
  created: function () {
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
  },
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script>


<style scoped>
figure {
  width: 150px;
  margin: 15px 5px;
  text-align: center;
}

figure a {
  text-decoration: none;
}

figcaption {
  text-align: center;
  object-fit: contain;
}
.card-item {
  display: inline-block;
}
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease-in-out;
}
.card-enter,
.card-leave-to {
  width: 0px;
  height: 0px;
  transform: scale(0);
}
</style>
