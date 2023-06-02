<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
    >
      Embed image(s)
    </v-toolbar>
    <v-card-text>
      <v-file-input
        v-model="files"
        chips
        counter
        multiple
        show-size
        truncate-length="20"
        accept="image/*"
      />
      <v-btn @click="upload">
        upload
      </v-btn>
      <br><br>
      <AceEditor
        v-model="content"
        disabled
        lang="html"
        theme="monokai"
        width="100%"
        height="15vh"
        :options="{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          fontSize: 14,
          highlightActiveLine: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          showPrintMargin: false,
          showGutter: true
        }"
        @init="editorInit"
      />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn v-if="requestComplete" @click="copyEmbedScript">
        copy
      </v-btn>
      <v-btn
        text
        @click="$emit('exit')"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

let AceEditor
if (process.client) {
  AceEditor = require('vue2-ace-editor')
}
export default {
  components: {
    AceEditor
  },
  data () {
    return { content: '<img src="embed link" />', files: [], requestComplete: false }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    dataSumit () {
    // code here
    },
    copyEmbedScript () {
      navigator.clipboard.writeText(this.content)
    },
    editorInit () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/monokai')
      require('brace/snippets/javascript') // snippet
    },
    upload () {
      const formData = new FormData()
      this.files.forEach((file) => {
        formData.append('files', file)
      })
      const self = this
      this.$axios
        .post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            user: this.user.id
          }
        })
        .then((response) => {
          const len = this.files.length
          const promises = []
          for (let i = 0; i < len; i++) {
            const { path } = response.data.pop()
            promises.push(self.$axios.get('api/files/get-embed-link', {
              params: { path, days: 10 }
            }))
          }
          Promise.all(promises).then((responseLink) => {
            self.content = responseLink.map((link) => {
              return `<img src="${link.data[0]}" />`
            }).join('\n')
          })
          this.requestComplete = true
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

<style>

</style>
