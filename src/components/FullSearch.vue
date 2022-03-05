<template>
  <div id="search">
    <input
      placeholder="Recherche détaillée"
      type="text"
      v-model="searchValue"
      @keypress.enter="search()"
    />
    <select v-model="searchType" name="Type" id="type">
      <option value="movie" selected>Film</option>
      <option value="tv">Série TV</option>
      <option value="person">Artistes</option>
    </select>
    <br />
    <label for="adult">Contenu adulte</label>
    <input v-model="adult" name="adult" v-bind:value="true" type="radio" /> Oui
    <input
      v-model="adult"
      name="adult"
      v-bind:value="false"
      type="radio"
      checked
    />
    Non
    <br />
    <label for="language">Langue</label>
    <select v-model="language" name="language" id="language">
      <option value="fr-FR">Francais</option>
      <option value="en-EN">Anglais</option>
      <option value="es-ES">Espagnol</option>
    </select>
    <br />
    <button id="search">Recherche</button>
  </div>
</template>

<script>
import { debounce } from "debounce";
import router from "@/router";
export default {
  name: "FullSearch",
  data() {
    return {
      searchValue: "",
      searchType: "movie",
      adult: false,
      language: "fr-FR",
    };
  },
  computed: {},

  methods: {
    search: debounce(function () {
      if (this.$route.path != "/recherche") {
        router.push("/");
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


