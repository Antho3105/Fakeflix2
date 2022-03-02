<template>
  <section v-if="searchResult.length > 0" class="search">
    <h2>Resultats de recherche pour : {{ searchValue }}</h2>
    <div class="flex">
      <figure
        v-for="movie of searchResult"
        v-bind:key="movie.id"
        :id="movie.id"
      >
        <a v-if="movie.poster_path" href="#">
          <img :src="url(movie.poster_path)" alt="" />
        </a>
        <a v-else href="#"
          ><p>image non disponible</p>
          <i class="fa-solid fa-film"></i
        ></a>
        <figcaption>{{ movie.title }}</figcaption>
      </figure>
    </div>
  </section>
  <section v-else class="search">
    <p>toto</p>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainArea",
  data() {
    return {};
  },
  computed: mapState(["searchResult", "searchValue"]),
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
};
</script>

<style scoped>
.search {
  width: 70%;
  text-align: left;
}
figure {
  width: 150px;
  margin: 15px 5px;
  text-align: center;
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
