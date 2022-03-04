<template>
  <main>
    <section id="watchList" class="conteneur">
      <h1>Page des films à voir</h1>
    </section>
  </main>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "WatchListView",
  components: {},
  created: function () {
    this.$store.dispatch("checkWatchList");
  },
  computed: mapState(["myWatchlist", "myFavorites"]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script> 