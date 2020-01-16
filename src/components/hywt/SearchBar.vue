<template>
  <div>
    <div class="row">
      <div class="col-2 q-mr-sm">
        <el-select
          v-model="province"
          filterable
          size="mini"
          placeholder="所属省份"
        >
          <el-option
            v-for="item in provinceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="col-2 q-mr-sm">
        <el-select
          v-model="city"
          filterable
          size="mini"
          placeholder="选择城市"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <template v-slot:prefix>
            <q-icon name="place" />
          </template>
        </el-select>
      </div>
      <div class="col-2 q-mr-sm">
        <el-input
          v-model="inId"
          size="mini"
          placeholder="身份证号码"
          clearable
        />
      </div>
      <div class="col-2 q-mr-sm">
        <el-input
          v-model="inId"
          size="mini"
          placeholder="社区名称"
          clearable
        />
      </div>
    </div>
    <div class="row q-my-sm">
      <div class="col-4 q-mr-sm">
        <el-date-picker
          v-model="value2"
          size="mini"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <q-space />
      <div class="col-2">
        <q-btn
          label="查 询"
          outlined
          dense
          color="primary"
          style="font: 100% Cursive"
          @click="selected()"
        />
        <q-btn
          class="q-ml-sm"
          label="重 置"
          outlined
          dense
          color="primary"
          style="font: 100% Cursive"
          @click="selected()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      inId: '',
      city: '',
      province: '',
      provinceOptions: [
        { value: '选项1', label: '新疆' },
        { value: '选项2', label: '甘肃' },
        { value: '选项3', label: '陕西' },
        { value: '选项4', label: '四川' },
        { value: '选项5', label: '河南' }
      ],
      cityOptions: [
        { value: '选项1', label: '乌鲁木齐' },
        { value: '选项2', label: '石河子' },
        { value: '选项3', label: '伊犁' },
        { value: '选项4', label: '库尔勒' },
        { value: '选项5', label: '克拉玛依' }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
    }
  },
  methods: {
    select () {
      console.log('start search ...')
    }
  }
}
</script>

<style scoped>
.zip-input input {
  height: 20px
}
</style>
