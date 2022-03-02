<template>
  <main>
    <section v-if="movieData.id" class="conteneur">
      <div class="flex" id="details">
        <img :src="getUrl()" alt="" />
        <div class="movieData">
          <h2>{{ movieData.original_title }}</h2>
          <p>Date de sortie : {{ dateSortie }}</p>
          <p>Durée : {{ length }}</p>
          <h3>Résumé</h3>
          <p>{{ movieData.overview }}</p>
          <h3>Information :</h3>
          <ul>
            <li>Budget : {{ budget }} $</li>
            <li>Popularité : {{ movieData.popularity }}</li>
            <li>note : {{ movieData.vote_average }}</li>
            <li>Nombre de vote : {{ movieData.vote_count }}</li>
          </ul>
          <div class="flex buttons">
            <button>Ajouter à mes favoris</button>
            <button>Ajouter aux films à voir</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script>
export default {
  name: "FilmDetail",
  components: {},
  data: function () {
    return {
      movieData: {},
    };
  },
  computed: {
    dateSortie: function () {
      return new Date(this.movieData.release_date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    length: function () {
      return (
        Math.floor(parseInt(this.movieData.runtime) / 60) +
        "h" +
        (parseInt(this.movieData.runtime) % 60) +
        "min"
      );
    },
    budget: function () {
      let str = parseInt(this.movieData.budget).toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return str.join(".");
    },
  },
  created: function () {
    this.dataMovie();
  },
  methods: {
    dataMovie: function () {
      fetch(
        `${this.$store.state.apiUrl}movie/${this.$route.params.id}?${this.$store.state.apiKey}&${this.$store.state.language}`
      )
        .then((response) => response.json())
        .then((json) => (this.movieData = json));
    },
    getUrl: function () {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`;
    },
  },
};
</script>
<style scoped>
#details {
  padding: 20px 0;
}
img {
  width: 30%;
  object-fit: contain;
}
.movieData {
  width: 65%;
}
.buttons {
  padding-top: 20px;
  justify-content: space-around;
}
</style>