<template>
  <v-app dark>
    <app-bar />
    <v-main>
      <Nuxt />
    </v-main>
    <CustFooter />
    <v-snackbar
      v-model="snackbar.show"
      absolute
      bottom
      :color="snackbar.type"
      left
      text
      style="z-index: 999999999"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import CustFooter from '@/components/footer.vue'
import AppBar from '@/components/appbar.vue'

export default {
  components: {
    CustFooter,
    AppBar
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.getters['systemConfig/snackbar']
      },
      set (val) {
        this.$store.commit('systemConfig/SNACKBAR', val)
      }
    }
  }
}
</script>
