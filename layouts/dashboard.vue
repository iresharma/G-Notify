<template>
  <v-app dark>
    <app-bar :side="true" />
    <v-navigation-drawer
      absolute
      permanent
      :mini-variant.sync="drawer"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.to)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn
          v-if="!drawer"
          style="position: absolute; bottom: 2rem; right: 1rem;"
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-sheet height="calc(100vh - 4rem)" style="margin-top: 4rem; padding-left: 5rem">
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
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', to: 'home' },
        { title: 'Templates', icon: 'mdi-view-dashboard', to: 'templates' }
      ]
    }
  },
  computed: {
    ...mapGetters({ snackbar: 'systemConfig/snackbar' }),
    drawer: {
      get () {
        return this.$store.getters['systemConfig/drawer']
      },
      set () {
        this.$store.commit('systemConfig/TOGGLE_DRAWER')
      }
    }
  }
}
</script>
