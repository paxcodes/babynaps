<template>
  <v-app>
    <v-content style="max-width: 40rem" class="mx-auto">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app class="blue darken-4 text-center">
      <v-card flat tile class="text-center blue darken-4 ma-auto">
        <v-card-text class="pa-0 caption white--text">
          <span>
            &copy; {{ new Date().getFullYear() }} — The Baby Sleep App
          </span>
          |
          <span>
            Inspired by
            <a href="/img/IMG_0746.jpg">Jeconiah</a> &hearts;
          </span>
          | Hand-built by
          <span style="text-decoration:line-through">pandas</span>
          <a href="https://margret.pw">Pax</a> 🐼
        </v-card-text>
        <v-card-text class="pa-0 caption white--text">
          <span>
            Favicon made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
              >Freepik</a
            >
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com</a
            >
          </span>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    }
  }
}
</script>
