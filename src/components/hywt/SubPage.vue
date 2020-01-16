<template>
  <div class="q-px-sm">
    <div v-if="index==='1-1'">
      <visitors />
    </div>
    <div v-else-if="index==='1-2'">
      <cert-info />
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
    <div v-else-if="index==='5'">
      <test-page />
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'SubPage',
  components: {
    'test-page': require('components/hywt/TestPage.vue').default,
    'not-available': require('components/hywt/NotAvailable.vue').default,
    'cert-info': require('components/hywt/CertInfo.vue').default,
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
