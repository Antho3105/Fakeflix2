<template>
  <main>
    <section
      v-if="movieData.id && showData === true && this.$route.path != '/film'"
      class="conteneur"
    >
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
      <div class="flex" id="details">
        <a
          :href="getUrl()"
          :title="'Affiche ' + movieData.original_title"
          target="_blank"
          ><img :src="getUrl()" :alt="'Affiche ' + movieData.original_title"
        /></a>

        <div class="movieData">
          <h2>{{ movieData.original_title }}</h2>
          <p>Date de sortie : {{ dateSortie }}</p>
          <p>Durée : {{ length }}</p>
          <h3>Résumé</h3>
          <p>{{ movieData.overview }}</p>
          <h3>Informations :</h3>
          <ul>
            <li>Budget : {{ budget }} $</li>
            <li>Popularité : {{ movieData.popularity }}</li>
            <li>note : {{ movieData.vote_average }}</li>
            <li>Nombre de vote : {{ movieData.vote_count }}</li>
          </ul>
          <div v-if="movieData.adult == false" class="flex buttons">
            <button v-if="!isInFavorites" @click="addToFavorites()">
              Ajouter à mes favoris
            </button>
            <button v-if="isInFavorites" @click="removeFromFavorites()">
              Retirer des favoris
            </button>
            <button v-if="!isInWatchList" @click="addToWatchList()">
              Ajouter aux films à voir
            </button>
            <button v-if="isInWatchList" @click="removeFromWatchList()">
              Retirer des films à voir
            </button>
          </div>
        </div>
        <div id="casting">
          <h2>Acteurs du film</h2>
          <CarouselActors v-bind:actors="actors" />
        </div>
      </div>
    </section>
    <section v-else-if="showData === false" class="conteneur">
      <h2>Contenu bloqué</h2>
    </section>
    <ModalBox />
  </main>
</template>


<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import CarouselActors from "@/components/CarouselActors.vue";
import ModalBox from "@/components/ModalBox.vue";
export default {
  name: "FilmDetail",
  components: {
    CarouselActors,
    ModalBox,
  },
  data: function () {
    return {
      movieData: {},
      movieVideoKey: "",
      movieActors: [],
      movieProductors: [],
      reveal: true,
    };
  },
  computed: {
    ...mapGetters(["favoritesFilmsId", "watchListFilmsId"]),
    ...mapState(["adultConsent"]),
    showData: function () {
      return this.movieData.adult && this.adultConsent != true ? false : true;
    },
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
    isInFavorites: function () {
      return this.favoritesFilmsId.indexOf(parseInt(this.$route.params.id)) ===
        -1
        ? false
        : true;
    },
    isInWatchList: function () {
      return this.watchListFilmsId.indexOf(parseInt(this.$route.params.id)) ===
        -1
        ? false
        : true;
    },
    actors: function () {
      return this.movieActors.slice(0, 10);
    },
  },
  created: function () {
    this.dataMovie();
    this.dataVideo();
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
    this.dataActors();
  },

  methods: {
    // récuperation data du film
    dataMovie: async function () {
      if (this.$route.path != "/film") {
        await fetch(
          `${this.$store.state.apiUrl}movie/${this.$route.params.id}?${this.$store.state.apiKey}&language=${this.$store.state.language}`
        )
          .then((response) => response.json())
          .then((json) => (this.movieData = json));
        this.checkAdult();
      } else this.$router.push({ name: "search" });
    },

    // récuperation de la video du film
    dataVideo: function () {
      if (this.$route.path != "/film") {
        fetch(
          `${this.$store.state.apiUrl}movie/${this.$route.params.id}/videos?${this.$store.state.apiKey}&language=${this.$store.state.language}`
        )
          .then((response) => response.json())
          .then((json) => (this.movieVideoKey = json.results[0].key))
          .catch((e) => console.log("erreur " + e));
      }
    },
    // récuperation du casting du film
    dataActors: function () {
      fetch(
        `${this.$store.state.apiUrl}movie/${this.$route.params.id}/credits?${this.$store.state.apiKey}&language=${this.$store.state.language}`
      )
        .then((response) => response.json())
        .then((json) => {
          this.movieActors = json.cast;
          this.movieProductors = json.crew;
        });
    },

    // concatenation de l'adresse url de la photo
    getUrl: function () {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`;
    },

    // concatenation de l'adresse url de la video
    getVideoURL: function () {
      return `https://www.youtube.com/embed/` + this.movieVideoKey;
    },

    //confirmation contenu adulte
    checkAdult: function () {
      if (this.movieData.adult) {
        this.$store.commit("adultConsent", false);
        this.$store.commit("modalReveal", true);
      } else {
        this.$store.commit("modalReveal", false);
        this.$store.commit("adultConsent", null);
      }
    },
    addToFavorites: function () {
      this.$store.dispatch("Favorites", {
        id: this.$route.params.id,
        status: true,
      });
    },
    removeFromFavorites: function () {
      this.$store.dispatch("Favorites", {
        id: this.$route.params.id,
        status: false,
      });
    },
    addToWatchList: function () {
      this.$store.dispatch("WatchList", {
        id: this.$route.params.id,
        status: true,
      });
    },
    removeFromWatchList: function () {
      this.$store.dispatch("WatchList", {
        id: this.$route.params.id,
        status: false,
      });
    },
  },
};
</script>
<style scoped>
#details {
  padding: 20px 0;
}
img {
  width: 100%;
  object-fit: contain;
  transition: all 0.2s ease-in-out;
}
a {
  width: 30%;
}
img:hover {
  transform: scale(1.1) translateX(20px) translateY(20px);
  transition: all 0.5s ease-in-out;
}

.movieData {
  width: 65%;
}
section {
  margin-bottom: 10px;
}
.buttons {
  padding-top: 20px;
  justify-content: space-around;
}
button {
  width: 180px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 14px;
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
  padding-top: 15px;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 1s ease-in-out;
}
.appear-enter,
.appear-leave-to {
  transform: scale(0);
}

@media screen and (max-width: 800px) {
  a {
    width: 40%;
  }
  .movieData {
    width: 55%;
  }
}

@media screen and (max-width: 500px) {
  #details {
    margin: 0 auto;
    text-align: center;
  }
  a {
    width: 50%;
    margin: 0 auto;
    padding-bottom: 15px;
  }
  img:hover {
    transform: scale(1.1) translateY(15px);
  }
  .movieData {
    width: 95%;
    margin: 0 auto;
  }
  li {
    text-align: left;
  }
}
</style>