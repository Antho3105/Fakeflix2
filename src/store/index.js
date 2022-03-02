import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: "https://api.themoviedb.org/3/",
    apiKey: "api_key=37b69fbb862d94bb3f20580f85d6dca7",
    language: "language=fr-FR",
    adult: "include_adult=false",
    searching: false,
    searchType: "",
    searchValue: "",
    searchResult: [],
  },
  getters: {

  },
  mutations: {
    updateSearching(state, value) {
      state.searching = value
    },
    updateSearchResult(state, value) {
      state.searchResult = value
    },
    updateSearchValue(state, value) {
      state.searchValue = value
    },
    updateSearchType(state, value) {
      state.searchType = value
    },
  },
  actions: {
    search: function () {
      if (this.state.searchValue) {
        fetch(`${this.state.apiUrl}search/${this.state.searchType}?${this.state.apiKey}&${this.state.language}&query=${this.state.searchValue}&page=1&${this.state.adult}`)
          .then((response) => response.json())
          .then((json) => this.commit("updateSearchResult", json.results));
      } else this.commit("updateSearchResult", "")
    },
  },
  modules: {
  }
})
