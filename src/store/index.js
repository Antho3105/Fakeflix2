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
    sessionId: "",
    token: "",
    accountId: 0,
    myFavorites: [],
    myWatchlist: [],
    userId: "",
    userPwd: "",
  },
  getters: {

  },
  mutations: {
    //refactoriser en envoyant un objet
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
    },
    updateTokenId(state, value) {
      state.token = value
    },
    updateUser(state, value) {
      state.userId = value.id
      state.userPwd = value.pwd
    },
    updateSessionId(state, value) {
      state.sessionId = value
    },
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
    },
    getTokenId: function () {
      fetch(`${this.state.apiUrl}authentication/token/new?${this.state.apiKey}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json.request_token);
          this.commit("updateTokenId", json.request_token);
          this.dispatch("getTokenValidate", { id: this.state.userId, pwd: this.state.userPwd });
        });
    },
    getTokenValidate: function (context, user) {
      console.log(user)
      fetch(`${this.state.apiUrl}authentication/token/validate_with_login?${this.state.apiKey}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": user.id,
          "password": user.pwd,
          "request_token": this.state.token
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.commit("updateTokenId", json.request_token)
          this.dispatch("getSession", this.state.token);
        });
    },
    getSession: function (context, token) {
      fetch(`${this.state.apiUrl}authentication/session/new?${this.state.apiKey}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "request_token": token
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.commit("updateSessionId", json.session_id)
        });
    }
  },
  modules: {
  }
})
