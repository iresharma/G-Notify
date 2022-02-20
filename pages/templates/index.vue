<template>
  <div class="container">
    <v-alert
      color="red"
      dense
      icon="mdi-alert-circle-outline"
      text
      type="error"
    >
      The thumbnails are rendered using a headless browser hence looks slighlty different from the real website.
    </v-alert>
    <div class="grid">
      <templateCard
        v-for="template in templates"
        :id="template._id"
        :key="template._id"
        :desc="template.desc ? template.desc : 'No Description available'"
        :template-user="template.user"
        :template-content="template.content"
        :likes="template.likes"
        :name="template.name"
        @updateLikes="(e) => template.likes = e"
      />
    </div>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          elevation="6"
          fab
          large
          x-small
          icon
          style="position: fixed; bottom: 3rem; right: 2rem;"
          v-on="on"
          @click="$router.push('/templates/upload')"
        >
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-btn>
      </template>
      <span>Upload template</span>
    </v-tooltip>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          elevation="6"
          fab
          large
          x-small
          icon
          style="position: fixed; bottom: 3rem; right: 7rem;"
          v-on="on"
          @click="$router.push('/templates/create')"
        >
          <v-icon>mdi-typewriter</v-icon>
        </v-btn>
      </template>
      <span>Create template</span>
    </v-tooltip>
    <v-pagination
      v-model="page"
      :length="length"
    />
  </div>
</template>
<script>
import templateCard from '@/components/templateCard.vue'
export default {
  components: {
    templateCard
  },
  layout: 'dashboard',
  data () {
    return {
      page: 1,
      templates: []
    }
  },
  head: {
    title: 'Templates'
  },
  watch: {
    page () {
      this.$axios.get('https://g-notify.herokuapp.com/api/templates', {
        params: {
          page: this.page - 1
        }
      }).then((response) => {
        this.templates = response.data.templates
      }).catch((error) => {
        this.$store.commit('systemConfig/SNACKBAR', {
          show: true,
          type: 'danger',
          text: error.message
        })
      })
    }
  },
  async mounted () {
    const templates = await this.$axios.get('https://g-notify.herokuapp.com/api/templates', {
      params: {
        page: 0
      }
    })
    const length = await this.$axios.get('https://g-notify.herokuapp.com/api/templates/count')
    this.templates = templates.data.templates
    this.length = Number((length.data.count / 20) + 1)
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
