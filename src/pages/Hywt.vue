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
  methods: {
    ...mapActions('currentInfo', ['removeTab']),

    handleTabsEdit (targetName, action) {
      console.log('in edit - ', targetName, action)
      if (action === 'remove') {
        this.tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            this.removeTab(tab)
          }
        })
      }
    }
  }
}
</script>
