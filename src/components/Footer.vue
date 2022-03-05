<template>
  <footer>
    <div class="footerMenu conteneur">
      <p>
        Fakefix - Anthony AIRAUD &copy; 2022 - powered by
        <a
          href="https://www.themoviedb.org/"
          title="www.themoviedb.org"
          target="_blank"
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

<style scoped>
.footerMenu {
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
footer {
  /* position: fixed;
  bottom: 0; */
  background-color: #343a40;
  width: 100%;
}
a {
  text-decoration: none;
  color: red;
}
</style>

