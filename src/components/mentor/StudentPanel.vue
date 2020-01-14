<template>
  <div class="q-pa-md">
    <div
      class="q-gutter-y-md"
      style="max-width: 100%"
    >
      <q-tabs
        v-model="tab"
        class="bg-grey-3 shadow-2"
        no-caps
        dense
      >
        <q-tab
          name="profile"
          icon="face"
          label="Profile"
        />
        <q-tab
          name="logs"
          icon="list"
          label="Task Logs"
        >
          <q-badge
            color="red"
            floating
          >
            2
          </q-badge>
        </q-tab>
        <q-tab
          name="report"
          icon="list_alt"
          label="AI Report"
          :disable="!student.membershipActive"
        >
          <q-badge
            v-if="!student.membershipActive"
            color="red"
            floating
          >
            Premium
          </q-badge>
        </q-tab>
        <q-tab
          name="management"
          icon="alarm"
          label="Management"
        >
          <q-badge
            color="red"
            floating
          >
            10+
          </q-badge>
        </q-tab>
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="profile">
          <profile />
        </q-tab-panel>

        <q-tab-panel name="logs">
          <tasklogs
            :student-id="studentId"
            :num-log="numLog"
            :new-log="true"
          />
        </q-tab-panel>

        <q-tab-panel name="report">
          <report
            :student-id="studentId"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

export default {
  name: 'StudentPanel',
  components: {
    'tasklogs': require('components/common/TasklogTable.vue').default,
    'profile': require('components/mentor/StudentProfile.vue').default,
    'report': require('components/mentor/Report.vue').default
  },
  props: {
    studentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tab: 'logs',
      numLog: 50,
      mentorId: 1,
      visibleColumns: ['id', 'name', 'password', 'level', 'assignment', 'report', 'membership', 'expire', 'action'],
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
          name: 'expire',
          align: 'center',
          label: 'expire',
          field: 'expire',
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
    ...mapGetters('mentor', ['currentMentor']),
    student: function () {
      return this.currentMentor.students[0]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
