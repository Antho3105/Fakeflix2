<template>
  <body>
    <noscript>
      <strong
        >We're sorry but Fakeflix doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>
    <header id="header">
      <h1><router-link to="/">FAKEFLIX</router-link></h1>
      <div v-if="isLogged" id="nav">
        <div class="flex conteneur">
          <nav class="flex">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/recherche">Recherche</router-link> |
            <router-link to="/mes-favoris">Favoris</router-link> |
            <router-link to="/films-a-voir">Films à voir</router-link> |
            <span id="logout" @click="logout()"> Logout</span>
          </nav>
          <QuickSearch />
        </div>
      </div>
    </header>
    <LoggingView v-if="!isLogged" />
    <router-view v-if="isLogged" />
    <SiteFooter />
  </body>
</template>




<script>
import { mapState } from "vuex";
import SiteFooter from "@/components/Footer.vue";
import QuickSearch from "@/components/QuickSearch.vue";
import LoggingView from "@/views/LoggingView.vue";

export default {
  components: {
    SiteFooter,
    QuickSearch,
    LoggingView,
  },
  computed: mapState(["isLogged"]),
  created: function () {
    if (localStorage.getItem("fakeflix") != null) {
      this.$store.commit(
        "updateDataLs",
        JSON.parse(localStorage.getItem("fakeflix"))
      );
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$store.dispatch("clearLocalStorage", this.$route.path);
    },
  },
};
</script>



<style>
@import "./Style/normalize.css";
@import "./Style/style.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,400;1,700&display=swap");
* {
  margin: 0;
}

main {
  color: white;
  min-height: calc(100vh - 275px);
}

#header {
  font-family: "Lato", sans-serif;
  background-color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  min-height: 200px;
}

#nav {
  width: 100%;
  font-size: 20px;
  padding: 30px;
  color: red;
  background-color: #343a40;
}
nav {
  align-items: center;
}

header h1 a {
  font-weight: 300;
  font-size: 70px;
  color: red;
}
header a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}
#logout {
  padding-left: 10px;
  cursor: pointer;
  color: white;
}
#nav a.router-link-exact-active {
  color: red;
  font-weight: bold;
}
#nav a {
  transition: all 0.2s ease-in-out;
}

h3 {
  margin: 15px 0;
}
</style>
