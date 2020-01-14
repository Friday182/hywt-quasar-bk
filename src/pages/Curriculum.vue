<template>
  <q-page class="flex-center q-mx-lg q-my-xl">
    <q-splitter
      v-model="splitterModel"
      style="height: 100%"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab
            name="ni"
            icon="list"
            label="Northern Ireland"
          />
          <q-tab
            name="england"
            icon="list"
            label="England"
          />
          <q-tab
            name="scotland"
            icon="list"
            label="Scotland"
          />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="ni">
            <q-card>
              <q-card-section
                class="text-blue text-h5"
                align="center"
              >
                Northern Ireland Curriculum (SK1 & SK2)
              </q-card-section>
              <q-card-section class="text-red">
                SK1 (P3 - P4)
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                SK2 (P5 - P7)
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="england">
            <q-card>
              <q-card-section
                class="text-blue text-h5"
                align="center"
              >
                England Curriculum (SK1 & SK2)
              </q-card-section>
              <q-card-section class="text-red">
                SK1 (Y1 - Y3)
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                SK2 (Y4 - Y6)
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="scotland">
            <q-card>
              <q-card-section
                class="text-blue text-h5"
                align="center"
              >
                Scotland Curriculum (SK1 & SK2)
              </q-card-section>
              <q-card-section class="text-red">
                SK1
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                SK2
              </q-card-section>
              <q-card-section class="text-blue">
                Will come soon ...
              </q-card-section>
              <q-separator />
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      splitterModel: 15,
      tab: 'ni'
    }
  }
}
</script>

<style>
</style>
