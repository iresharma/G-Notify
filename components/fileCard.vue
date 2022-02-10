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
      <b>Size:</b> {{ file.size }}B <br>
    </v-card-text>
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
      signedUrl: null
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
    download () {
      window.open(this.signedUrl, '_blank')
    }
  }
}
</script>
