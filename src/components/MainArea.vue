<template>
  <section class="home">
    <h2>
      Bienvenue <span v-if="userName">{{ userName }} !</span>
    </h2>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainArea",
  computed: mapState([
    "searchResult",
    "searchValue",
    "searching",
    "loading",
    "userName",
  ]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script> 

<style scoped>
.home {
  width: 60%;
  text-align: left;
}
* {
  color: white;
}
h2 {
  font-size: 30px;
  margin: 0;
  padding-top: 15px;
}
button {
  color: black;
}

@media screen and (max-width: 700px) {
  .home {
    width: 95%;
  }
}
</style>
