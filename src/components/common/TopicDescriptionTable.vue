<template>
  <div class="q-px-sm">
    <q-table
      title="Your Students"
      :data="tabledata"
      :columns="columns"
      :visible-columns="visibleColumns"
      separator="cell"
      row-key="name"
      :table-header-style="{ backgroundColor: 'lightblue' }"
      fixed-center
      bordered
      dense
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="q-table__title">
          Topic {{ topicname }}
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
      <q-td
        v-if="devMode"
        slot="body-cell-taskid"
        slot-scope="props"
        :props="props"
      >
        {{ props.row.taskid }}
      </q-td>
      <q-td
        slot="body-cell-example"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          flat
          icon="play_circle_outline"
          @click="toRuntask(props.row.taskid)"
        />
      </q-td>
    </q-table>
    <runTask
      :active="active"
      :taskid="currentTaskId"
      :mode="runMode"
      @completed="processTaskClosed"
    />
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'TopicDescriptionTable',
  components: {
    'runTask': require('components/student/RunTask.vue').default
  },
  props: {
    tabledata: {
      type: Array,
      default: () => []
    },
    topicname: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      devMode: true,
      active: false,
      runMode: 1,
      currentTaskId: '',
      pagination: {
        page: 0,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      visibleColumns: ['taskid', 'title', 'description', 'example'], // , 'note'],
      columns: [
        {
          name: 'taskid',
          required: true,
          label: 'Task Id',
          align: 'center',
          field: 'taskid',
          sortable: true
        },
        {
          name: 'title',
          align: 'center',
          label: 'Title',
          field: 'title',
          sortable: false
        },
        {
          name: 'description',
          align: 'center',
          label: 'Description',
          field: 'description',
          sortable: false
        },
        {
          name: 'example',
          align: 'center',
          label: 'Example',
          field: 'example',
          sortable: true
        },
        {
          name: 'note',
          align: 'center',
          label: 'Note',
          field: 'note',
          sortable: false
        }
      ]
    }
  },
  methods: {
    toRuntask (opt) {
      this.active = true
      this.currentTaskId = opt
    },
    processTaskClosed () {
      this.currentTaskId = 'NA'
      this.active = false
    }
  }
}
</script>

<style>
</style>
