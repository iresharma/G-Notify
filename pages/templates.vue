<template>
  <div>
    hi
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          elevation="6"
          fab
          large
          x-small
          icon
          style="position: absolute; bottom: 3rem; right: 2rem;"
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
export default {
  layout: 'dashboard',
  async asyncData ({ $axios }) {
    const templates = await $axios.get('/templates', {
      params: {
        number: 1
      }
    })
    console.log(templates)
    return { templates }
  },
  head: {
    title: 'Templates'
  }
}
</script>
