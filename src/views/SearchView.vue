<template>
  <main>
    <section class="conteneur">
      <p>Composant de recherche détaillée a construire</p>
      <FullSearch />
    </section>
    <section
      v-if="searching && searchResult.length > 0"
      class="search conteneur"
    >
      <div class="flex">
        <h2>Resultats de recherche pour : {{ searchValue }}</h2>
        <div v-if="loading" id="loader" class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <transition-group name="card" tag="div" class="flex">
        <figure
          v-for="movie of searchResult"
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
    <section
      v-else-if="searching && searchResult.length == 0"
      class="search conteneur"
    >
      <h2>Il n y'a aucun résultat pour : {{ searchValue }}</h2>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import FullSearch from "@/components/FullSearch.vue";

export default {
  name: "MainArea",
  components: {
    FullSearch,
  },
  created: function () {
    this.$store.dispatch("checkWatchList");
  },
  computed: mapState(["searchResult", "searchValue", "searching", "loading"]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script> 

<style scoped>
.search {
  width: 100%;
  text-align: left;
  background-repeat: no-repeat;
  background-size: contain;
  margin-bottom: 60px;
}
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

* {
  color: white;
}

.search img {
  max-height: 220px;
}

.search div:first-child {
  justify-content: flex-start;
}

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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