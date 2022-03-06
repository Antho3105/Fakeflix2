<template>
  <main>
    <section id="watchList" class="conteneur">
      <h1>Mes films à voir</h1>
      <ListView v-bind:filmList="myWatchList" />
    </section>
  </main>
</template>


<script>
import { mapState } from "vuex";
import ListView from "@/components/FilmList.vue";

export default {
  name: "WatchListView",
  components: {
    ListView,
  },
  created: function () {
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
  },
  computed: mapState(["myWatchList"]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script> 



<style scoped>
h1 {
  margin: 0;
  padding-top: 15px;
}
@media screen and (max-width: 700px) {
  h1 {
    text-align: center;
  }
}
</style>
