<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData ({ $content }) {
    const page = await $content('rules').fetch()

    return {
      page
    }
  },
  head: {
    title: 'Templating rules'
  }
}
</script>
