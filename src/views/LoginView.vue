<template>
  <main>
    <section id="Login" class="conteneur">
      <h1>Page de login</h1>
      <input id="id" placeholder="Identifiant" type="text" />
      <input id="pwd" placeholder="Mot de passe" type="password" />
      <button @click="authenticate()">Valider</button>
    </section>
  </main>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
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
