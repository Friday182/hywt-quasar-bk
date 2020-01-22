<template>
  <div class="q-mx-lg q-px-lg">
    <q-table
      title="Today's Homework"
      :data="assignmentData"
      :columns="columns"
      separator="cell"
      row-key="name"
      :table-header-style="{ backgroundColor: 'lightblue' }"
      fixed-center
      bordered
      dense
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="col-4 q-table__title">
          Today's Homework
        </div>
        <q-space />
        <q-btn
          flat
          disable
        >
          Level: {{ mathLevel }}
        </q-btn>
      </template>
      <!-- slot name syntax: body-cell-<column_name> -->
      <q-td
        slot="body-cell-play"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          flat
          icon="play_circle_outline"
          @click="toRunTask(props.row.name)"
        />
      </q-td>
      <q-td
        slot="body-cell-done"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          v-if="props.row.done"
          flat
          color="green"
          icon="done_outline"
        />
        <q-spinner-hourglass
          v-else
          color="grey"
          size="sm"
        />
      </q-td>
    </q-table>
    <runTask
      :active="active"
      :taskid="currentTaskId"
      @completed="processTaskClosed"
    />
    <div
      v-if="devMode"
      class="row"
    >
      <q-input
        v-model="text1"
        label="I"
        style="width: 20px"
      />
      <q-input
        v-model="text2"
        label="has"
        style="width: 40px"
      />
      <q-input
        v-model="text4"
        label="an"
        style="width: 30px"
      />
      <q-input
        v-model="text3"
        label="dog."
        style="width: 40px; font-size: 10pt"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StudentAssignment',
  components: {
    'runTask': require('components/student/RunTask.vue').default
  },
  data () {
    return {
      devMode: false,
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      active: false,
      currentTaskId: 'NA',
      loading: false,
      columns: [
        {
          name: 'Task',
          required: true,
          label: 'Task',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Description',
          align: 'center',
          label: 'Description',
          field: 'Description',
          sortable: false
        },
        {
          name: 'play',
          align: 'center',
          label: 'play',
          field: 'play',
          sortable: false
        },
        {
          name: 'done',
          align: 'center',
          label: 'Done',
          field: 'done',
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('student', ['currentStudent']),

    assignmentData: {
      // getter
      get: function () {
        let tmp = []
        for (let i = 0; i < this.currentStudent.assignment.length; i++) {
          tmp.push({
            name: this.currentStudent.assignment[i]['k_task'],
            Description: this.currentStudent.assignment[i]['k_desc'],
            done: this.currentStudent.assignment[i]['k_done']
          })
        }
        return tmp
      },
      // setter
      set: function (newValue) {
      }
    },
    mathLevel: function () {
      return this.currentStudent.levels['k_math']
    }
  },
  mounted () {
    console.log('mounted assignment component')
  },
  updated () {
  },
  methods: {
    ...mapActions('student', ['updateAssignmentDone']),

    toRunTask (task) {
      for (let i = 0; i < this.assignmentData.length; i++) {
        if (this.assignmentData[i].name === task) {
          if (this.assignmentData[i].done === true) {
            // are you sure you want do it again?
          }
        }
      }
      this.$q.fullscreen.request()
      this.currentTaskId = task
      this.active = true
    },
    processTaskClosed (opt) {
      if (opt >= 2) {
        this.updateAssignmentDone(this.currentTaskId)
      }
      this.$q.fullscreen.exit()
      this.currentTaskId = 'NA'
      this.active = false
    }
  }
}
</script>

<style>
</style>
