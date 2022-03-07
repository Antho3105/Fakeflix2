<template>
  <transition-group name="card" tag="div" class="flex conteneur">
    <figure
      v-for="movie of filmList"
      v-bind:key="movie.id"
      :id="movie.id"
      class="fade-in"
    >
      <router-link :to="/film/ + movie.id">
        <img v-if="movie.poster_path" :src="url(movie.poster_path)" alt="" />
        <img
          v-else
          :src="require('@/Images/image-non-disponible.png')"
          alt=""
        />
      </router-link>
      <figcaption>{{ movie.title }}</figcaption>
    </figure>
  </transition-group>
</template>


<script>
export default {
  props: ["filmList"],
  name: "ListView",
  data: function () {
    return {};
  },
  computed: {},
  methods: {
    url: function (link) {
      return `https://image.tmdb.org/t/p/w500/${link}`;
    },
  },
  mounted() {},
  destroyed() {},
};
</script>


<style scoped>
figure {
  width: 150px;
  margin: 15px 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  animation: appear 0.5s ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

figure:nth-child(2) {
  animation-duration: 0.55;
}

figure:nth-child(3) {
  animation-duration: 0.6s;
}

figure:nth-child(3) {
  animation-duration: 0.65s;
}

figure:nth-child(4) {
  animation-duration: 0.7s;
}

figure:nth-child(5) {
  animation-duration: 0.75s;
}

figure:nth-child(6) {
  animation-duration: 0.8s;
}

figure:nth-child(7) {
  animation-duration: 0.85s;
}

figure:nth-child(8) {
  animation-duration: 0.8s;
}
figure:nth-child(9) {
  animation-duration: 0.85s;
}
figure:nth-child(10) {
  animation-duration: 0.9s;
}
figure:nth-child(11) {
  animation-duration: 1s;
}
figure:nth-child(11) {
  animation-duration: 1.05s;
}
figure:nth-child(12) {
  animation-duration: 1.1s;
}
figure:nth-child(13) {
  animation-duration: 1.15s;
}
figure:nth-child(14) {
  animation-duration: 1.2s;
}
figure:nth-child(15) {
  animation-duration: 1.25s;
}
figure:nth-child(16) {
  animation-duration: 1.3s;
}
figure:nth-child(17) {
  animation-duration: 1.35s;
}
figure:nth-child(18) {
  animation-duration: 1.4s;
}
figure:nth-child(19) {
  animation-duration: 1.45s;
}
figure:nth-child(20) {
  animation-duration: 1.5s;
}

v figure:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
figure a {
  text-decoration: none;
}
figcaption {
  text-align: center;
  object-fit: contain;
}
.card-item {
  display: inline-block;
}
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease-in-out;
}
.card-enter,
.card-leave-to {
  width: 0px;
  height: 0px;
  transform: scale(0);
}

@media screen and (max-width: 700px) {
  figure {
    width: 250px;
  }
}

@media screen and (max-width: 585px) {
  figure {
    margin: 10px auto;
  }
}
</style>