<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar
        class="bg-blue-10 text-white"
      >
        <q-toolbar-title>
          <router-link to="/">
            <q-icon
              size="lg"
              name="supervised_user_circle"
              color="white"
            />
            <q-chip
              size="lg"
              color="blue-10"
              text-color="white"
              style="font: bold 100% Cursive;"
            >
              社会要素管控平台
            </q-chip>
          </router-link>
        </q-toolbar-title>
        <q-space />
        <div
          v-if="loginRole!=''"
          class="q-mx-sm"
        >
          <q-btn
            no-caps
            color="blue"
            size="sm"
            @click="toMentorHome"
          >
            <q-icon name="apartment" />
            数据中心
          </q-btn>
          <q-chip
            size="sm"
            color="blue-10"
            text-color="red"
            style="font: bold 100% Cursive;"
          >
            欢迎您： {{ loginRole }}
          </q-chip>
          <q-btn
            flat
            no-caps
            text-color="white"
            @click="signout()"
          >
            <q-icon name="exit_to_app" />
          </q-btn>
        </div>
        <div v-else>
          <q-btn
            flat
            color="white"
            @click="toSigninup()"
          >
            注册新用户
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :width="180"
      bordered
      :content-style="{ backgroundColor: '#2020C0' }"
    >
      <el-menu
        mode="vertical"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#2020C0"
        text-color="#fff"
        active-text-color="#ff804b"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span> 设备信息管理 </span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="1-1"
            >
              访客信息
            </el-menu-item>
            <el-menu-item
              index="1-2"
            >
              人证快递柜
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu" />
          <span slot="title"> 车辆出入记录 </span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document" />
          <span slot="title"> 快递信息管理 </span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting" />
          <span slot="title"> 设备管理 </span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-edit" />
          <span slot="title"> 测试输入 </span>
        </el-menu-item>
      </el-menu>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      elevated
      class="bg-blue-10 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          Copyright @DeCom Technology Ltd. 2020
        </q-toolbar-title>
        <q-btn
          outline
          color="white"
          icon-right="mail"
          label="Contact Us"
          class="q-mr-xl"
          @click="sendMessage"
        />
      </q-toolbar>
    </q-footer>
    <student-login
      :showlogin="showLogin"
      @studentLoginClose="showLogin=false"
    />
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MyLayout',
  components: {
    'student-login': require('components/student/StudentLogin.vue').default
  },
  data () {
    return {
      leftDrawerOpen: false, // this.$q.platform.is.desktop,
      showStudentHome: false,
      signinDialog: false,
      showLogin: false,
      allTabs: [
        { name: '1-1', title: '访客信息' },
        { name: '1-2', title: '人证快递柜' },
        { name: '2', title: '车辆出入记录' },
        { name: '3', title: '快递信息管理' },
        { name: '4', title: '设备管理' },
        { name: '5', title: '测试输入' }
      ]
    }
  },
  computed: {
    ...mapGetters('currentInfo', ['currentInfo']),

    loginRole: function () {
      return this.currentInfo.userRole
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(this.$route.path)
      console.log(to.path)
      this.manageLayout()
    }
  },
  beforeCreate () {
    console.log('layout beforeCreate - ', this)
  },
  created () {
    console.log('layout created')
  },
  beforeMount () {
    console.log('layout before mounte - ' + this.$route.path + 'loginRole: ' + this.loginRole)
    if (this.$route.path === '/hywt' && this.loginRole !== 'admin') {
      this.$router.push('/')
    }
  },
  mounted () {
    console.log('layout mounted')
    this.manageLayout()
  },
  methods: {
    ...mapMutations('currentInfo', ['addTab', 'updateInfo']),

    manageLayout () {
      if (this.$route.path !== '/Hywt') {
        this.leftDrawerOpen = false
      } else {
        this.leftDrawerOpen = true
      }
    },
    handleOpen (index) {
      console.log('open ...', index)
    },
    handleClose (index) {
      console.log('close ...', index)
    },
    handleSelect (index, indexPath) {
      console.log(index, indexPath)
      // set current menu index into store
      for (let i = 0; i < this.allTabs.length; i++) {
        if (index === this.allTabs[i].name) {
          this.addTab(this.allTabs[i])
          break
        }
      }
      // this.allTabs.forEach(element => {
      // if (index === element.name) {
      // this.addTab(element)
      // }
      // })
    },
    toSigninup () {
      console.log('set signin to true')
      this.signinDialog = true
    },
    toMentorHome () {
    },
    sendMessage () {
    },
    beforeRouteUpdate (to, from, next) {
      console.log('layout before update')
    },
    signout () {
      this.updateInfo({
        menuIdx: '1-1',
        userName: '',
        userRole: '',
        tabs: [],
        activeTab: ''
      })
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        this.$router.go(this.$router.currentRoute)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
