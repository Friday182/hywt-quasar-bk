<template>
  <q-page class="flex-center">
    <div class="row">
      <div class="col" />
      <div class="col-9 q-mt-sm">
        <q-linear-progress
          stripe
          rounded
          style="height: 20px"
          :value="progressPosition"
          color="warning"
          class="q-mt-sm"
        />
        <q-card
          class="my-card text-white shadow-12 q-pt-sm q-px-xl"
          :hight="400"
          style="background: radial-gradient(circle, #35a2ff 0%, #4e4e4e 100%)"
        >
          <q-card-section>
            <div class="text-h6">
              Question - {{ queId }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h7">
              This is the question.
            </div>
          </q-card-section>

          <q-separator white />

          <q-card-section>
            {{ testMessage }}
            {{ $route.params.id }}
          </q-card-section>
          <q-card-section>
            {{ testM }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-2 q-pa-md q-centre">
        <q-btn
          @click="test"
        >
          Finish
        </q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      testMessage: 'this is a demo.',
      testM: '',
      queId: 1,
      queList: [],
      progressPosition: 0.5
    }
  },
  methods: {
    displayDemo () {
      this.$api
        .runDemo()
        .then(res => {
          if (!res.error) {
            this.queList = res.data
            this.showQuestion(0)
          }
        })
    },
    showQuestion (queIdx) {
      this.testMessage = queIdx
      this.queId = queIdx + 1
    },
    test () {
      if (this.$route.params.id === '0') {
        this.testM = 'change it when click button'
      } else {
        this.testM = this.$route.params.id
      }
    }
  },
  computed () {
    this.test()
  },
  mounted () {
    if (this.$route.params.id === '0') {
      this.testM = 'get id 0 when mounted'
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 1000px
</style>
