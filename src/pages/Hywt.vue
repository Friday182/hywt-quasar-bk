<template>
  <el-tabs
    v-model="activeTab"
    type="border-card"
    editable
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <sub-page
        :index="item.name"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { createSocket } from '../api/websocket'

export default {
  name: 'Hywt',
  components: {
    'sub-page': require('components/hywt/SubPage.vue').default
  },
  data () {
    return {
      curTab: '1-1'
    }
  },
  computed: {
    ...mapGetters('currentInfo', ['currentInfo']),

    loginRole: function () {
      return this.currentInfo.userRole
    },
    tabs: function () {
      return this.currentInfo.tabs
    },
    activeTab: {
      get: function () {
        return this.currentInfo.activeTab
      },
      set: function (newValue) {
        console.log('set active tab - ', newValue)
        // this.setActiveTab(newValue)
      }
    }
  },
  mounted () {
    createSocket()
    // listen incoming message
    window.addEventListener('onmessageWS', this.processData)
  },
  beforeDestroy () {
    window.removeEventListener('onmessageWS', this.processData)
  },
  methods: {
    ...mapActions('currentInfo', ['removeTab']),
    ...mapMutations('visitor', ['addVisitor']),
    ...mapMutations('currentInfo', ['setActiveTab']),

    handleTabsEdit (targetName, action) {
      console.log('in edit - ', targetName, action)
      if (action === 'remove') {
        this.tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            this.removeTab(tab)
          }
        })
      }
    },
    processData (e) {
      console.log('Handle WS message: ', e.detail.data.type)
      if (e.detail.data.type === 'VISITORLOG') {
        let logs = JSON.parse(e.detail.data.data)
        console.log('json data: ', logs)
        for (let i = 0; i < logs.length; i++) {
          console.log(logs[i].dob)
          this.addVisitor({
            name: logs[i].name,
            gender: logs[i].gender,
            ethnic: logs[i].ethnic,
            id: logs[i].id,
            dob: logs[i].dob,
            block: logs[i].block,
            enter: logs[i].enter,
            deviceid: logs[i].deviceid,
            datetime: logs[i].datetime
          })
        }
        this.setActiveTab('1-1')
      } else if (e.detail.data.type === 'ERROR') {
        console.log('Websocket Error message: ', e.detail.data.data)
      }
    }
  }
}
</script>
