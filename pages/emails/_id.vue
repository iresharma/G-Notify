<template>
  <div class="container">
    <h1>Subject: {{ email.subject }}</h1>
    <h4>id: {{ email._id }}</h4>
    <v-row>
      <v-col cols="6">
        <v-card elevation="2" style="margin: 1rem 0">
          <v-card-text>
            <h3>Plain Text</h3>
            <p>{{ email.template.plainText }}</p>
          </v-card-text>
        </v-card>
        <v-data-table
          :headers="[{text: 'Email Id', value: 'email'}, {text: 'Status', value: 'read'}]"
          :items="email.recipients"
        />
      </v-col>
      <v-col cols="6" v-html="email.template.content" />
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData ({ $axios, route }) {
    const response = await $axios.get(`/api/emails/${route.params.id}`)
    return { email: response.data.email }
  }
}
</script>

<style>

</style>
