<template>
  <main>
    <section v-if="movieData.id && adultConsent === true" class="conteneur">
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

      <div v-if="movieVideoKey" id="trailer">
        <iframe
          :src="getVideoURL()"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div v-else id="trailer">
        <p>Pas de bande annonce pour ce film</p>
      </div>
    </section>
    <section v-else-if="adultConsent === false" class="conteneur">
      <h2>Contenu bloqué</h2>
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
      movieVideoKey: "",
      adultConsent: null,
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
    this.dataVideo();
  },
  methods: {
    dataMovie: async function () {
      await fetch(
        `${this.$store.state.apiUrl}movie/${this.$route.params.id}?${this.$store.state.apiKey}&${this.$store.state.language}`
      )
        .then((response) => response.json())
        .then((json) => (this.movieData = json));
      this.checkAdult();
    },
    dataVideo: function () {
      fetch(
        `${this.$store.state.apiUrl}movie/${this.$route.params.id}/videos?${this.$store.state.apiKey}&${this.$store.state.language}`
      )
        .then((response) => response.json())
        .then((json) => (this.movieVideoKey = json.results[0].key))
        .catch((e) => console.log("erreur " + e));
    },
    getUrl: function () {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`;
    },
    getVideoURL: function () {
      return `https://www.youtube.com/embed/` + this.movieVideoKey;
    },
    checkAdult: function () {
      if (this.movieData.adult) {
        if (confirm("contenu adulte")) {
          this.adultConsent = true;
        } else this.adultConsent = false;
      }
      this.adultConsent = true;
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
iframe {
  display: block;
  border: none;
  width: 90%;
  height: calc(100vw * 0.3);
  margin: auto;
}
#trailer {
  text-align: center;
  font-size: 22px;
}
</style>