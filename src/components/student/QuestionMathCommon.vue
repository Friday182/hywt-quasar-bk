<template>
  <div>
    <q-card
      class="q-mt-md q-pa-xl"
      no-caps
      style="width: 50%; color: blue; font-size: 15pt"
      align="left"
    >
      <vue-mathjax
        :formula="formula"
        :options="{}"
      />
    </q-card>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { VueMathjax } from 'vue-mathjax'

export default {
  name: 'QuestionMathCommon',
  components: {
    'vue-mathjax': VueMathjax
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('questions', ['getQuestions']),
    formula: function () {
      return this.getQuestions[this.index].questionText
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
