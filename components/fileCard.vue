<template>
  <v-card
    elevation="3"
  >
    <v-img
      :src="signedUrl"
      height="250"
    />
    <v-card-title style="display: flex; align-items: center; justify-content: space-between;">
      <div>
        {{ file.name }}
        <br>
        <small>id: {{ file._id }}</small>
      </div>
      <div>
        <v-btn
          icon
          color="success"
          @click="download"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <b>Type:</b> Image<br>
      <b>Path:</b> <code>{{ file.path }}</code><br>
      <b>Size:</b> {{ formatBytes(file.size) }} <br>
    </v-card-text>
    <v-card-actions>
      <v-btn-toggle>
        <v-btn @click="days--">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn disabled>
          Days: {{ days }}
        </v-btn>

        <v-btn @click="days++">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn :color="buttonColor" @click="getEmbedLink">
          {{ buttonMessage }}
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      signedUrl: null,
      days: 1,
      embedURL: null,
      buttonColor: 'default',
      buttonMessage: 'Get embed link'
    }
  },
  async fetch () {
    const response = await this.$axios.get('/api/files/cdn', {
      params: {
        path: this.file.path
      }
    })
    this.signedUrl = response.data[0]
  },
  methods: {
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) { return '0 Bytes' }

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    download () {
      window.open(this.signedUrl, '_blank')
    },
    getEmbedLink () {
      this.$axios.get('/api/files/get-embed-link', {
        params: {
          path: this.file.path,
          days: this.days
        }
      }).then((response) => {
        this.embedURL = response.data[0]
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
          this.buttonMessage = 'Link Copied'
          this.buttonColor = 'success'
          setTimeout(() => {
            this.buttonMessage = 'Get embed link'
            this.buttonColor = 'default'
          }, 2000)
          return navigator.clipboard.writeText(this.embedURL)
        }
        return Promise.reject(new Error('The Clipboard API is not available.'))
      })
    }
  }
}
</script>
