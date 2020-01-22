<template>
  <q-dialog
    v-model="active"
    :maximized="true"
  >
    <div class="q-pa-md">
      <q-tabs
        v-model="tab"
        class="bg-grey-3 shadow-2"
        no-caps
      >
        <q-tab
          name="pokemon"
          icon="face"
          label="pokemon"
        />
        <q-tab
          name="fruit"
          icon="mail"
          label="fruit"
        />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="pokemon">
          <div class="row flex">
            <div
              v-for="(item, key) in pokemonData"
              :key="key"
              class="q-gutter-xl"
            >
              <q-btn
                class="q-ma-xl"
                size="50px"
                :icon="item.path"
                @click="choose(key)"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="fruit">
          <div class="row flex">
            <div
              v-for="item in fruitData"
              :key="item.id"
              class="q-gutter-xl"
            >
              <q-img
                :src="item.path"
                style="height: 80px; width: 80px"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <q-card class="q-mt-lg">
        <q-separator />
        <q-card-section>
          Please Selecte
          <q-btn
            outline
            round
            text-color="green"
            style="font-size: 12pt"
          >
            {{ selectNum }}
          </q-btn>
          Stickers:
        </q-card-section>
        <q-card-section>
          <q-btn
            v-for="n in 10"
            :key="n"
            class="q-mx-xs"
            flat
            size="40px"
            :icon="picked[n-1]"
            @click="removePic(n-1)"
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            push
            label="Ok"
            text-color="white"
            color="blue"
            style="font-size: 12pt"
            @click="selectDone"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script type="text/javascript">

export default {
  name: 'Stickers',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    selectNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tab: 'pokemon',
      pokemonData: [],
      fruitData: [],
      picked: [],
      selection: []
    }
  },
  watch: {
    selectNum: function (newVal, oldVal) {
      console.log('select num changed?')
      this.selection = []
      this.picked = []
    }
  },
  created () {
    for (let i = 1; i < 26; i++) {
      this.pokemonData.push({
        id: i,
        path: 'img:statics/stickers/pokemon/pm (' + i + ').jpg',
        name: 'pokemon/pm (' + i + ').jpg'
      })
    }
    for (let i = 1; i < 12; i++) {
      this.fruitData.push({
        id: i,
        path: 'statics/stickers/fruit/fruit (' + i + ').jpg',
        name: 'fruit/fruit (' + i + ').jpg'
      })
    }
  },
  methods: {
    choose (idx) {
      console.log('picked - ', idx)
      if (this.selection.length < 10 && this.selection.length < this.selectNum) {
        this.selection.push(this.pokemonData[idx].name)
        this.picked.push(this.pokemonData[idx].path)
      } else {
        // Alert maximum shoose 10 each time
      }
      console.log(this.picked)
    },
    selectDone () {
      console.log('updated ' + this.selection.length, this.selectNum)
      if (this.selection.length <= this.selectNum) {
        this.$emit('selectSticker', this.selection)
      }
    },
    removePic (idx) {
      console.log('remove pic idx - ', idx)
      this.picked.splice(idx, 1)
      this.selection.splice(idx, 1)
    }
  }
}
</script>

<style>
</style>
