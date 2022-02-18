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
        The rendered version below isn't an accurate representation of what the
        email will look like.
      </v-alert>
      <v-row>
        <v-col>
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
        </v-col>
        <v-col>
          <v-text-field v-model="templateName" label="Template name" />
        </v-col>
      </v-row>
      <v-textarea
        v-model="plainText"
        name="input-7-1"
        label="Plain Text"
        placeholder="Input Plain text for the template"
      />
      <v-checkbox
        v-model="makePublic"
        label="Make this public for others to re-use"
      />
      <v-btn elevation="2" outlined @click="upload">
        Upload template
      </v-btn>
    </div>
    <div v-html="template" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      template: null,
      file: [],
      templateName: null,
      plainText: null,
      makePublic: true
    }
  },
  head: {
    title: 'Upload template'
  },
  methods: {
    readFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$axios
        .post('/api/templates/readTemplate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.template = response.data.template
          this.templateName = this.file.name.split('.')[0]
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
        })
    },
    upload () {
      this.$axios
        .post('/api/templates/createTemplate', {
          content: this.template,
          name: this.templateName,
          likes: 0,
          user: JSON.parse(localStorage.getItem('user'))._id,
          plainText: this.plainText,
          public: this.makePublic
        })
        .then((response) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'success',
            text: response.data.message
          })
          this.$router.push('/templates')
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
