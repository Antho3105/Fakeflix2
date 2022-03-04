<template>
  <main>
    <section
      v-if="
        movieData.id && adultConsent === true && this.$route.path != '/film'
      "
      class="conteneur"
    >
      <transition name="appear">
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
              <button @click="addToFavorites()">Ajouter à mes favoris</button>
              <button @click="addToWatchList()">
                Ajouter aux films à voir
              </button>
            </div>
          </div>
        </div>
      </transition>

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
    <section v-else class="conteneur"><p>toto</p></section>
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
    this.$store.dispatch("checkWatchList");
  },
  methods: {
    dataMovie: async function () {
      if (this.$route.path != "/film") {
        await fetch(
          `${this.$store.state.apiUrl}movie/${this.$route.params.id}?${this.$store.state.apiKey}&${this.$store.state.language}`
        )
          .then((response) => response.json())
          .then((json) => (this.movieData = json));
        this.checkAdult();
      } else this.$router.push({ name: "search" });
    },

    dataVideo: function () {
      if (this.$route.path != "/film") {
        fetch(
          `${this.$store.state.apiUrl}movie/${this.$route.params.id}/videos?${this.$store.state.apiKey}&${this.$store.state.language}`
        )
          .then((response) => response.json())
          .then((json) => (this.movieVideoKey = json.results[0].key))
          .catch((e) => console.log("erreur " + e));
      }
    },
    getUrl: function () {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`;
    },
    getVideoURL: function () {
      return `https://www.youtube.com/embed/` + this.movieVideoKey;
    },
    checkAdult: function () {
      if (this.movieData.adult === true) {
        if (confirm("contenu adulte") === true) {
          this.adultConsent = true;
        } else {
          this.adultConsent = false;
        }
      } else this.adultConsent = true;
    },
    addToFavorites: function () {
      this.$store.dispatch("addToFavorite", this.$route.params.id);
    },
    addToWatchList: function () {
      this.$store.dispatch("addToWatchList", this.$route.params.id);
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
section {
  margin-bottom: 70px;
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

.appear-enter-active,
.appear-leave-active {
  transition: all 1s ease-in-out;
}
.appear-enter,
.appear-leave-to {
  transform: scale(0);
}
</style>