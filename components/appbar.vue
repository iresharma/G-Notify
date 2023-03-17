<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon v-if="side" @click="$store.commit('systemConfig/TOGGLE_DRAWER')" />
    <v-toolbar-title class="logo">
      G-Notify
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-chip
      v-if="isLogged"
      elevation="0"
      color="blue"
      outlined
    >
      <b>
        {{ user.name }}
      </b>
    </v-chip>
    <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    side: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({ isLogged: 'auth/isLogged', user: 'auth/user' })
  }
}
</script>
