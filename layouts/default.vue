<template>
  <v-app dark>
    <v-app-bar
      absolute
      app
    >
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
          <v-icon v-if="!user.photoUrl" dark>
            mdi-account-circle
          </v-icon>
          <img v-else :src="user.photoUrl" alt="User profile">
        </v-avatar>
        <b>
          {{ user.name }}
        </b>
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet style="margin-top: 4rem;">
      <Nuxt />
    </v-sheet>
    <CustFooter />
    <v-snackbar
      v-model="snackbar.show"
      :timeout="-1"
      absolute
      bottom
      :color="snackbar.type"
      left
      text
    >
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import CustFooter from '@/components/footer.vue'

export default {
  components: {
    CustFooter
  },
  computed: {
    ...mapGetters({ isLogged: 'auth/isLogged', user: 'auth/user', snackbar: 'systemConfig/snackbar' })
  }
}
</script>
