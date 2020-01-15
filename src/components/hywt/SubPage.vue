<template>
  <div class="q-px-sm">
    <div v-if="index==='1-1'">
      <not-available />
    </div>
    <div v-else-if="index==='1-2'">
      <visitors />
    </div>
    <div v-else-if="index==='2'">
      <not-available />
    </div>
    <div v-else-if="index==='3'">
      <not-available />
    </div>
    <div v-else-if="index==='4'">
      <not-available />
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'SubPage',
  components: {
    'not-available': require('components/hywt/NotAvailable.vue').default,
    'visitors': require('components/hywt/Visitors.vue').default
  },
  props: {
    index: {
      type: String,
      default: '1-1'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
