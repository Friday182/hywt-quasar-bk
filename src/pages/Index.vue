<template>
  <q-page class="flex-center">
    <q-card
      class="absolute-center"
      style="width: 450px; max-width: 80vw;"
    >
      <q-card-actions align="right">
        <div class="row">
          <q-space />
          <q-btn
            flat
            dense
            icon="cancel"
            color="primary"
            @click="signinClose()"
          />
        </div>
      </q-card-actions>
      <q-card-section align="center">
        <q-btn
          flat
          no-caps
          dense
          size="lg"
          style="color: green;"
          label="用户登录"
        />
      </q-card-section>

      <q-card-section class="q-px-xl q-mx-xl q-mt-sm">
        <q-input
          ref="nameInput"
          v-model="loginName"
          rounded
          outlined
          autofocus
          color="green"
          label="用户名:"
          @keyup.enter.native="addByEnter(0)"
        >
          <template v-slot:append>
            <q-icon
              name="face"
              color="orange"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-px-xl q-mx-xl q-mb-md">
        <q-input
          ref="pwInput"
          v-model="password"
          rounded
          outlined
          color="green"
          label="密码:"
          :type="isPwd ? 'password' : 'text'"
          hint="* 测试用户名：test， 密码：test"
          @keyup.enter.native="addByEnter(1)"
        >
          <template v-slot:append>
            <q-icon
              color="blue"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions
        align="center"
        class="bg-white text-teal"
      >
        <q-btn
          label="登录"
          @click="toLogin"
        />
      </q-card-actions>
      <q-card-actions
        class="bg-white text-teal"
        align="center"
      >
        <q-checkbox
          v-model="rememberUser"
          keep-color
          left-label
          color="blue"
          label="是否记录用户登录状态？"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { login } from '../api/api'
import { mapActions } from 'vuex'

export default {
  components: {
    // 'alert-msg': require('components/common/AlertMsg.vue').default,
    // 'signin-list': require('components/common/SigninList.vue').default
  },
  data () {
    return {
      loginName: 'test',
      password: 'test',
      isPwd: true,
      windowHeight: '',
      listName: 'student',
      alert: false,
      alertMsg: '',
      rememberUser: true,
      skipQueryStudent: true,
      token: '',
      loginForm: {
        username: 'test',
        password: 'test'
      }
    }
  },
  created () {
    this.windowHeight = window.innerHeight + 'px'
  },
  methods: {
    ...mapActions('currentUser', ['updateUser']),
    toLogin () {
      this.updateUser({
        id: 1,
        name: 'test',
        contacts: '',
        sessionLogin: 'test'
      })
      // this.$router.push({ path: '/Hywt' })
      this.$router.push({ path: '/Hywt' })
      login(this.loginForm)
        .then(res => {
          this.$router.push({ path: '/Hywt' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    signinClose () {
      this.loginName = ''
      this.password = ''
    },
    addByEnter (opt) {
      if (this.loginName !== '' && this.password !== '') {
        this.studentLogin()
      } else {
        if (this.loginName !== '') {
          this.$refs.pwInput.focus()
        } else {
          this.$refs.nameInput.focus()
        }
      }
    }
  }
}
</script>

<style>
</style>
