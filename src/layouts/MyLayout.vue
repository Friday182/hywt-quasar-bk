<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar
        class="bg-blue-10 text-white"
      >
        <q-toolbar-title>
          <router-link to="/">
            <q-icon
              size="xl"
              name="supervised_user_circle"
              color="white"
            />
            <q-chip
              size="lg"
              color="blue"
              text-color="white"
              style="font: bold 100% Cursive;"
            >
              社会要素管控平台
            </q-chip>
          </router-link>
        </q-toolbar-title>
        <q-space />
        <div
          v-if="sessionLogin!=''"
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
            欢迎您： {{ sessionLogin }}
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
      :width="250"
      bordered
      :content-style="{ backgroundColor: '#2020C0' }"
    >
      <el-menu
        mode="vertical"
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2020C0"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>设备信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">访客信息</el-menu-item>
            <el-menu-item index="1-2">人证快递柜</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">车辆出入记录</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">快递信息管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">设备管理</span>
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
    <signinup
      :showsignin="signinDialog"
      @signinClose="closeSigninDialog"
    />
    <student-login
      :showlogin="showLogin"
      @studentLoginClose="showLogin=false"
    />
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  components: {
    'signinup': require('components/mentor/Signinup.vue').default,
    'student-login': require('components/student/StudentLogin.vue').default
  },
  data () {
    return {
      isMainPage: false,
      leftDrawerOpen: false, // this.$q.platform.is.desktop,
      showStudentHome: false,
      signinDialog: false,
      showLogin: false,
      mentorView: true,
      navs: [
        {
          label: 'Topic',
          icon: 'description',
          to: '/ShowTopics',
          description: 'know our topics'
        },
        {
          label: 'User Manual',
          icon: 'book',
          to: '/UserManual',
          description: 'Learn to Use'
        },
        {
          label: 'Curriculum',
          icon: 'receipt',
          to: '/Curriculum',
          description: 'Fully covered'
        },
        {
          label: 'Transfer Test - 2020',
          icon: 'alarm_on',
          to: '/KeyDate',
          description: 'All Info'
        },
        {
          label: 'School Dictionary',
          icon: 'apartment',
          to: '/SchoolDic',
          description: 'Find shools'
        },
        {
          label: 'Membership',
          icon: 'card_membership',
          to: '/membership',
          description: 'Go Premium'
        },
        {
          label: 'Products',
          icon: 'card_membership',
          to: '/Products',
          description: 'See Products'
        },
        {
          label: 'Q & A',
          icon: 'chat',
          to: '/QandA',
          description: 'All you need to know'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    ...mapGetters('student', ['currentStudent']),

    sessionLogin: function () {
      return this.currentUser.sessionLogin
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
    console.log('layout beforeCreate - ' + this.$route.path)
  },
  created () {
    console.log('layout created - ' + this.$route.path)
  },
  beforeMount () {
    console.log('layout before mounte - ' + this.$route.path + 'sessionLogin: ' + this.sessionLogin)
    if (this.$route.path === '/MentorHome' && this.sessionLogin !== 'mentor') {
      this.$router.push('/')
    }
    if (this.$route.path === '/StudentHome' && this.sessionLogin !== 'student') {
      this.$router.push('/')
    }
    // load local data into store
    this.loadUserList()
  },
  mounted () {
    console.log('layout mounted - ' + this.$route.path)
    this.manageLayout()
  },
  beforeUpdate () {
    console.log('layout before update - ' + this.$route.path)
  },
  updated () {
    console.log('layout updated - ' + this.$route.path)
  },
  methods: {
    ...mapActions('currentUser', ['updateUser']),
    ...mapActions('localMentors', ['updateLocalMentors']),
    ...mapActions('localStudents', ['updateLocalStudents']),
    manageLayout () {
      if (this.$route.path !== '/Hywt') {
        this.leftDrawerOpen = false
      } else {
        this.leftDrawerOpen = true
      }
    },
    toSigninup () {
      console.log('set signin to true')
      this.signinDialog = true
    },
    closeSigninDialog (signinOk) {
      console.log('close signin at - ' + signinOk)
      if (signinOk === true) {
        this.toMentorHome()
      }
      this.signinDialog = false
    },
    toStudentHome () {
      if (this.sessionLogin === 'student') {
        this.$router.push('/StudentHome')
      } else {
        this.showLogin = true
      }
    },
    toMentorHome () {
      this.$router.push('/MentorHome')
    },
    toRunDemo () {
      // this.$router.push('/RunDemo/')
    },
    beforeRouteUpdate (to, from, next) {
      console.log('layout before update')
    },
    signout () {
      this.updateUser({
        gId: 0,
        name: '',
        contacts: [],
        mentorEmail: '',
        sessionLogin: ''
      })
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        this.$router.go(this.$router.currentRoute)
      }
    },
    loadUserList () {
      // localStorage.clear()
      let tmpUser = localStorage.getItem('mentors')
      console.log('localstorage Mentors - ' + tmpUser)
      if (tmpUser) {
        let localUser = JSON.parse(tmpUser)
        for (let i = 0; i < localUser.length; i++) {
          if (localUser[i].email === '' || localUser[i].token === '') {
            localUser.splice(i, 1)
          }
        }
        this.updateLocalMentors(localUser)
        console.log('All Mentors - ' + localUser)
      } else {
        this.updateLocalMentors([])
      }

      tmpUser = localStorage.getItem('students')
      console.log('localstorage students - ' + tmpUser)
      if (tmpUser) {
        let localUser = JSON.parse(tmpUser)
        for (let i = 0; i < localUser.length; i++) {
          if (localUser[i].name === '' || localUser[i].password === '') {
            localUser.splice(i, 1)
          }
        }
        this.updateLocalStudents(localUser)
        console.log('All students - ' + localUser)
      } else {
        this.updateLocalStudents([])
      }
      console.log('sessionStorage currentStudent - ' + JSON.stringify(this.currentStudent))

      let usedSpace = unescape(encodeURIComponent(JSON.stringify(localStorage))).length
      // let remSpace = window.localStorage.remainingSpace // For IE
      console.log('LocalStorage Used Bytes: ', usedSpace)
    },
    sendMessage () {
      console.log('send message to supportor')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
