<template>
  <div class="q-px-sm">
    <q-card>
      <q-page-sticky
        position="right"
        :offset="[100, 100]"
      >
        <q-btn
          rounded
          no-caps
          glossy
          color="blue"
          label="Submit"
          size="lg"
          @click="changeDone(0)"
        />
      </q-page-sticky>
      <q-card-section
        align="left"
        style="width:30%"
      >
        <q-input
          v-model="name"
          bottom-slots
          label="姓名"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
        </q-input>
        <q-input
          v-model="id"
          label="身份证号"
          dense
        />
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        />
      </q-card-section>
      <q-card-section
        align="left"
        style="width:50%"
      >
        <pre>
          {{ jsonData }}
        </pre>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:50%"
      >
        <pre>
          {{ info }}
        </pre>
      </q-card-section>
    </q-card>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from 'vuex'

export default {
  name: 'StudentProfile',
  data () {
    return {
      alert: false,
      active: false,
      info: '',
      name: '',
      id: '',
      selDatetime: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            this.selDatetime = JSON.stringify(Date())
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            this.selDatetime = JSON.stringify(date)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            this.selDatetime = JSON.stringify(date)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: ''
    }
  },
  computed: {
    jsonData: function () {
      return (
        {
          name: this.name,
          gender: '男',
          ethnic: '汉',
          id: this.id,
          dob: '20010101',
          block: '高大上小区',
          enter: '进入',
          deviceid: 'device-123',
          datetime: this.selDatetime
        }
      )
    }
  },
  methods: {
    ...mapMutations('visitor', ['addVisitor']),
    ...mapMutations('currentInfo', ['setActiveTab']),
    changeDone (opt) {
      console.log('datetime = ', this.selDatetime)
      this.addVisitor(this.jsonData)
      this.setActiveTab('1-1')
      this.postData()
    },
    postData () {
      console.log('post data')
      this.$axios
        .post('http://127.0.0.1:8082/api/logout', { 'jsondata': JSON.stringify(this.jsonData) })
        .then(response => (this.info = response))
    }
  }
}
</script>

<style>
</style>
