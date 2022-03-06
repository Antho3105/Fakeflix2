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
      <ListView v-bind:filmList="searchResult" />
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
import ListView from "@/components/FilmList.vue";

export default {
  name: "MainArea",
  components: {
    FullSearch,
    ListView,
  },
  created: function () {
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
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
}

* {
  color: white;
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