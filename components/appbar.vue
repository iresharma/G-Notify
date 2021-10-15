<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon v-if="side" @click="$store.commit('systemConfig/TOGGLE_DRAWER')" />
    <v-toolbar-title>G-Notify</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-btn
      v-if="isLogged"
      elevation="0"
      color="secondary"
    >
      <v-avatar size="25" color="success">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <b>
        {{ user.name }}
      </b>
    </v-btn>
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
