<template>
  <div class="fixed-center text-center">
    <p class="text-faded">
      首页正在建设中 ...<strong>(首页)</strong>
    </p>
    {{ info }}
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/Hywt')"
    >
      Go back
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    this.$axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>
