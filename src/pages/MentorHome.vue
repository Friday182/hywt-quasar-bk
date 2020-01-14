<template>
  <q-page class="flex-center">
    <div>
      <q-splitter
        v-model="splitterModel"
        style="height: 100%"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <q-tree
              :nodes="studentTree"
              node-key="label"
              selected-color="primary"
              :selected.sync="selected"
              default-expand-all
            />
          </div>
        </template>
        <template v-slot:after>
          <q-tab-panels
            v-model="selected"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="All Students">
              <div class="row q-mb-md q-ml-sm">
                <q-btn
                  no-caps
                  text-color="green"
                  label="Messages"
                  @click="msgActive=true"
                />
              </div>
              <students-table
                :loading="loadingTable"
                @refreshRequired="refreshStudents"
              />
            </q-tab-panel>

            <q-tab-panel
              v-for="(item, key) in studentTree[0].children"
              :key="key"
              :name="item.label"
            >
              <students-panel
                :student-id="item.id"
              />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ALL_STUDENTS_QUERY, GET_MENTOR_QUERY } from '../graphql/queries'

export default {
  name: 'MentorHome',
  components: {
    'students-table': require('components/mentor/StudentTable.vue').default,
    'students-panel': require('components/mentor/StudentPanel.vue').default
  },
  data () {
    return {
      skipQueryAllStudents: true,
      skipQueryMentor: true,
      loadingTable: true,
      studentName: '',
      age: 0,
      splitterModel: 15,
      selected: 'All Students',
      studentTree: [
        {
          id: 'root',
          lazy: false,
          label: 'All Students',
          children: [
            {
              lazy: false,
              label: 'No Student',
              id: 0,
              icon: 'face'
            }
          ]
        }
      ],
      allStudents: {
        id: 0,
        name: '',
        password: '',
        levels: '',
        membershipActive: false,
        assignment: '',
        expireDate: '',
        aiEnabled: false
      }
    }
  },
  computed: {
    ...mapGetters('currentUser', ['currentUser']),
    ...mapGetters('mentor', ['currentMentor']),
    updateTree: function () {
      return this.studentTree
    },
    mentorEmail: function () {
      // console.log('current email - ', this.currentUser.mentorEmail)
      return this.currentUser.mentorEmail
    }
  },
  beforeMount () {
    console.log('mentor home before mount - ', this.currentUser.sessionLogin)
    if (this.currentUser.sessionLogin !== 'mentor') {
      this.$router.push('/')
    } else {
      this.refreshStudents()
    }
  },
  methods: {
    ...mapMutations('mentor', ['setMentor', 'mentorAddStudent']),
    ...mapMutations('currentUser', ['updateUser']),
    updateAllStudents () {
      this.loadingTable = false
      this.setMentor({
        mentorEmail: this.mentorEmail,
        contacts: [],
        students: []
      })
      if (this.allStudents.length > 0) {
        console.log('Get all allStudents - ' + this.allStudents.length)
        this.studentTree[0].children = []
        for (let i = 0; i < this.allStudents.length; i++) {
          let aString = ''
          for (let idx = 0; idx < this.allStudents[i].assignment.length; idx++) {
            aString = aString + this.allStudents[i].assignment[idx]['k_task'] + ', '
          }
          aString = aString.slice(0, -1)
          console.log('membership get - ', this.allStudents[i].gId, this.allStudents[i].membershipActive, this.allStudents[i].expireDate)
          this.mentorAddStudent({
            id: Number(this.allStudents[i].gId),
            name: this.allStudents[i].name,
            password: this.allStudents[i].password,
            level: this.allStudents[i].levels.k_math,
            membershipActive: this.allStudents[i].membershipActive,
            assignment: aString,
            expireDate: this.allStudents[i].expireDate,
            aiEnabled: this.allStudents[i].aiEnabled
          })

          // update Tree view
          this.studentTree[0].children.push({
            lazy: false,
            label: this.allStudents[i].name,
            id: Number(this.allStudents[i].gId),
            icon: 'face'
          })
        }
      } else {
        console.log('student not updated yet', JSON.stringify(this.currentMentor.students))
      }
    },
    refreshStudents () {
      this.skipQueryAllStudents = false
      this.$apollo.queries.allStudents.refetch({
        mentorEmail: this.mentorEmail
      })
      this.skipQueryMentor = false
      this.$apollo.queries.mentor.refetch({
        mentorEmail: this.mentorEmail
      })
    }
  },
  apollo: {
    allStudents: {
      query: ALL_STUDENTS_QUERY,
      variables () {
        return {
          mentorEmail: this.mentorEmail
        }
      },
      error (error) {
        console.error('We\'ve got an error!', error)
      },
      skip () {
        return this.skipQueryAllStudents
      },
      result (data, key) {
        if (data.data.allStudents) {
          this.updateAllStudents()
        } else {
          console.log('all students get Null')
          this.$router.go('/')
        }
      }
    },
    mentor: {
      query: GET_MENTOR_QUERY,
      variables () {
        return {
          mentorEmail: this.mentorEmail
        }
      },
      error (error) {
        console.error('We\'ve got an error!', error)
      },
      skip () {
        return this.skipQueryMentor
      },
      result (data, key) {
        this.skipQueryMentor = true
        if (data.data.mentor) {
          this.setMentor({
            id: data.data.mentor.gId,
            name: data.data.mentor.name,
            contacts: data.data.mentor.contacts
          })
          this.updateUser({
            id: data.data.mentor.gId,
            name: data.data.mentor.name,
            contacts: data.data.mentor.contacts,
            sessionLogin: 'mentor'
          })
        } else {
          console.log('Get mentor failed')
          this.$router.go('/')
        }
      }
    }
  }
}
</script>

<style>
</style>
