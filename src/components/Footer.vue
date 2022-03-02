<template>
  <footer>
    <div class="footerMenu conteneur">
      <p>
        Fakefix - Anthony AIRAUD @2022 - powered by
        <a href="https://www.themoviedb.org/" target="_blank"
          >themoviesdb.org</a
        >
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerMenu {
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
footer {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #343a40;
  width: 100%;
}
</style>

