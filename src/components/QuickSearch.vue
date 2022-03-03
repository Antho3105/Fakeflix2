<template>
  <div id="search">
    <input
      placeholder="Recherche rapide"
      type="text"
      v-model="searchValue"
      @keypress.enter="search()"
      @input="search()"
    />
    <!-- <select name="type" id="" v-model="searchType">
      <option value="movie">Films</option>
      <option value="tv">Séries TV</option>
      <option value="person">Acteurs</option>
    </select> -->
  </div>
</template>

<script>
export default {
  name: "QuickSearch",
  data() {
    return {
      searchValue: "",
      searchType: "movie",
    };
  },
  computed: {},

  methods: {
    search: function () {
      if (this.$route.path != "/recherche") {
        this.$router.push({ name: "search" });
      }
      if (this.searchValue != "") {
        this.$store.commit("updateSearching", true);
        this.$store.commit("updateSearchValue", this.searchValue);
        this.$store.commit("updateSearchType", this.searchType);
        this.$store.dispatch("search");
      } else {
        this.$store.commit("updateSearching", false);
        this.$store.commit("updateSearchValue", this.searchValue);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 10px 10px;
  background-color: black;
  padding: 2px 10px;
  border-radius: 5px;
  color: white;
  background-color: red;
}
input,
select {
  color: black;
}
</style>


