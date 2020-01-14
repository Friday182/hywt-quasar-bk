<template>
  <div
    class="q-pa-md"
    style="width: 100%"
  >
    <q-toolbar
      v-if="useList"
      dense
      class="bg-white text-blue"
    >
      <q-toolbar-title>Sign in as:</q-toolbar-title>
    </q-toolbar>
    <q-separator
      spaced
      inset
    />

    <q-list>
      <q-item
        v-for="(item, key) in localUserList"
        :key="key"
        v-ripple
        dense
        class="q-my-sm"
        clickable
        @click="selected(key)"
      >
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
          >
            {{ item.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="userType=='mentor'">
            {{ item.email }}
          </q-item-label>
          <q-item-label v-else-if="userType=='student'">
            {{ item.name }}
          </q-item-label>
          <q-item-label v-else>
            Not Available
          </q-item-label>
          <q-item-label
            caption
            lines="1"
            style="size:xs"
          >
            Last time signin at: {{ item.lastSigninDate }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            round
            flat
            @click="deleteFromList(key)"
          >
            <q-icon
              name="cancel"
              color="red"
            />
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SigninList',
  props: {
    userType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapGetters('localMentors', ['localMentors']),
    ...mapGetters('localStudents', ['localStudents']),
    localUserList: function () {
      if (this.userType === 'mentor' && this.localMentors) {
        return this.localMentors
      } else if (this.userType === 'student' && this.localStudents) {
        return this.localStudents
      } else {
        return []
      }
    },
    useList: function () {
      if (this.localUserList.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.localUserList) {
      console.log('signin List mounted user - ' + this.userType)
      console.log('signin List mounted user - ' + this.localUserList.length)
    } else {
      console.log('Not local storage user found.')
    }
  },
  methods: {
    ...mapMutations('localMentors', ['removeMentor']),
    ...mapMutations('localStudents', ['removeStudent']),
    selected (key) {
      // Here use isDelete that's because when click Delete button, it trigger selected as well
      if (this.isDelete === false) {
        console.log('selected - ' + key)
        this.$emit('listSelected', key)
      } else {
        this.isDelete = false
      }
    },
    deleteFromList (key) {
      this.isDelete = true
      console.log('delete - ' + key)
      if (this.userType === 'mentor') {
        this.removeMentor(key)
      } else if (this.userType === 'student') {
        this.removeStudent(key)
      }
    }
  }
}
</script>

<style>
</style>
