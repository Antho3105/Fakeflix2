<template>
  <div id="search">
    <input
      placeholder="Recherche détaillée"
      type="text"
      v-model="searchValue"
      @keypress.enter="search()"
      @input="search()"
    />
  </div>
</template>

<script>
import { debounce } from "debounce";
export default {
  name: "FullSearch",
  data() {
    return {
      searchValue: "",
      searchType: "movie",
    };
  },
  computed: {},

  methods: {
    search: debounce(function () {
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
    }, 500),
  },
};
</script>

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


