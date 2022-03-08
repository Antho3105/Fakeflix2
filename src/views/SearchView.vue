<template>
  <main>
    <!-- <section class="conteneur">
      <p>Recherche détaillée non foncionnelle.</p>
      <FullSearch />
    </section> -->
    <section v-if="searching && searchResult.length > 0" class="conteneur">
      <h2>Resultats de recherche pour : {{ searchValue }}</h2>

      <ListView v-bind:filmList="searchResult" />
    </section>
    <section
      v-else-if="searching && searchResult.length == 0"
      class="conteneur"
    >
      <h2>Il n y'a aucun résultat pour : {{ searchValue }}</h2>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
// import FullSearch from "@/components/FullSearch.vue";
import ListView from "@/components/FilmList.vue";

export default {
  name: "MainArea",
  components: {
    // FullSearch,
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
h2 {
  margin: 0;
  padding-top: 15px;
}
@media screen and (max-width: 700px) {
  h2 {
    text-align: center;
  }
}
</style>