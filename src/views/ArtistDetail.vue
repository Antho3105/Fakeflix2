<template>
  <main>
    <section v-if="this.$route.path != '/artiste'" class="conteneur">
      <h2>{{ artistData.name }}</h2>
      <div class="flex">
        <figure>
          <img
            v-if="artistData.profile_path"
            :src="url(artistData.profile_path)"
            alt=""
          />
          <img
            v-else
            :src="require('@/Images/image-non-disponible.png')"
            alt=""
          />
        </figure>
        <p>{{ artistData.biography }}</p>
      </div>
    </section>
    <section v-else class="conteneur">
      <h2>Contenu bloqué</h2>
    </section>
  </main>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "ArtistDetail",
  components: {},
  data: function () {
    return {
      artistData: [],
    };
  },
  computed: {
    ...mapGetters([]),
  },
  created: function () {
    this.$store.dispatch("checkWatchList");
    this.$store.dispatch("checkFavorites");
    this.getDataArtist();
  },
  methods: {
    //verif contenu adulte
    checkAdult: function () {
      if (this.actorData.adult === true) {
        if (confirm("contenu adulte") === true) {
          this.adultConsent = true;
        } else {
          this.adultConsent = false;
        }
      } else this.adultConsent = true;
    },
    getDataArtist: function () {
      if (this.$route.path != "/artiste") {
        fetch(
          `${this.$store.state.apiUrl}person/${this.$route.params.id}?${this.$store.state.apiKey}&language=${this.$store.state.language}`
        )
          .then((response) => response.json())
          .then((json) => (this.artistData = json))
          .catch((e) => console.log("erreur " + e));
      }
    },
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500${link}`;
    },
  },
};
</script>
<style scoped>
img {
  width: 30vw;
  max-width: 350px;
  object-fit: contain;
  transition: all 0.2s ease-in-out;
}
p {
  width: 65%;
}
</style>