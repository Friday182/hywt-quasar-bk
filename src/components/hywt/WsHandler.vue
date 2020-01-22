<template>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'WebSocket Handler',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('currentInfo', ['currentInfo']),
    ...mapMutations('currentInfo', ['setActiveTab']),

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
    // listen incoming message
    window.addEventListener('onmessageWS', this.processData)
  },
  beforeDestroy () {
    window.removeEventListener('onmessageWS', this.processData)
  },
  methods: {
    ...mapActions('currentInfo', ['removeTab']),
    ...mapMutations('visitor', ['addVisitor']),

    // Supported Message Type: 
    // VISITORLOG: One or more visitor records
    processData (e) {
      let tmp = JSON.parse(e.detail.data.data)
      console.log(tmp)
      let rx = JSON.parse(tmp.data)
      if (rx.mType && rx.mType !== '') {
        if (rx.mType === 'VISITORLOG') {
          for (let i = 0; i < rx.data.length; i++) {
            console.log(rx.data[i].dob)
            this.addVisitor({
              name: rx.data[i].name,
              gender: rx.data[i].gender,
              ethnic: rx.data[i].ethnic,
              id: rx.data[i].id,
              dob: rx.data[i].dob,
              block: rx.data[i].block,
              enter: rx.data[i].enter,
              deviceid: rx.data[i].deviceid,
              datetime: rx.data[i].datetime
            })
          }
        }
      } else {
        console.log('invalid message type - ', rx.mType)
      }
    }
  }
}
</script>
