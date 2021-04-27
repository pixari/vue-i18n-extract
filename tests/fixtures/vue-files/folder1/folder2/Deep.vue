<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'ex3',
  setup () {
    const { t, tc } = useI18n();

    const title = t('title');

    return {
      t,
      tc,
      title,
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ t('menu.p_1', { count: 2 }) }}</p>
    <i18n path="link.a">
      <a href="#">{{ tc('link.b', 3) }}</a>
    </i18n>
  </div>
</template>
