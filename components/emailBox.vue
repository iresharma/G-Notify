<template>
  <v-card
    elevation="3"
    :loading="loading"
  >
    <v-img
      :src="`https://g-notify.herokuapp.com/api/templates/renderTemplate?quality=low&id=${templateId}`"
      height="250"
    />
    <v-card-title>{{ subject }}</v-card-title>
    <v-card-text>
      <b>Template Name:</b> {{ templateName }}<br>
      <b>Plain Text:</b> {{ plainText }}<br>
      <b>Sent to:</b> {{ count }} <br>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success lighten-2"
        text
        @click="$router.push(`/emails/${id}`)"
      >
        More info
      </v-btn>
      <v-btn
        color="primary lighten-2"
        outlined
        @click="sendTest"
      >
        Send Test
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    subject: {
      type: String,
      required: true
    },
    plainText: {
      type: String,
      required: true
    },
    templateName: {
      type: String,
      required: true
    },
    templateId: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    sendTest () {
      this.loading = true
      this.$axios
        .get('https://g-notify.herokuapp.com/api/emails/sendTest', {
          params: {
            template: this.templateId,
            user: this.user
          }
        })
        .then((response) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'success',
            text: 'Email sent to your email id'
          })
          this.loading = false
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
