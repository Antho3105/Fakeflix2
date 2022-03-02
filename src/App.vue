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
      <div id="nav">
        <div class="flex conteneur">
          <nav class="flex">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/mes-favoris">Favoris</router-link> |
            <router-link to="/films-a-voir">Films à voir</router-link> |
            <router-link to="/film">Détail film</router-link> |
            <router-link to="/404">404</router-link> |
            <router-link to="/login">Login</router-link>
          </nav>
          <SearchArea />
        </div>
      </div>
    </header>
    <router-view />
    <SiteFooter />
  </body>
</template>




<script>
import SiteFooter from "./components/Footer.vue";
import SearchArea from "./components/Search.vue";
export default {
  components: {
    SiteFooter,
    SearchArea,
  },
};
</script>



<style>
@import "./Style/normalize.css";
@import "./Style/style.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,400;1,700&display=swap");

main {
  color: white;
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

#nav a.router-link-exact-active {
  color: red;
  font-weight: bold;
}
</style>
