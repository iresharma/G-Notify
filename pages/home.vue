<template>
  <div class="container">
    <v-card
      elevation="5"
      outlined
      style="width: 20vw; color: white"
    >
      <apexchart width="380" type="donut" :options="options" :series="series" />
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData ({ $axios }) {
    const emailCount = await $axios.get('/api/emails/stats/all')
    return { series: [emailCount.data.totalCount[0].totalCount, emailCount.data.readCount[0].readCount] }
  },
  data () {
    return {
      options: {
        labels: ['Emails Read', 'Email Unread']
      }
    }
  },
  head: {
    title: 'Home'
  }
}
</script>
