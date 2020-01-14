<template>
  <q-page class="flex flex-left q-mt-lg q-ml-lg">
    <q-list
      bordered
      separator
    >
      <q-item
        v-for="(item, key) in schoolDic"
        :key="key"
        clickable
        @click="toSchoolWeb(item.web)"
      >
        <q-item-section avatar>
          {{ item.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      schoolDic: [
        {
          name: 'Antrim Grammar School',
          desc: 'Address: Antrim, NI',
          web: 'https://www.antrimgrammar.org'
        },
        {
          name: 'Antrim Grammar School',
          desc: 'Address: Antrim, NI',
          web: 'https://www.antrimgrammar.org'
        },
        {
          name: 'Antrim Grammar School',
          desc: 'Address: Antrim, NI',
          web: 'https://www.antrimgrammar.org'
        }
      ]
    }
  },
  methods: {
    toSchoolWeb (url) {
      openURL(url)
    }
  }
}
</script>

<style>
</style>
