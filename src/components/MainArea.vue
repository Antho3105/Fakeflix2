<template>
  <section v-if="searching && searchResult.length > 0" class="search">
    <div class="flex">
      <h2>Resultats de recherche pour : {{ searchValue }} {{ loading }}</h2>
      <div id="loader" class="lds-spinner">
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
    <div class="flex">
      <figure
        v-for="movie of searchResult"
        v-bind:key="movie.id"
        :id="movie.id"
      >
        <router-link :to="/film/ + movie.id">
          <img v-if="movie.poster_path" :src="url(movie.poster_path)" alt="" />
          <img
            v-else
            :src="require('@/Images/image-non-disponible.png')"
            alt=""
          />
        </router-link>
        <figcaption>{{ movie.title }}</figcaption>
      </figure>
    </div>
  </section>
  <section v-else-if="searching && searchResult.length == 0" class="search">
    <h2>Il n y'a aucun résultat pour : {{ searchValue }}</h2>
  </section>
  <section v-else class="home">
    <h3>Bienvenue sur le site FakeFlix</h3>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainArea",
  computed: mapState(["searchResult", "searchValue", "searching", "loading"]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script> 

<style scoped>
.search,
.home {
  width: 70%;
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

.home {
  font-size: 30px;
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

i {
  font-size: 140px;
  margin-bottom: 35px;
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
</style>
