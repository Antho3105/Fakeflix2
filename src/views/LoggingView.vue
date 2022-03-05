<template>
  <main>
    <section v-if="!isLogged" class="conteneur">
      <h1>Veuillez vous identifier</h1>
      <p>
        Pour utiliser ce site vous devez vous inscrire :
        <a
          href="https://www.themoviedb.org/signup"
          title="www.themoviedb.org/signup"
          target="_blank"
          >ICI</a
        >
      </p>
      <div id="login">
        <input
          @keypress.enter="authenticate()"
          id="id"
          placeholder="Identifiant"
          type="text"
        />
        <input
          @keypress.enter="authenticate()"
          id="pwd"
          placeholder="Mot de passe"
          type="password"
        />
        <button @click="authenticate()">S'identifier</button>
        <p>{{ loggingError }}</p>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoggingView",
  computed: mapState(["isLogged", "loggingError"]),
  methods: {
    authenticate: function () {
      this.$store.commit("updateUser", {
        id: document.querySelector("#id").value,
        pwd: document.querySelector("#pwd").value,
      });
      this.$store.dispatch("getTokenId");
    },
  },
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}
#login {
  text-align: center;
  max-width: 350px;
  margin: 0 auto;
}
input,
button {
  margin: 5px 5px;
  height: 40px;
}
a {
  color: red;
  text-decoration: none;
}
input {
  width: 100%;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: center;
}
button {
  width: 150px;
  border-radius: 10px;
  background-color: #e50914;
  color: white;
  font-weight: bold;
  font-size: 18px;
}
</style>
