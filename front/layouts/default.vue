<template>
  <v-app>
    <h1 class="text-center my-8">The Baby Schedule Maker</h1>
    <v-content style="max-width: 40rem" class="mx-auto mb-12">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app absolute class="text-center py-4">
      <v-card flat tile class="grey lighten-4 text-center ma-auto">
        <v-card-text class="pa-0 caption">
          <span>
            &copy; {{ new Date().getFullYear() }} — The Baby Sleep App
          </span>
        </v-card-text>
        <v-card-text class="pa-0 caption">
          <span>
            Inspired by
            <a href="/img/IMG_0746.jpg">Jeconiah</a> &hearts;
          </span>
          | Hand-built by
          <span style="text-decoration:line-through">pandas</span>
          <a href="https://margret.pw" target="_blank" rel="noopener noreferrer"
            >Pax</a
          >
          🐼
        </v-card-text>
        <v-card-text class="pa-0 caption">
          <span>
            Favicon made by
            <a
              href="https://www.flaticon.com/authors/freepik"
              target="_blank"
              rel="noopener noreferrer"
              title="Freepik"
              >Freepik</a
            >
            from
            <a
              href="https://www.flaticon.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Flaticon"
            >
              www.flaticon.com</a
            >
          </span>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {}
</script>
