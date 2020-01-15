<template>
  <el-tabs
    v-model="curTab"
    type="border-card"
    editable
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="index"
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Hywt',
  components: {
    'sub-page': require('components/hywt/SubPage.vue').default
  },
  data () {
    return {
      curTab: ''
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
    activeTab: function () {
      return this.currentInfo.activeTab
    }
  },
  methods: {
    ...mapMutations('currentInfo', ['removeTab']),

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
