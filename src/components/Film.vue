<template>
  <section class="film">
    <p>Datas du film</p>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FilmData",
  data() {
    return {};
  },
  computed: mapState(["searchResult", "searchValue", "searching"]),
  methods: {},
};
</script>

<style scoped>
.search,
.home {
  width: 70%;
  text-align: left;
}
figure {
  width: 150px;
  margin: 15px 5px;
  text-align: center;
}

.home {
  font-size: 30px;
}

figure a {
  text-decoration: none;
}

figcaption {
  text-align: center;
  object-fit: contain;
}

* {
  color: white;
}
img {
  max-height: 220px;
}
i {
  font-size: 140px;
  margin-bottom: 35px;
}
</style>
