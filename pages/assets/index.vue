<template>
  <div class="container">
    <div v-if="files === null" class="loader">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
    <div v-else-if="files.length === 0">
      <h1>
        No files found
      </h1>
    </div>
    <v-row v-else>
      <v-col v-for="file in files" :key="file._id" cols="4">
        <file-card :file="file" />
      </v-col>
    </v-row>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          elevation="6"
          fab
          large
          x-small
          icon
          style="position: fixed; bottom: 3rem; right: 3rem;"
          v-on="on"
          @click="$router.push('/assets/upload')"
        >
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-btn>
      </template>
      <span>Add files</span>
    </v-tooltip>
  </div>
</template>

<script>
import fileCard from '@/components/fileCard.vue'
export default {
  components: {
    fileCard
  },
  layout: 'dashboard',
  data () {
    return { files: [] }
  },
  async mounted () {
    const userId = this.store.getters['auth/user']._id
    const response = await this.$axios.get('https://g-notify.herokuapp.com/api/files/list', {
      params: {
        user: userId
      }
    })
    return { files: response.data }
  }
}
</script>

<style>

</style>
