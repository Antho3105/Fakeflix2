import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    server: process.env.VUE_APP_SERVER,
    version: process.env.VUE_APP_VERSION,
    appId: process.env.VUE_APPID,


    apiUrl: "https://api.themoviedb.org/3/",
    apiKey: "api_key=37b69fbb862d94bb3f20580f85d6dca7",
    language: "fr-FR",
    adult: false,
    searching: false,
    searchType: "",
    searchValue: "",
    searchResult: [],
    loading: false,
    carouselData: [],
    sessionId: "",
    sessionExpiration: "",
    token: "",
    accountId: 0,
    myFavorites: [],
    myWatchList: [],
    userId: "",
    userPwd: "",
    userName: "",
    isLogged: false,
    loggingError: "",
    modalReveal: false,
    adultConsent: null,
  },


  //--- getters-------------------------------------------------------


  getters: {
    favoritesFilmsId(state) {
      return (state.myFavorites.length > 0) ? state.myFavorites.map(movie => movie.id) : [];
    },
    watchListFilmsId(state) {
      return (state.myWatchList.length > 0) ? state.myWatchList.map(movie => movie.id) : [];
    },
  },


  //------mutation (commit) -----------------------------

  mutations: {
    //refactoriser en envoyant un objet --->
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
    // <-----jusque ici
    updateCarouselData(state, value) {
      state.carouselData = value
    },
    updateTokenId(state, value) {
      state.token = value
    },
    updateSessionExpiration(state, value) {
      state.sessionExpiration = value
    },
    updateUser(state, value) {
      state.userId = value.id
      state.userPwd = value.pwd
    },
    updateSessionId(state, value) {
      state.sessionId = value
    },
    updateAccountId(state, value) {
      state.accountId = value.id
      state.userName = value.userName
      if (this.state.accountId != 0) state.isLogged = true
      else state.isLogged = false
    },
    clearSession(state, value) {
      if (value) {
        state.sessionId = ""
        state.token = ""
        state.accountId = 0
        state.userId = ""
        state.userPwd = ""
        state.userName = ""
        state.isLogged = false
        state.loggingError = "D??connect??"
        state.searching = false,
          state.searchType = "",
          state.searchValue = "",
          state.searchResult = [],
          state.carouselData = [],
          state.myFavorites = [],
          state.myWatchList = [],
          state.sessionExpiration = ""
      }
    },
    updateMyFavorites(state, value) {
      this.state.myFavorites = value
    },
    updateMyWatchList(state, value) {
      this.state.myWatchList = value
    },
    updateLoggingError(state, value) {
      if (value == 26) this.state.loggingError = "Merci de fournir un identifiant et un mot de passe"
      else if (value == 30) this.state.loggingError = "Identifiant et/ou mot de passe invalide"
      else if (value == 0) this.state.loggingError = "Connect??"
      else if (value == -1) this.state.loggingError = "Derni??re connexion > 1h merci de vous reconnecter"
      else this.state.loggingError = "Connection refus??e"
    },

    updateDataLs(state, value) {
      this.state.sessionExpiration = value.sessionExpiration
      this.state.accountId = value.accountId,
        this.state.sessionId = value.sessionId,
        this.state.userName = value.userName,
        this.state.isLogged = true,
        this.state.loggingError = "Connect??"
    },

    modalReveal(state, value) {
      this.state.modalReveal = value
    },
    adultConsent(state, value) {
      this.state.adultConsent = value
    },

  },

  //------------- actions (dispatch) ---------------------------------------------
  actions: {
    // recherche films
    search: async function () {
      if (this.state.searchValue) {
        this.commit("updateLoading", true)
        await fetch(`${this.state.apiUrl}search/${this.state.searchType}?${this.state.apiKey}&language=${this.state.language}&query=${this.state.searchValue}&page=1&include_adult=${this.state.adult}`)
          .then((response) => response.json())
          .then((json) => this.commit("updateSearchResult", json.results));
        this.commit("updateLoading", false);
      } else this.commit("updateSearchResult", "")
    },

    // recuperation fe films pour le carrousel
    getCarouselData: function () {
      fetch(`${this.state.apiUrl}discover/movie?${this.state.apiKey}&language=${this.state.language}&sort_by=popularity.desc&include_adult=${this.state.adult}&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then((response) => response.json())
        .then((json) => this.commit("updateCarouselData", json.results));
    },

    //-----------------------------------------
    //------ D??but zone d'autentification------
    //-----------------------------------------
    getTokenId: function () {
      fetch(`${this.state.apiUrl}authentication/token/new?${this.state.apiKey}`)
        .then((response) => response.json())
        .then((json) => {
          this.commit("updateTokenId", json.request_token);
          this.commit("updateSessionExpiration", json.expires_at);
          this.dispatch("getTokenValidate", { id: this.state.userId, pwd: this.state.userPwd });
        })
        .catch((error) => console.log("erreur " + error));
    },
    getTokenValidate: function (context, user) {
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
          if (json.success) {
            this.commit("updateTokenId", json.request_token);
            this.dispatch("getSession", this.state.token);
            this.commit("updateLoggingError", 0);
          } else this.commit("updateLoggingError", json.status_code)
        })
        .catch((e) => console.log("erreur " + e));
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
          this.commit("updateSessionId", json.session_id)
          this.dispatch("getAccountID", this.state.sessionId);
        })
        .catch((e) => console.log("erreur " + e));
    },
    getAccountID: function (context, sessionId) {
      fetch(`${this.state.apiUrl}account?${this.state.apiKey}&session_id=${sessionId}`)
        .then((response) => response.json())
        .then((json) => {
          this.commit("updateAccountId", { id: json.id, userName: json.name });
          this.dispatch("toLocalStorage")
        })
        .catch((e) => console.log("erreur " + e));
    },

    //-----------------------------------------
    //------ Fin zone d'autentification------
    //-----------------------------------------

    // D??connection

    logout: function () {
      fetch(`${this.state.apiUrl}authentication/session?${this.state.apiKey}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "session_id": this.state.sessionId
        })
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) this.commit("clearSession", true);
        })
        .catch((e) => console.log("erreur " + e));
    },

    //---------------- V??rification derniere connection < 1h -------------

    checkConnection: function (context, obj) {
      let now = Date.parse(new Date())
      let sessionExp = Date.parse(new Date(Date.parse(obj.sessionExpiration)).toUTCString())
      let diff = sessionExp - now
      if (diff < 0) {
        console.log("nouvelle connection !")
        this.commit("updateLoggingError", -1)
      } else this.commit("updateDataLs", obj)
    },

    // Ajout / suppression d'un film aux favoris
    Favorites: function (context, data) {
      fetch(`${this.state.apiUrl}account/${this.state.accountId}/favorite?${this.state.apiKey}&session_id=${this.state.sessionId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "media_type": "movie",
          "media_id": data.id,
          "favorite": data.status,
        })
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success && data.status) {
            console.log('Film ajout?? aux favoris')
            this.dispatch("updateFavorites")
          } else if (json.success && !data.status) {
            console.log('Film retir?? des favoris')
            this.dispatch("updateFavorites")
          }
        })
        .catch((e) => console.log("erreur " + e));
    },

    // Ajout / suppression d'un film ?? la liste "?? voir"
    WatchList: function (context, data) {
      fetch(`${this.state.apiUrl}account/${this.state.accountId}/watchlist?${this.state.apiKey}&session_id=${this.state.sessionId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "media_type": "movie",
          "media_id": data.id,
          "watchlist": data.status,
        })
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success && data.status) {
            console.log('film ajout?? ?? la WatchList')
            this.dispatch("updateWatchList")
          } else if (json.success && !data.status) {
            console.log('film retir?? de la WatchList')
            this.dispatch("updateWatchList")
          }
        })
        .catch((e) => console.log("erreur " + e));
    },

    // r??cuperation des favoris (si ce n'est pas deja fait)
    checkFavorites: function () {
      if (this.state.myFavorites.length == 0) this.dispatch("updateFavorites");
    },

    // mise ?? jour des favoris
    updateFavorites: function () {
      fetch(`${this.state.apiUrl}account/${this.state.accountId}/favorite/movies?${this.state.apiKey}&session_id=${this.state.sessionId}&language=${this.state.language}&sort_by=created_at.asc&page=1
      `)
        .then((response) => response.json())
        .then((json) => {
          this.commit("updateMyFavorites", json.results)
        })
        .catch((e) => console.log("erreur " + e));
    },

    // r??cuperation des film ?? voir (si ce n'est pas deja fait)
    checkWatchList: function () {
      if (this.state.myWatchList.length == 0) this.dispatch("updateWatchList");
    },

    // mise ?? jour des films ?? voir
    updateWatchList: function () {
      fetch(`${this.state.apiUrl}account/${this.state.accountId}/watchlist/movies?${this.state.apiKey}&session_id=${this.state.sessionId}&language=${this.state.language}&sort_by=created_at.asc&page=1
    `)
        .then((response) => response.json())
        .then((json) => {
          this.commit("updateMyWatchList", json.results)
        })
        .catch((e) => console.log("erreur " + e));
    },
    //-----------------------------------------------------------
    //            Sauvegarde local storage
    //-----------------------------------------------------------
    toLocalStorage: function () {
      localStorage.setItem('fakeflix', JSON.stringify({
        sessionExpiration: this.state.sessionExpiration,
        userName: this.state.userName,
        accountId: this.state.accountId,
        sessionId: this.state.sessionId,
      }))
    },
    clearLocalStorage: function (context, route) {
      localStorage.removeItem('fakeflix');
      if (route != "/") router.push({ name: "home" })
      return false;
    },
  },
  modules: {
  },
  filters: {

  }
})