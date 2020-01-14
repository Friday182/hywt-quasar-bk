<template>
  <div class="q-pa-md">
    <q-table
      title="AI Report"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleColumns"
      separator="cell"
      row-key="id"
      :table-header-style="{ backgroundColor: 'lightblue' }"
      no-data-label="You don't have any data."
      fixed-center
      bordered
      dense
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">
          AI Report
        </div>
        <q-space />
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
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <span>
            This student has not any data available.
          </span>
        </div>
      </template>
      <!-- slot name syntax: body-cell-<column_name> -->
      <q-td
        slot="body-cell-action"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          flat
          no-caps
          text-color="blue"
          label="Details"
          @click="toDetailLog(props.row.id)"
        />
      </q-td>
    </q-table>
  </div>
</template>

<script type="text/javascript">
// import { mapGetters } from 'vuex'
import { GET_AIREPORT_MUTATION } from '../../graphql/mutations'

export default {
  name: 'Report',
  props: {
    studentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      pagination: {
        page: 0,
        rowsPerPage: 20
      },
      tableData: [],
      visibleColumns: ['id', 'papers', 'questions', 'percent', 'papertime', 'quetime', 'master', 'action'],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'TaskId',
          align: 'center',
          field: 'id',
          sortable: true
        },
        {
          name: 'papers',
          align: 'center',
          label: 'Total Papers',
          field: 'papers',
          sortable: true
        },
        {
          name: 'questions',
          align: 'center',
          label: 'Total Questions',
          field: 'questions',
          sortable: false
        },
        {
          name: 'percent',
          align: 'center',
          label: 'Correct Percent',
          field: 'percent',
          sortable: true
        },
        {
          name: 'papertime',
          align: 'center',
          label: 'Avg Seconds/Paper',
          field: 'papertime',
          sortable: false
        },
        {
          name: 'quetime',
          align: 'center',
          label: 'Avg Que Sec/Std Sec',
          field: 'quetime',
          sortable: false
        },
        {
          name: 'master',
          align: 'center',
          label: 'Master',
          field: 'master',
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          label: 'Action',
          field: 'action',
          sortable: false
        }
      ]
    }
  },
  computed: {
  },
  mounted () {
    this.$apollo
      .mutate({
        mutation: GET_AIREPORT_MUTATION,
        variables: {
          studentId: this.studentId
        }
      })
      .then(response => {
        if (response.data.aiReport.ok) {
          this.updateReport(response.data.aiReport.report)
        } else {
          this.$q.dialog({
            title: 'Alert',
            message: 'Get AI Report Failed!'
          })
        }
      })
      .catch(error => {
        this.$q.dialog({
          title: 'Alert',
          message: 'Get AI Report Error!'
        })
        console.log(error)
      })
  },
  methods: {
    updateReport (report) {
      this.loading = false
      let newData = JSON.parse(report)
      // build table
      if (newData.length > 0) {
        console.log('Read task log updated - ' + newData.length)
        this.tableData = []
        let alltime = 0
        let allpaper = 0
        let allque = 0
        for (let i = 0; i < newData.length; i++) {
          this.tableData.push({
            id: newData[i].id,
            papers: Number(newData[i].total_papers),
            questions: Number(newData[i].total_ques),
            percent: Number(newData[i].correct_perc),
            papertime: newData[i].avg_sec_paper,
            quetime: newData[i].avg_sec_que,
            master: Number(newData[i].master)
          })
          alltime += Number(newData[i].avg_sec_paper) * Number(newData[i].total_papers)
          allpaper += Number(newData[i].total_papers)
          allque += Number(newData[i].total_ques)
        }
        alltime = Math.round(alltime / 60)
        this.tableData.push({
          id: 'Total',
          papers: allpaper,
          questions: allque,
          percent: 'na',
          papertime: String(alltime) + ' Minutes',
          quetime: 'na',
          master: 'na'
        })
      } else {
        console.log('Read task log failed!')
      }
    },
    toDetailLog (task) {
      console.log(task)
    }
  }
}
</script>

<style>
</style>
