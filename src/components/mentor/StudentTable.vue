<template>
  <div class="q-px-sm">
    <q-table
      title="Your Students"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleColumns"
      separator="cell"
      row-key="id"
      :table-header-style="{ backgroundColor: 'lightblue' }"
      no-data-label="You don't have any student."
      fixed-center
      bordered
      dense
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">
          Your Students
        </div>
        <q-space />
        <q-btn
          flat
          round
          icon="add"
          color="blue"
          @click="addStudent=true"
        />
        <q-btn
          class="q-ml-md"
          flat
          round
          dense
          color="blue"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @mousedown.native.prevent="rowSelected(props.row.id)"
        >
          <q-td
            key="id"
            :props="props"
          >
            {{ props.row.id }}
          </q-td>
          <q-td
            key="name"
            :props="props"
          >
            {{ props.row.name }}
          </q-td>
          <q-td
            key="password"
            :props="props"
          >
            {{ props.row.password }}
          </q-td>
          <q-td
            key="level"
            :props="props"
          >
            {{ props.row.level }}
          </q-td>
          <q-td
            key="assignment"
            :props="props"
            style="color:green;"
          >
            {{ props.row.assignment }}
            <q-popup-edit
              v-if="!enableAi[props.row.__index]"
              v-model="props.row.assignment"
              title="Change Assignment"
              buttons
              persistent
              @save="changeAssignment"
            >
              <q-input
                v-model="props.row.assignment"
                type="text"
                dense
                autofocus
                hint="Please using ',' to seperate tasks"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="report"
            :props="props"
          >
            {{ props.row.report }}
          </q-td>
          <q-td
            key="membership"
            :props="props"
          >
            <q-btn
              flat
              no-caps
              text-color="green"
              @click="toMembershipUpdate(props.row.id)"
            >
              <p v-if="props.row.membershipActive">
                Update Membership
              </p>
              <p v-else>
                Get Membership
              </p>
            </q-btn>
          </q-td>
          <q-td
            key="expireDate"
            :props="props"
          >
            {{ props.row.expireDate }}
          </q-td>
          <q-td
            key="ai"
            :props="props"
          >
            <q-toggle
              v-if="props.row.membershipActive"
              v-model="enableAi[props.row.__index]"
              dense
              color="orange"
              @input="aiEnable(enableAi[props.row.__index], props.row.id)"
            />
          </q-td>
          <q-td
            key="action"
            :props="props"
          >
            <q-btn
              flat
              icon="delete"
              :disable="props.row.membershipActive"
              @click="toDeleteStudent(props.row.id, props.row.name)"
            />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <span>
            You don't have any student, add student by press
          </span>
          <q-icon
            size="2em"
            name="add"
          />
        </div>
      </template>
      <!-- slot name syntax: body-cell-<column_name> -->
    </q-table>
    <q-card
      class="q-mt-lg"
    >
      <messages />
    </q-card>
    <membership-update
      :student-id="actStudent"
      :membership-active="membershipShow"
      @memebershipClose="membershipDeactive"
    />
    <add-student
      :active="addStudent"
      @studentAddCompleted="addStudentDone"
    />
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ASSIGNMENT_MUTATION, AI_MUTATION, DEL_STUDENT_MUTATION } from '../../graphql/mutations'

// @input="val => { props.row.assignment = val.toUpperCase() }"

