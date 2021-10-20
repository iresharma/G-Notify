<template>
  <div class="container">
    <div>
      <v-alert dense icon="mdi-information" text type="info" color="blue">
        While creating the template preferably put all your CSS in a style
        inside the body or make it inline.
      </v-alert>
      <v-alert
        dense
        icon="mdi-alert-circle-outline"
        text
        type="error"
        color="red"
      >
        The rendered version on the right side isn't an accurate representaion
        of what the email will look like.
      </v-alert>
      <v-file-input
        v-model="file"
        counter
        show-size
        chips
        small-chips
        truncate-length="15"
        accept=".html"
        label="Upload Template"
        @input="readFile"
        @change="readFile"
      />
    </div>
    <div v-html="template" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      template:
        '<h1 style="text-align: center;">Please Upload your html template</h1>',
      file: null
    }
  },
  head: {
    title: 'Upload template'
  },
  methods: {
    readFile () {
      console.log(this.file)
      const file = this.file
      const formData = new FormData()
      formData.append('file', file)
      this.$axios
        .post('/api/templates/readTemplate', formData)
        .then((response) => {
          this.template = response.data
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
        })
    }
  }
}
</script>
