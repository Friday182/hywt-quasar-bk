<template>
  <div>
    <q-input
      ref="input1"
      v-model="ans1text"
      :label="answer1_text"
      outlined
      autofocus
      style="width: 300px; font-size: 18px"
      @keyup.enter="selected()"
    />
    <q-input
      v-if="answer2_text !== ''"
      ref="input2"
      v-model="ans2text"
      :label="answer2_text"
      outlined
      style="width: 300px; font-size: 18px"
      class="q-mt-md"
      @keyup.enter="selected()"
    />
    <q-btn
      label="Next"
      outlined
      color="primary"
      class="q-mt-md q-mb-xl"
      @click="selected()"
    />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

export default {
  name: 'InputTextAnswer',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ansCorrect: false,
      ans1text: '',
      ans2text: ''
    }
  },
  computed: {
    ...mapGetters('questions', ['getQuestions']),
    answer1_text: function () {
      return this.getQuestions[this.index].option1
    },
    answer2_text: function () {
      return this.getQuestions[this.index].option2
    }
  },
  methods: {
    selected () {
      let selectDone = false
      if (this.ans1text === '') {
        this.$refs.input1.focus()
      } else if (this.getQuestions[this.index].option2 !== '') {
        if (this.ans2text === '') {
          this.$refs.input2.focus()
        } else {
          selectDone = true
        }
      } else {
        // only one input and already done
        selectDone = true
      }

      if (selectDone === true) {
        console.log('answer - ', this.index, this.ans1text, this.getQuestions[this.index].answer1)
        if (this.ans1text.trim().toUpperCase() === this.getQuestions[this.index].answer1.toUpperCase()) {
          if (this.getQuestions[this.index].option2 !== '') {
            if (this.ans2text.trim().toUpperCase() === this.getQuestions[this.index].answer2.toUpperCase()) {
              this.ansCorrect = true
            } else {
              this.ansCorrect = false
            }
          } else {
            this.ansCorrect = true
          }
        } else {
          this.ansCorrect = false
        }
        this.$emit('ansCorrect', this.ansCorrect)
        this.$refs.input1.focus()
        this.ans1text = ''
        this.ans2text = ''
      }
    }
  }
}
</script>

<style>
</style>
