<template>
  <q-card
    class="bg-gray text-black"
    align="center"
    style="width: 50%"
    flat
  >
    <q-card-section>
      <v-chart
        ref="chart"
        :options="chart"
        theme="macarons"
        autoresize
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        class="q-mt-md"
        style="width: 100%; font-size: 15pt"
        text-color="blue"
        no-caps
      >
        <vue-mathjax
          :formula="formula"
          :options="{}"
        />
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { VueMathjax } from 'vue-mathjax'
import ECharts from '../common/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataset'
import 'zrender/lib/svg/svg'

// built-in theme
import 'echarts/theme/macarons'

export default {
  name: 'QuestionMathChart',
  components: {
    'vue-mathjax': VueMathjax,
    'v-chart': ECharts
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      chartTest: {
        legend: {
        },
        tooltip: {},
        boundaryGap: ['20%', '20%'],
        dataset: {
          // Provide data.
          source: [
            ['Product', 'P4 Students Faviour Sport'],
            ['Footbal', 25],
            ['Hollkey', 30],
            ['Badmintan', 15],
            ['Swimming', 28]
          ]
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: {
          type: 'category',
          name: 'Sports',
          nameLocation: 'middle',
          nameGap: 40
        },
        // Declare Y axis, which is a value axis.
        yAxis: {
          name: 'Number of Pupils',
          nameLocation: 'middle',
          nameGap: 40
        },
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [
          {
            type: 'bar',
            barWidth: 40
          }
        ]
      },
      pieTest: {
        title: {
          text: 'Pie Example',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('questions', ['getQuestions']),
    formula: function () {
      return this.getQuestions[this.index].questionText
    },
    chart: function () {
      return this.getQuestions[this.index].chart[0]
    }
  },
  mounted () {
  },

  methods: {
  }
}
</script>

<style>
</style>
