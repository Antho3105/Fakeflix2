<template>
  <transition name="modal">
    <div class="bloc-modal" v-if="modalReveal">
      <div class="overlay"></div>

      <div class="modal card">
        <h2>Attention contenu adulte</h2>
        <p>Vous devez être majeur pour visualiser cette page</p>
        <div class="buttons flex">
          <button v-on:click="adultConsent()">OK</button>
          <button v-on:click="cancelConsent()">Annuler</button>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "ModalBox",
  props: [],
  computed: {
    ...mapState(["modalReveal"]),
  },
  methods: {
    adultConsent: function () {
      this.$store.commit("adultConsent", true);
      this.$store.commit("modalReveal", false);
    },
    cancelConsent: function () {
      this.$store.commit("adultConsent", false);
      this.$store.commit("modalReveal", false);
    },
  },
};
</script>


<style scoped>
.bloc-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  background: #f1f1f1;
  text-align: center;
  color: #333;
  padding: 15px;
  position: fixed;
  top: 30%;
}
.card {
  width: 350px;
  height: 130px;
  background-color: white;
  color: black;
  border-radius: 15px;
}

.btn-modal {
  position: absolute;
  top: 10px;
  right: 10px;
}
.buttons {
  justify-content: space-around;
  position: absolute;
  width: 100%;
  bottom: 10%;
  left: 0;
}
button {
  width: 70px;
  padding: 4px 7px;
  border-radius: 10px;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.modal-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.modal-leave-active {
  transition: all 0s;
}
.modal-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>