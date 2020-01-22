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
              @click="closeHelper()"
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
    },
    taskId: {
      type: String,
      default: ''
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
  methods: {
    closeHelper () {
      this.$emit('helperClose - ' + taskId)
    }
  }
}
</script>

<style>
</style>
