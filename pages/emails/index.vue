<template>
  <div class="container">
    <div v-if="emails === null" class="loader">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
    <div v-else-if="emails.length === 0">
      <h1>
        No emails found
      </h1>
    </div>
    <v-row v-else>
      <v-col
        v-for="email in emails"
        :key="email.id"
        cols="4"
      >
        <emailBox
          :id="email._id"
          :subject="email.subject"
          :plain-text="email.template.plainText"
          :template-name="email.template.name"
          :template-id="email.template._id"
          :count="email.recipients.length"
          :user="email.template.user"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import emailBox from '@/components/emailBox.vue'

export default {
  components: { emailBox },
  layout: 'dashboard',
  async asyncData ({ $axios, store }) {
    const userEmail = store.getters['auth/user'].email
    const response = await $axios.get(`/api/emails/list/${userEmail}`)
    return { emails: response.data.emails }
  },
  data () {
    return {
      emails: null
    }
  }
}
</script>

<style>
.loader {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
