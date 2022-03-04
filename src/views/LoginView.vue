<template>
  <main>
    <section v-if="!isLogged" class="conteneur">
      <h1>Veuillez vous identifier</h1>
      <div id="login">
        <input id="id" placeholder="Identifiant" type="text" />
        <input id="pwd" placeholder="Mot de passe" type="password" />
        <button @click="authenticate()">Valider</button>
        <p>{{ logginError }}</p>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoginView",
  computed: mapState(["isLogged", "logginError"]),
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
h1 {
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

input {
  width: 100%;
}
</style>
