<template>
  <div>
    <q-dialog
      v-model="active"
      persistent
    >
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-actions align="right">
          <div class="row">
            <q-space />
            <q-btn
              flat
              icon="cancel"
              color="primary"
              @click="delStudent(0)"
            />
          </div>
        </q-card-actions>
        <q-card-section
          class="q-mb-lg"
          align="center"
        >
          <q-btn
            flat
            style="color: red;"
            label="Delete Student"
          />
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            outline
            style="color: blue;"
          >
            Id: {{ delId }}, Name: {{ name }} ?
          </q-btn>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Confirm"
            color="warning"
            @click="delStudent(1)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Error: Student Id: {{ delId }}, Name: {{ name }} was NOT deleted!
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="OK"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
import { DEL_STUDENT_MUTATION } from '../../graphql/mutations'

export default {
  name: 'StudentDel',

  props: {
    active: {
      type: Boolean,
      default: false
    },
    delId: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      alert: false
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    mentorEmail: function () {
      return this.currentUser.mentorEmail
    }
  },
  methods: {
    ...mapMutations('mentor', ['mentorDelStudent']),
    delStudent (opt) {
      if (opt === 1) {
        this.$apollo
          .mutate({
            mutation: DEL_STUDENT_MUTATION,
            variables: {
              studentId: this.delId,
              mentorEmail: this.mentorEmail
            }
          })
          .then(response => {
            if (response.data.delStudent.ok === true) {
              this.mentorDelStudent(String(this.delId))
              this.$emit('studentDelCompleted', 1)
            } else {
              this.alert = true
            }
            console.log('delete student done - ' + response.data.delStudent.ok)
          })
      } else {
        this.$emit('studentDelCompleted', 0)
      }
    }
  }
}
</script>

<style>
</style>
