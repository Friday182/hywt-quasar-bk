<template>
  <q-form>
    <q-dialog
      v-model="active"
      persistent
    >
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-section align="center">
          <div class="row">
            <q-space />
            <q-btn
              flat
              round
              icon="cancel"
              @click="addStudentDone(0)"
            />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            outline
            style="color: green;"
            label="Add New Student"
          />
        </q-card-section>
        <q-card-section class="q-px-xl q-mx-xl q-mt-xl">
          <q-input
            ref="nameInput"
            v-model="name"
            rounded
            outlined
            autofocus
            color="green"
            label="Name:"
            @keyup.enter.native="addByEnter(0)"
          >
            <template v-slot:append>
              <q-icon
                name="face"
                color="orange"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-px-xl q-mx-xl q-mb-xl">
          <q-input
            ref="ageInput"
            v-model="age"
            q-ma-lg
            rounded
            outlined
            color="green"
            label="Age:"
            type="text"
            @keyup.enter.native="addByEnter(1)"
          />
        </q-card-section>
        <q-card-actions
          align="center"
          class="bg-white text-teal"
        >
          <q-btn
            label="OK"
            @click="doAddStudent()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Error: Student {{ errorName }} already exist!
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
  </q-form>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { ADD_STUDENT_MUTATION } from '../../graphql/mutations'

export default {
  name: 'StudentAdd',

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      alert: false,
      age: '',
      name: '',
      errorName: ''
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    mentorEmail: function () {
      return this.currentUser.mentorEmail
    }
  },
  updated () {
    console.log('read mentor email - ' + this.mentorEmail)
  },
  methods: {
    doAddStudent () {
      console.log('add: ' + this.name + ' age:' + this.age + 'mentorEmail: ' + this.mentorEmail)
      if (this.name !== '' && this.age !== '') {
        this.$apollo
          .mutate({
            mutation: ADD_STUDENT_MUTATION,
            variables: {
              name: this.name,
              age: Number(this.age),
              mentorEmail: this.mentorEmail
            }
          })
          .then(response => {
            if (response.data.addStudent.ok === false) {
              this.errorName = response.data.addStudent.student.name
              this.alert = true
            } else {
              console.log('add student done' + response.data.addStudent.ok)
              this.addStudentDone(1)
            }
          })
      }
    },
    addByEnter (opt) {
      if (this.name !== '' && this.age !== '') {
        this.doAddStudent()
      } else {
        if (this.name !== '') {
          this.$refs.ageInput.focus()
        } else {
          this.$refs.nameInput.focus()
        }
      }
    },
    addStudentDone (opt) {
      this.name = ''
      this.age = ''
      this.$emit('studentAddCompleted', opt)
    }
  }
}
</script>

<style>
</style>
