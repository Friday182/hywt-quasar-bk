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
          @click="changeProfileDone(0)"
        />
      </q-page-sticky>
      <q-card-section
        align="left"
        style="width:30%"
      >
        <q-input
          v-model="name"
          bottom-slots
          label="Name"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:30%"
      >
        <q-input
          v-model="age"
          bottom-slots
          label="Age"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="face" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:30%"
      >
        <q-input
          v-model="city"
          bottom-slots
          label="City"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:30%"
      >
        <q-input
          v-model="country"
          bottom-slots
          label="Country"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:80%"
      >
        <q-input
          v-model="school"
          bottom-slots
          label="School"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              name="close"
              @click="school = ''"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section
        align="left"
        style="width:50%"
      >
        <q-input
          v-model="addedDate"
          bottom-slots
          label="Added Date"
          dense
          readonly
        />
      </q-card-section>
      <q-card-section
        align="left"
        style="width:50%"
      >
        <q-input
          v-model="membershipData"
          bottom-slots
          label="Membership Data"
          dense
          readonly
        />
      </q-card-section>
      <q-card-section
        align="left"
        style="width:50%"
      >
        <q-input
          v-model="expireDate"
          bottom-slots
          label="Expire Date"
          dense
          readonly
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'StudentProfile',
  data () {
    return {
      alert: false,
      active: false
    }
  },
  methods: {
    changeProfileDone (opt) {
      this.alert = false
      if (opt > 0) {
        this.$emit('changeProfile')
      }
    }
  }
}
</script>

<style>
</style>
