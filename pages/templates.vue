<template>
  <div class="container">
    <div v-for="template in templates" :key="template" class="grid">
      <templateCard :id="template._id" :template-user="template.user" :template-content="template.content" :likes="template.likes" :name="template.name" />
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
        >
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-btn>
      </template>
      <span>Upload template</span>
    </v-tooltip>
  </div>
</template>
<script>
import templateCard from '@/components/templateCard.vue'
export default {
  components: {
    templateCard
  },
  layout: 'dashboard',
  async asyncData ({ $axios }) {
    const templates = await $axios.get('/api/templates', {
      params: {
        page: 0
      }
    })
    return { templates: templates.data.templates }
  },
  head: {
    title: 'Templates'
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
}
</style>
