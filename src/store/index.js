import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: process.env.VUE_APP_SERVER,
    version: process.env.VUE_APP_VERSION,
    appId: process.env.VUE_APPID,


    apiUrl: "https://api.themoviedb.org/3/",
    apiKey: "api_key=37b69fbb862d94bb3f20580f85d6dca7",
    language: "language=fr-FR",
    adult: "include_adult=false",
    searching: false,
    searchType: "",
    searchValue: "",
    searchResult: [],
    loading: false,
    carouselData: [],
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
    updateLoading(state, value) {
      state.loading = value
    },
    updateCarouselData(state, value) {
      state.carouselData = value
    }
  },
  actions: {
    search: async function () {
      if (this.state.searchValue) {
        this.commit("updateLoading", true)
        await fetch(`${this.state.apiUrl}search/${this.state.searchType}?${this.state.apiKey}&${this.state.language}&query=${this.state.searchValue}&page=1&${this.state.adult}`)
          .then((response) => response.json())
          .then((json) => this.commit("updateSearchResult", json.results));
        this.commit("updateLoading", false);
      } else this.commit("updateSearchResult", "")
    },
    getCarouselData: function () {
      fetch(`${this.state.apiUrl}discover/movie?${this.state.apiKey}&${this.state.language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then((response) => response.json())
        .then((json) => this.commit("updateCarouselData", json.results));
    }
  },
  modules: {
  }
})
