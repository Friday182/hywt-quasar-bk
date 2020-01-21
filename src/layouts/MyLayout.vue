<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar
        class="bg-white text-red"
      >
        <q-toolbar-title>
          <router-link to="/">
            <q-img
              v-if="!leftDrawerOpen"
              spinner-color="white"
              style="height: 45px; max-width: 62px"
              src="statics/logo.jpg"
            />
            <q-img
              v-else
              spinner-color="white"
              style="height: 100px; max-width: 135px"
              src="statics/logo.jpg"
            />
          </router-link>
        </q-toolbar-title>
        <q-chip
          v-if="leftDrawerOpen"
          color="white"
          text-color="red"
          style="font: italic bold 250% Cursive;"
        >
          Be Better Everyday!
        </q-chip>
        <q-space />
        <div
          v-if="sessionLogin=='mentor'"
          class="q-mx-sm"
        >
          <q-btn
            flat
            no-caps
            @click="toMentorHome"
          >
            <q-icon name="home" />
            Mentor Home
          </q-btn>
          <q-btn
            flat
            no-caps
            @click="signout()"
          >
            <q-icon name="exit_to_app" />
          </q-btn>
        </div>
        <div v-else-if="sessionLogin=='student'">
          <q-btn
            flat
            no-caps
            @click="toStudentHome"
          >
            <q-icon name="home" />
            Student Home
          </q-btn>
          <q-btn
            flat
            no-caps
            @click="signout()"
          >
            <q-icon name="exit_to_app" />
          </q-btn>
        </div>
        <div v-else>
          <q-btn
            class="glossy"
            rounded
            dense
            color="deep-orange"
            @click="toStudentHome()"
          >
            <q-icon name="face" />
            Student Home
          </q-btn>
          <q-btn
            flat
            @click="toSigninup()"
          >
            Signin / Signup
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      :mini="miniState"
      bordered
      content-class="bg-blue-1"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list>
        <q-item-label header>
          Information Centre
        </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          clickable
          exact
          :to="nav.to"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ nav.label }}
            </q-item-label>
            <q-item-label caption>
              {{ nav.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      elevated
      class="bg-blue text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          Copyright @DeCom Technology Ltd. 2019
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
      leftDrawerOpen: false, // this.$q.platform.is.desktop,
      showStudentHome: false,
      miniState: true,
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
    mainToolbar: function () {
      if (this.sessionLogin === 'mentor' || this.sessionLogin === 'student') {
        return this.leftDrawerOpen
      } else {
        return true
      }
    },
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
      if (this.$route.path === '/MentorHome') {
        this.leftDrawerOpen = false
      } else if (this.$route.path === '/StudentHome') {
        this.showStudentHome = true
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
