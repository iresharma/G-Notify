<template>
  <div class="container">
    <v-progress-circular
      v-if="emails === null"
      indeterminate
      color="primary"
    />
    <div v-else-if="emails.length === 0">
      <h1>
        No emails found
      </h1>
    </div>
    <div v-else>
      {{ emails }}
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      emails: null
    }
  },
  beforeMount () {
    const userEmail = this.$store.getters['auth/user'].email
    this.$axios.get(`/api/emails/${userEmail}`).then((response) => {
      this.emails = response.data
    })
  }
}
</script>

<style></style>
