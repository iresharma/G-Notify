<template>
  <div class="container">
    <h1>Assets will be shown here soon</h1>
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
export default {
  layout: 'dashboard'

}
</script>

<style>

</style>