export default {
  name: 'StudentTable',
  components: {
    'membership-update': require('components/mentor/MembershipUpdate.vue').default,
    'add-student': require('components/mentor/StudentAdd.vue').default,
    'messages': require('components/common/Message.vue').default
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      alert: false,
      errorId: 0,
      active: false,
      enableAi: [],
      addStudent: false,
      delStudent: false,
      delName: '',
      actStudent: 0,
      studentId: 0,
      upperAssignment: '',
      membershipShow: false,
      visibleColumns: ['id', 'name', 'password', 'level', 'assignment', 'report', 'membership', 'expireDate', 'ai', 'action'],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'center',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'password',
          align: 'center',
          label: 'Password',
          field: 'password',
          sortable: false
        },
        {
          name: 'level',
          align: 'center',
          label: 'Level',
          field: 'level',
          sortable: true
        },
        {
          name: 'assignment',
          align: 'center',
          label: 'Assignment',
          field: 'assignment',
          sortable: false
        },
        {
          name: 'report ',
          align: 'center',
          label: 'Report',
          field: 'report',
          sortable: false
        },
        {
          name: 'membership',
          align: 'center',
          label: 'Membership',
          field: 'membership',
          sortable: false
        },
        {
          name: 'expireDate',
          align: 'center',
          label: 'Expire Date',
          field: 'expireDate',
          sortable: true
        },
        {// Note the ai could be enable/disalbed, but not saved in the database yet
          name: 'ai',
          align: 'center',
          label: 'AI Enable',
          field: 'ai',
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: 'action',
          field: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    ...mapGetters('mentor', ['currentMentor']),
    mentorEmail: function () {
      return this.currentUser.mentorEmail
    },
    tableData: function () {
      return this.currentMentor.students
    }
  },
  mounted () {
    this.upperAssignment = ''
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].aiEnabled === true) {
        this.enableAi.push(true)
      } else {
        this.enableAi.push(false)
      }
    }
  },
  methods: {
    ...mapActions('currentUser', ['updateStudent']),
    ...mapMutations('mentor', ['mentorDelStudent']),
    toMembershipUpdate (id) {
      console.log('get membership for id - ', id)
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id === id) {
          console.log('membership is - ', this.tableData[i].membershipActive)
        }
      }
      this.actStudent = Number(id)
      this.membershipShow = true
    },
    membershipDeactive () {
      this.actStudent = 0
      this.membershipShow = false
    },
    addStudentDone (opt) {
      this.addStudent = false
      if (opt > 0) {
        this.$emit('refreshRequired')
      }
    },
    toDeleteStudent (id, name) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Delete student <span class="text-red text-h5">' + name + '</span>?',
        html: true,
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$apollo
          .mutate({
            mutation: DEL_STUDENT_MUTATION,
            variables: {
              studentId: Number(id),
              mentorEmail: this.mentorEmail
            }
          })
          .then(response => {
            if (response.data.delStudent.ok === true) {
              this.mentorDelStudent(id)
              this.$emit('refreshRequired')
            } else {
              this.$q.dialog({
                title: 'Alert',
                message: 'Delete Student Failed!'
              })
            }
            console.log('delete student done - ' + response.data.delStudent.ok)
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    rowSelected (opt) {
      console.log('row selected - ' + JSON.stringify(opt))
      this.studentId = opt
    },
    aiEnable (newVal, id) {
      console.log('toggle - ', newVal, id)
      if (newVal === false) {
        // should jump out a dialog to confirm disable AI
      }
      this.$apollo
        .mutate({
          mutation: AI_MUTATION,
          variables: {
            studentId: id,
            aiEnabled: newVal
          }
        })
        .then(response => {
          if (response.data.setAiEnabled.ok) {
            // popup a message at the bottom
          } else {
            this.alertMsg = 'Set AI Status failed'
            this.alert = true
          }
        })
        .catch(error => {
          this.alertMsg = 'Invalid id or assignment, if not sure, contact admistrator.'
          this.alert = true
          console.log(error)
        })
    },
    changeAssignment (newVal, oldVal) {
      // console.log('studentId - ' + this.studentId)
      // console.log('Assignment old - ' + oldVal)
      // console.log('Assignment new - ' + newVal)
      newVal = newVal.toUpperCase()
      this.tableData.assignment = newVal
      this.$apollo
        .mutate({
          mutation: ASSIGNMENT_MUTATION,
          variables: {
            studentId: this.studentId,
            assignment: newVal
          }
        })
        .then(response => {
          if (response.data.setAssignment.ok) {
            this.tableData.assignment = newVal
            // popup a message at the bottom
          } else {
            this.alertMsg = 'Assignment update failed'
            this.alert = true
            this.tableData.assignment = oldVal
          }
        })
        .catch(error => {
          this.alertMsg = 'Invalid id or assignment, if not sure, contact admistrator.'
          this.alert = true
          this.tableData.assignment = oldVal
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
