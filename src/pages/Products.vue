<template>
  <q-page class="flex-center">
    <div>
      <q-card>
        <q-card-section
          align="center"
          style="color:blue"
        >
          The products we provided are:
        </q-card-section>
      </q-card>
    </div>
    <div
      class="q-pa-md row q-gutter-md justify-center"
    >
      <q-card class="my-card row-md-4">
        <q-card-actions align="center">
          <q-btn
            dense
            glossy
            icon="done"
            no-caps
            text-color="orange-10"
          >
            Free to use
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-primary text-white">
          <div class="text-subtitle2">
            Access all 365 topics
            Review the results
            Set assianment manually
          </div>
        </q-card-section>

        <q-separator />
      </q-card>

      <q-card class="my-card">
        <q-card-actions align="center">
          <q-btn
            dense
            glossy
            icon="done"
            no-caps
            text-color="orange-10"
            @click="toBuyProduct(2)"
          >
            Using AI Assistant
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-orange text-white">
          <div class="text-h6">
            (Free for now)
          </div>
          <div class="text-subtitle2">
            Includes all Free funcitons
            Plus:
            AI Assistant:
            Analysis Results at runtime
            Detail report to show the progress
            Set assignment automatically based on performance
            Intelligent revise strategy
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-actions align="center">
          <q-btn
            dense
            glossy
            icon="done"
            no-caps
            text-color="orange-10"
            @click="toBuyProduct(3)"
          >
            Transfer Test Sprint
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-teal text-white">
          <div class="text-h6">
            (Free for now)
          </div>
          <div class="text-subtitle2">
            Mock test every week
            AI analysis stength and weakness
            AI design the specific tasks aimming weakness
            Detialed report to show everything you need to know
            Design sprint plan specific for each student
            Show and award any progress
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      isShowPlan: false
    }
  },
  methods: {
    toBuyProduct (plan) {
      alert('Buy plan - ' + plan)
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
</style>
