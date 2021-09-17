<template>
  <v-app dark>
    <app-bar />
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
import AppBar from '@/components/appbar.vue'

export default {
  components: {
    CustFooter,
    AppBar
  },
  computed: {
    ...mapGetters({ snackbar: 'systemConfig/snackbar' })
  }
}
</script>
