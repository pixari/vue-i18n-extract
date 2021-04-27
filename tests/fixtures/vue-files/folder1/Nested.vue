<script>
export default {
  name: 'test',
  data () {
    return {
      a: this.$t('data.example'),
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ a }}</h1>
    <p v-t="'header.titles.title_1'"></p>
  </div>
</template>
