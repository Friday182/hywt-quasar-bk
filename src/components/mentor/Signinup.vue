<template>
  <q-form>
    <q-dialog
      v-model="currentShowSignin"
      persistent
    >
      <q-card style="width: 450px; max-width: 80vw;">
        <q-card-actions align="right">
          <div class="row">
            <q-space />
            <q-btn
              flat
              dense
              icon="cancel"
              color="primary"
              @click="signinClose(false)"
            />
          </div>
        </q-card-actions>
        <q-card-section align="center">
          <q-btn-toggle
            v-model="signOpt"
            push
            dense
            glossy
            toggle-color="primary"
            :options="[
              {label: 'Signin', value: 'signin'},
              {label: 'Signup', value: 'signup'}
            ]"
          />
        </q-card-section>
        <q-card-section class="q-px-xl q-mx-xl q-mt-lg">
          <q-input
            ref="emailInput"
            v-model="email"
            rounded
            outlined
            dense
            autofocus
            type="email"
            color="green"
            label="E-Mail:"
            @keyup.enter.native="addByEnter(0)"
          >
            <template v-slot:append>
              <q-icon
                name="email"
                color="orange"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-px-xl q-mx-xl q-mb-md">
          <q-input
            ref="pwInput"
            v-model="password"
            q-ma-lg
            rounded
            outlined
            dense
            color="green"
            label="Password:"
            :type="isPwd ? 'password' : 'text'"
            hint="* At least 6 mixed letters and numbers"
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
          class="bg-white text-teal"
          align="center"
        >
          <q-btn
            label="OK"
            dense
            @click="submitSigninup()"
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
            dense
            color="blue"
            label="Remember you login details on this computer?"
          />
        </q-card-actions>
        <q-card-actions
          align="center"
          class="text-blue"
        >
          <signin-list
            :user-type="listName"
            @listSelected="toMentorLogin"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <alert-msg
      :active="alert"
      :msg="alertMsg"
      @cancelAlert="alertClose"
    />
  </q-form>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import { VERIFY_TOKEN_MUTATION, SIGNUP_MUTATION, GET_TOKEN_MUTATION } from '../../graphql/mutations'

export default {
  name: 'Signinup',
  components: {
    'alert-msg': require('components/common/AlertMsg.vue').default,
    'signin-list': require('components/common/SigninList.vue').default
  },
  props: {
    showsignin: {
      type: Boolean
    }
  },
  data () {
    return {
      listName: 'mentor',
      signOpt: 'signin',
      rememberUser: true,
      password: '',
      isPwd: true,
      email: '',
      token: '',
      alert: false,
      alertMsg: ''
    }
  },
  computed: {
    ...mapGetters('localMentors', ['localMentors']),
    currentShowSignin: function () {
      return this.showsignin
    },
    localMentorList: function () {
      if (this.localMentors) {
        return this.localMentors
      } else {
        return []
      }
    }
  },
  mounted () {
    console.log('signin up mounted')
  },
  methods: {
    ...mapActions('currentUser', ['updateUser']),
    ...mapActions('localMentors', ['removeLocalMentor', 'addLocalMentor', 'updateLocalMentorDate']),

    submitSigninup () {
      if (this.email !== '' && this.password !== '') {
        let newLogin = true
        for (let i = 0; i < this.localMentorList.length; i++) {
          if (this.localMentorList[i].email === this.email && this.localMentorList[i].token !== 'NA') {
            newLogin = false
            this.token = this.localMentorList[i].token
            this.verifyToken()
            break
          }
        }
        if (newLogin === true) {
          if (this.signOpt === 'signin') {
            console.log('do sign in for - ' + this.email + ' pw - ' + this.password)
            this.submitSignin()
          } else if (this.signOpt === 'signup') {
            console.log('do sign up for - ' + this.email + ' pw - ' + this.password)
            this.submitSignup()
          }
        }
      }
    },
    submitSignin () {
      this.$apollo
        .mutate({
          mutation: GET_TOKEN_MUTATION,
          variables: {
            username: this.email,
            password: this.password
          }
        })
        .then(response => {
          if (response.data.tokenAuth) {
            console.log('Get Token for mentor - ' + this.email)
            this.updateLocalMentor(response.data.tokenAuth.token)
          } else {
            this.alertMsg = response.errors.message
            this.alert = true
          }
        })
        .catch(error => {
          this.alertMsg = 'Invalid Name or Password.'
          this.alert = true
          console.log(error)
        })
    },
    submitSignup () {
      this.$apollo
        .mutate({
          mutation: SIGNUP_MUTATION,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          if (response.data.createUser.user) {
            console.log('Signup mentor email - ' + response.data.createUser.user.email)
            this.submitSignin()
          } else {
            this.alertMsg = response.errors.message
            this.alert = true
          }
        })
        .catch(error => {
          this.alertMsg = 'This email has been registered.'
          this.alert = true
          console.log(error)
        })
    },
    verifyToken () {
      sessionStorage.removeItem('token')
      this.$apollo
        .mutate({
          mutation: VERIFY_TOKEN_MUTATION,
          variables: {
            token: this.token
          }
        })
        .then(response => {
          if (response.data.verifyToken) {
            console.log('verified token for mentor email - ' + response.data.verifyToken.payload.username)
            this.updateLocalMentor(this.token)
          } else {
            this.alertMsg = response.errors.message
            this.alert = true
          }
        })
        .catch(error => {
          this.alertMsg = 'Invalid Name or Password.'
          this.alert = true
          console.log(error)
        })
    },
    toMentorLogin (key) {
      this.email = this.localMentorList[key].email
      this.token = this.localMentorList[key].token
      this.verifyToken()
    },
    updateLocalMentor (token) {
      let newMentor = true
      if (this.localMentorList) {
        for (let i = 0; i < this.localMentorList.length; i++) {
          if (this.localMentorList[i].email === this.email) {
            newMentor = false
            if (this.rememberUser === false) {
              this.removeLocalMentor(i)
            } else {
              if (this.localMentorList[i].token !== token) {
                // update token
                this.localMentorList[i].token = token
              }
              this.updateLocalMentorDate(i)
            }
          }
        }
      }
      if (newMentor === true && this.rememberUser === true) {
        this.addLocalMentor({
          gId: 0,
          email: this.email,
          token: token,
          letter: this.email[0],
          lastSigninDate: Date()
        })
      }

      // Save to local storage and set session storage for apollo
      if (this.localMentorList) {
        let mentors = JSON.stringify(this.localMentorList)
        localStorage.setItem('mentors', mentors)
      }
      // set token for apollo
      sessionStorage.setItem('token', token)
      this.updateUser({
        mentorEmail: this.email,
        sessionLogin: 'mentor'
      })

      this.signinClose(true)
    },
    addByEnter (opt) {
      if (this.email !== '' && this.password !== '') {
        this.submitSigninup()
      } else {
        if (this.email !== '') {
          this.$refs.pwInput.focus()
        } else {
          this.$refs.emailInput.focus()
        }
      }
    },
    alertClose () {
      this.alert = false
      this.alertMsg = ''
    },
    signinClose (opt) {
      this.email = ''
      this.password = ''
      this.$emit('signinClose', opt)
    }
  }
}
</script>

<style>
</style>
