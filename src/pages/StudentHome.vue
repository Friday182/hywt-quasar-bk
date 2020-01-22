<template>
  <q-page class="flex-center q-pa-md">
    <div class="column">
      <q-tabs
        v-model="tab"
        no-caps
        dense
      >
        <q-btn
          flat
          no-caps
          size="xl"
          color="grey-1"
          text-color="orange"
          class="text-weight-bolder"
        >
          Welcom {{ currentStudent.name }}!
        </q-btn>
        <q-space />
        <q-tab
          name="assignment"
          icon="assignment"
          label="assignment"
          class="text-blue"
        />
        <q-tab
          name="logs"
          icon="list"
          label="Task Logs"
          class="text-blue"
        />
        <q-tab
          name="stickerTable"
          icon="insert_photo"
          label="Stickers"
          class="text-blue"
        >
          <q-badge
            color="red"
            floating
          >
            {{ currentStudent.stickers }}
          </q-badge>
        </q-tab>
        <q-tab
          name="message"
          icon="chat"
          label="Messages"
          class="text-blue"
        >
          <q-badge
            v-if="numNewMsg > 0"
            color="red"
            floating
          >
            {{ numNewMsg }}
          </q-badge>
        </q-tab>
        <q-tab
          name="overview"
          icon="history"
          label="Overview"
          class="text-blue"
          :disable="!student.membershipActive"
        >
          <q-badge
            v-if="student.membershipActive"
            color="red"
            floating
          >
            New
          </q-badge>
          <q-badge
            v-else
            color="red"
            floating
          >
            Premium
          </q-badge>
        </q-tab>
        <q-space />
        <q-chip
          class="glossy"
          color="orange"
          text-color="white"
          icon-right="thumb_up"
        >
          {{ currentStudent.stickers }}
        </q-chip>
        <q-chip
          class="glossy"
          color="orange"
          text-color="white"
          icon-right="star"
        >
          {{ currentStudent.stars }}
        </q-chip>
        <q-chip
          class="glossy"
          color="orange"
          text-color="white"
          icon-right="face"
        >
          {{ numCoin }}
        </q-chip>
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="assignment">
          <div class="col col-md-10 q-pa-xl">
            <assignment />
          </div>
        </q-tab-panel>
        <q-tab-panel name="logs">
          <task-log
            :student-id="Number(currentStudent.id)"
            :num-log="numLog"
            :new-log="newLog"
          />
        </q-tab-panel>

        <q-tab-panel name="stickerTable">
          <sticker-table />
        </q-tab-panel>
        <q-tab-panel name="message">
          <messages />
        </q-tab-panel>
        <q-tab-panel name="overview">
          <overview />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

export default {
  name: 'StudentHome',
  components: {
    'messages': require('components/common/Message.vue').default,
    'assignment': require('components/student/Assignment.vue').default,
    'sticker-table': require('components/student/StickerTable.vue').default,
    'overview': require('components/student/Overview.vue').default,
    'task-log': require('components/common/TasklogTable.vue').default
  },
  data () {
    return {
      tab: 'assignment',
      numCoin: '0',
      numNewMsg: 0,
      numLog: 10,
      newLog: true
    }
  },
  computed: {
    ...mapGetters('student', ['currentStudent']),
    ...mapGetters('currentUser', ['currentUser']),
    student: function () {
      return this.currentStudent
    },
    stickers: function () {
      return this.currentStudent.stickers
    }
  },
  watch: {
    stickers: function (newVal, oldVal) {
      console.log('Stickers changed ', oldVal, newVal)
      this.tab = 'stickerTable'
    }
  },
  created () {
    if (this.student.id === 0) {
      // not login yet, go to main page
      this.$router.push('/')
    }
  },
  beforeMount () {
    console.log('student home before mount - ', this.currentUser.sessionLogin)
    if (this.currentUser.sessionLogin !== 'student') {
      this.$router.push('/')
    }
  },
  mounted () {
    console.log('StudentHome mounted. read from vuex id : name - ' + this.student.id + ': ' + this.student.name)
    this.numCoin = this.student.stars * 10 + this.student.stickers
  },
  methods: {
  }
}
</script>

<style>
</style>
