<template>
  <q-page class="flex-center">
    <div>
      <q-card>
        <q-card-section
          align="center"
          style="color:blue"
        >
          You only need Membership when you want to use
          <q-btn
            outline
            no-caps
            text-color="orange-10"
            label="AI Assistant"
          >
            <q-tooltip
              content-class="bg-white text-primary"
            >
              AI Assistant will manage everything for you.
            </q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section align="center">
          <q-toggle
            v-model="isShowPlan"
            color="orange"
            label="Show Plan"
          />
        </q-card-section>
      </q-card>
    </div>
    <div
      v-if="isShowPlan"
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
            @click="toBuyMembership(1)"
          >
            Subscription Monthly
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            (Free for now)
          </div>
          <div class="text-subtitle2">
            plan 1
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
            @click="toBuyMembership(2)"
          >
            Buy One Year
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-orange text-white">
          <div class="text-h6">
            (Free for now)
          </div>
          <div class="text-subtitle2">
            Plan 2
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
            @click="toBuyMembership(3)"
          >
            Buy Five Years
          </q-btn>
        </q-card-actions>
        <q-card-section class="bg-teal text-white">
          <div class="text-h6">
            (Free for now)
          </div>
          <div class="text-subtitle2">
            Plan 3
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Membership',
  data () {
    return {
      isShowPlan: false
    }
  },
  methods: {
    toBuyMembership (plan) {
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
