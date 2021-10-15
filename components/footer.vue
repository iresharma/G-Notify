<template>
  <v-footer
    color="primary lighten-1"
    padless
    fixed
  >
    <v-row
      justify="center"
      no-gutters
    >
      <!-- <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn> -->
      <v-col
        :class="[!$vuetify.theme.dark ? 'grey lighten-4 py-1 text-center black--text' : 'grey py-1 text-center black--text']"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <code>@iresharma</code>
      </v-col>
    </v-row>
  </v-footer>
</template>
