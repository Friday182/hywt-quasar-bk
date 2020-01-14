<template>
  <div class="q-px-sm q-mt-lg">
    <q-table
      title="Logs Table"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleColumns"
      separator="cell"
      wrap-cells
      row-key="date"
      :table-header-style="{ backgroundColor: 'lightblue' }"
      fixed-center
      bordered
      dense
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">
          Your Students
        </div>
        <q-space />
        <q-btn
          class="q-ml-md"
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
      <!-- slot name syntax: body-cell-<column_name> -->
      <q-td
        slot="body-cell-action"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          v-if="isDeletable"
          flat
          icon="delete"
          @click="toDeleteLog(props.row.id)"
        />
      </q-td>
    </q-table>
    <alert-msg
      :active="alert"
      :msg="alertMsg"
      @cancelAlert="alertClose"
    />
  </div>
</template>

<script type="text/javascript">
import { TASK_LOGS_QUERY } from '../../graphql/queries'
import { DEL_LOG_MUTATION } from '../../graphql/mutations'
import { mapGetters } from 'vuex'

export default {
  name: 'LogTable',
  components: {
    'alert-msg': require('components/common/AlertMsg.vue').default
  },
  props: {
    studentId: {
      type: Number,
      default: 0
    },
    newLog: {
      type: Boolean,
      default: false
    },
    numLog: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      alert: false,
      alertMsg: '',
      pagination: {
        page: 0,
        rowsPerPage: 10
      },
      visibleColumns: ['name', 'date', 'taskid', 'totalque', 'numwrong', 'correctperc', 'totalsec', 'avgsec', 'stdsec', 'score', 'action'],
      columns: [
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'date',
          align: 'center',
          label: 'Date',
          field: 'date',
          sortable: true
        },
        {
          name: 'taskid',
          align: 'center',
          label: 'Task Id',
          field: 'taskid',
          sortable: true
        },
        {
          name: 'totalque',
          align: 'center',
          label: 'Number Questions',
          field: 'totalque',
          sortable: true
        },
        {
          name: 'numwrong ',
          align: 'center',
          label: 'Wrong  Number',
          field: 'numwrong',
          sortable: true
        },
        {
          name: 'correctperc',
          align: 'center',
          label: 'Correct  Percentage',
          field: 'correctperc',
          sortable: true
        },
        {
          name: 'totalsec',
          align: 'center',
          label: 'Total Sec',
          field: 'totalsec',
          sortable: true
        },
        {
          name: 'avgsec',
          align: 'center',
          label: 'Sec/Question',
          field: 'avgsec',
          sortable: true
        },
        {
          name: 'stdsec',
          align: 'center',
          label: 'Reference Sec/Que',
          field: 'stdsec',
          sortable: true
        },
        {
          name: 'score',
          align: 'center',
          label: 'Score',
          field: 'score',
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: 'action',
          field: 'action',
          sortable: false
        }
      ],
      taskLogs: [],
      tableData: [],
      loading: true,
      skipQueryTasklog: true
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    isDeletable: function () {
      return (this.currentUser.sessionLogin === 'mentor')
    }
  },
  mounted () {
    console.log('task log table mounted - ', this.studentId)
    if (this.newLog === true) {
      this.skipQueryTasklog = true
      this.$apollo.queries.taskLogs.refetch({
        userId: this.studentId,
        numLog: this.numLog
      })
    }
  },
  destroyed () {
    console.log('task log table destroied')
  },
  methods: {
    updateTasklog (newData) {
      this.loading = false
      if (newData.length > 0) {
        console.log('Read task log updated - ' + newData.length)
        this.tableData = []
        for (let i = 0; i < newData.length; i++) {
          this.tableData.push({
            id: newData[i].id,
            name: newData[i].userName,
            date: String(newData[i].createDate).slice(0, 19),
            taskid: newData[i].taskId,
            totalque: newData[i].totalQue,
            numwrong: newData[i].firstWrong,
            correctperc: newData[i].correctPerc,
            totalsec: newData[i].totalSec,
            avgsec: newData[i].avgSec,
            stdsec: newData[i].avgStdSec,
            score: newData[i].totalScore
          })
        }
      } else {
        console.log('Read task log failed!')
      }
    },
    toDeleteLog (logId) {
      console.log('delete: ' + logId)
      this.$apollo
        .mutate({
          mutation: DEL_LOG_MUTATION,
          variables: {
            logId: logId
          }
        })
        .then(response => {
          if (response.data.delLog.ok === false) {
            this.alertMsg = 'Update stickers failed, please report error to Support@DecomTechnology.com.'
            this.alert = true
          } else {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id === logId) {
                this.tableData.splice(i, 1)
              }
            }
          }
        })
    },
    alertClose () {
      this.alert = false
      this.alertMsg = ''
    }
  },
  apollo: {
    taskLogs: {
      query: TASK_LOGS_QUERY,
      variables () {
        return {
          userId: this.studentId,
          numLog: this.numLog
        }
      },
      error (error) {
        console.error('We\'ve got an error!', error)
      },
      skip () {
        return this.skipQueryTasklog
      },
      result (data, key) {
        this.updateTasklog(data.data.taskLogs)
      }
    }
  }
}
</script>

<style>
.label {
  white-space: pre-wrap;
}
</style>
