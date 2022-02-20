<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      page: {
        title: 'Templating rules',
        content: '<p>This is the content of the page.</p>'
      }
    }
  },
  head: {
    title: 'Templating rules'
  },
  async mounted () {
    const page = await this.$content('rules').fetch()

    this.page = page
  }
}
</script>
