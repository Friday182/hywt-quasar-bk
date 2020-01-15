<template>
  <div class="q-px-sm q-mt-lg">
    <q-table
      title="访客记录"
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
          访客记录
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
import { mapGetters } from 'vuex'

export default {
  name: 'Visitors',
  components: {
    'alert-msg': require('components/common/AlertMsg.vue').default
  },
  props: {
    studentId: {
      type: Number,
      default: 0
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
      loading: true
    }
  },
  computed: {
    ...mapGetters('currentInfo', ['currentInfo']),
    isDeletable: function () {
      return (this.currentInfo.userRole === 'admin')
    }
  },
  mounted () {
    console.log('task log table mounted - ')
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
    },
    alertClose () {
      this.alert = false
      this.alertMsg = ''
    }
  }
}
</script>

<style>
.label {
  white-space: pre-wrap;
}
</style>
