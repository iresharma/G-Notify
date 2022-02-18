<template>
  <div class="container">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  data () {
    return {
      files: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    upload () {
      console.log(this.files)
      const formData = new FormData()
      this.files.forEach((file) => {
        formData.append('files', file)
      })
      this.$axios
        .post('https://g-notify.herokuapp.com/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            user: this.user.id
          }
        })
        .then((response) => {
          console.log(response)
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
