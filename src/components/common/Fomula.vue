<template>
  <div class="q-pa-md q-gutter-xl">
    <q-dialog
      v-model="active"
      persistent
      :maximized=false
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="bg-gray text-black"
        align="center"
      >
        <q-card-section>
          <q-btn
            class="fixed-top-right"
            dense
            flat
            icon="close"
            color="red"
            @click="closeTask"
          >
            <q-tooltip
              content-class="bg-white text-primary"
            >
              Close
            </q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">
            Input Fomula:
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="formula"
            label="formula"
            style="width: 300px"
          />
          <q-btn
          class="q-mt-md"
          style="width: 300px"
          >
            <vue-mathjax
              :formula="formula"
            />
          </q-btn>
        </q-card-section>
        <q-card-section style="width: 50%">
          <q-separator inset />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { VueMathjax } from 'vue-mathjax'
export default {
  components: {
    'vue-mathjax': VueMathjax
  },
  data () {
    return {
      active: true
      formula: '$$ 3 \\times 5 = $$',
    }
  },
  methods: {
    closeTask () {
      this.active = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 1000px
</style>
