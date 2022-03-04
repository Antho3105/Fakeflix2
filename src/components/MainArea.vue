<template>
  <section class="home">
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
.home {
  width: 70%;
  text-align: left;
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 30px;
}
* {
  color: white;
}
</style>
