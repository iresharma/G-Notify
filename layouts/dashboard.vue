<template>
  <v-app dark>
    <app-bar :side="true" />
    <v-navigation-drawer
      :mini-variant.sync="drawer"
      app
      permanent
      class="black white--text"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          class="white--text"
          link
          @click="$router.push(item.to)"
        >
          <v-list-item-icon>
            <v-icon color="white">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text font-weight-medium">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn
          v-if="!drawer"
          style="position: absolute; bottom: 2rem; right: 1rem;"
          icon
          @click.stop="toggleDrawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding-left: 4rem; padding-bottom: 4rem;">
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
import { mapGetters } from 'vuex'
import CustFooter from '@/components/footer.vue'
import AppBar from '@/components/appbar.vue'

export default {
  components: {
    CustFooter,
    AppBar
  },
  layout: 'dashboard',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/home' },
        { title: 'Templates', icon: 'mdi-view-dashboard', to: '/templates' },
        { title: 'Templating Rules', icon: 'mdi-book-variant', to: '/templates/rules' },
        { title: 'Mail', icon: 'mdi-at', to: '/emails' },
        { title: 'Assets', icon: 'mdi-file', to: '/assets' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      drawer: 'systemConfig/drawer'
    }),
    snackbar: {
      get () {
        return this.$store.getters['systemConfig/snackbar']
      },
      set (val) {
        this.$store.commit('systemConfig/SNACKBAR', val)
      }
    }
  },
  beforeMount () {
    this.$store.commit('auth/LOAD_USER')
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('systemConfig/TOGGLE_DRAWER')
    }
  }
}
</script>
