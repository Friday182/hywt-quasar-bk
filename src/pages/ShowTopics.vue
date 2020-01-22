<template>
  <q-page class="flex-center">
    <div class="q-pa-md">
      <div
        class="q-gutter-y-md"
        style="max-width: 100%"
        fixed-top
      >
        <q-tabs
          v-model="tab"
          class="bg-grey-1 shadow-2"
          no-caps
          dense
        >
          <q-tab
            name="ma"
            label="Basic Calculations"
            class="text-blue"
          />
          <q-tab
            name="mb"
            label="Decimal & Fraction"
            class="text-blue"
          />
          <q-tab
            name="mc"
            label="Algebra"
            class="text-blue"
          />
          <q-tab
            name="md"
            label="Measurement"
            class="text-blue"
          />
          <q-tab
            name="me"
            label="Shapes & Space"
            class="text-blue"
          />
          <q-tab
            name="mf"
            label="Handling Data"
            class="text-blue"
          />
          <q-tab
            name="mg"
            label="Problem Solving"
            class="text-blue"
          />
          <q-tab
            name="mh"
            label="Mock Test"
            class="text-blue"
          />
        </q-tabs>

        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel name="ma">
            <desctable
              :tabledata="tableMa"
              :loading="loadingMa"
              :topicname="topicMa"
            />
          </q-tab-panel>

          <q-tab-panel name="mb">
            <desctable
              :tabledata="tableMb"
              :topicname="topicMb"
            />
          </q-tab-panel>

          <q-tab-panel name="mc">
            <desctable
              :tabledata="tableMc"
              :topicname="topicMc"
            />
          </q-tab-panel>

          <q-tab-panel name="md">
            <desctable
              :tabledata="tableMd"
              :topicname="topicMd"
            />
          </q-tab-panel>
          <q-tab-panel name="me">
            <desctable
              :tabledata="tableMe"
              :topicname="topicMe"
            />
          </q-tab-panel>
          <q-tab-panel name="mf">
            <desctable
              :tabledata="tableMf"
              :topicname="topicMf"
            />
          </q-tab-panel>
          <q-tab-panel name="mg">
            <desctable
              :tabledata="tableMg"
              :topicname="topicMg"
            />
          </q-tab-panel>
          <q-tab-panel name="mh">
            <desctable
              :tabledata="tableMh"
              :topicname="topicMh"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ALL_DESCRIPTION_QUERY } from '../graphql/queries'

export default {
  name: 'ShowTopics',
  components: {
    'desctable': require('components/common/TopicDescriptionTable.vue').default
  },
  data () {
    return {
      tab: 'ma',
      loadingMa: true,
      skipQueryAllDescription: true,
      allDescripitions: [],
      tableMa: [],
      topicMa: 'MA: Basic Calculation',
      tableMb: [],
      topicMb: 'MB: Decimal & Fraction',
      tableMc: [],
      topicMc: 'MA: Basic Calculation',
      tableMd: [],
      topicMd: 'MA: Basic Calculation',
      tableMe: [],
      topicMe: 'MA: Basic Calculation',
      tableMf: [],
      topicMf: 'MA: Basic Calculation',
      tableMg: [],
      topicMg: 'MA: Basic Calculation',
      tableMh: [],
      topicMh: 'MA: Basic Calculation'
    }
  },
  created () {
    this.skipQueryAllDescription = false
  },
  methods: {
    updateTable (newData) {
      this.loadingMa = false
      this.skipQueryAllDescription = true
      if (newData.length > 0) {
        console.log('Get all description - ' + newData.length)
        this.tableMa = []
        this.tableMb = []
        this.tableMc = []
        this.tableMd = []
        this.tableMe = []
        this.tableMf = []
        this.tableMg = []
        this.tableMh = []
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].taskId.match('MA')) {
            this.tableMa.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MB')) {
            this.tableMb.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MC')) {
            this.tableMc.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MD')) {
            this.tableMd.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('ME')) {
            this.tableMe.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MF')) {
            this.tableMf.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MG')) {
            this.tableMg.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          } else if (newData[i].taskId.match('MH')) {
            this.tableMh.push({
              taskid: newData[i].taskId,
              title: newData[i].title,
              description: newData[i].description,
              example: newData[i].example,
              note: newData[i].note
            })
          }
        }
      } else {
        this.tableMa = []
        console.log('Fetch all description failed')
      }
    }
  },
  apollo: {
    allDescripitions: {
      query: ALL_DESCRIPTION_QUERY,
      error (error) {
        console.error('We\'ve got an error!', error)
      },
      skip () {
        return this.skipQueryAllDescription
      },
      result (data, key) {
        this.updateTable(data.data.allDescripitions)
      }
    }
  }
}
</script>

<style>
</style>
