<template>
  <q-form>
    <q-dialog
      v-model="membershipActive"
      style="width: 100%"
      persistent
    >
      <q-card style="width: 80%">
        <q-card-section align="center">
          <div class="row">
            <q-space />
            <q-btn
              align="right"
              dense
              flat
              round
              icon="close"
              color="red"
              @click="membershipClose"
            >
              <q-tooltip
                content-class="bg-white text-primary"
              >
                Close
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn
            style="color: green;"
            no-caps
          >
            Membership for : <strong> {{ studentName }} </strong>
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <q-list link>
            <q-item
              v-ripple
              tag="label"
            >
              <q-item-section avatar>
                <q-radio
                  v-model="plan"
                  val="1"
                  color="orange-10"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label style="color: orange">
                  Plan 1: Subscription Monthly by 00
                </q-item-label>
                <q-item-label caption>
                  Cancel at anytime you want
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              tag="label"
            >
              <q-item-section avatar>
                <q-radio
                  v-model="plan"
                  val="2"
                  color="orange-10"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label style="color: orange">
                  Plan 2: One year membership for 00
                </q-item-label>
                <q-item-label caption>
                  Most popular choice
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              tag="label"
            >
              <q-item-section avatar>
                <q-radio
                  v-model="plan"
                  val="3"
                  color="orange-10"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label style="color: orange">
                  Plan 3: Five year membership for 00
                </q-item-label>
                <q-item-label caption>
                  This covers all the KS1 and KS2 years.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator class="q-ma-sm" />
        </q-card-section>
        <q-card-section
          v-if="usePromotion"
          class="q-pt-lg"
        >
          <div class="row q-gutter-sm">
            <q-input
              v-model="promotion"
              rounded
              outlined
              type="text"
              color="green"
              label="Promotion Code:"
            >
              <template v-slot:append>
                <q-icon
                  name="receipt"
                  color="orange"
                />
              </template>
            </q-input>
            <q-btn
              no-caps
              rounded
              label="Apply Code"
              color="light-blue"
              @click="applyCode"
            />
          </div>
          <q-separator class="q-mx-sm q-my-lg" />
        </q-card-section>
        <q-card-section class="q-pt-lg q-mb-xl">
          <strong>
            Total: £00.00
          </strong>
          <q-btn
            class="q-ml-xl"
            no-caps
            rounded
            color="light-blue"
            label="Payment"
            @click="toPayment"
          />
        </q-card-section>
        <q-card-section
          v-if="isPayment"
          class="q-pt-lg q-mb-xl"
        >
          <q-btn
            class="q-ml-xl"
            no-caps
            rounded
            color="light-blue"
            label="Submit"
            @click="toProcessPayment"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-form>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

export default {
  name: 'MembershipUpdate',

  props: {
    studentId: {
      type: Number,
      default: 0
    },
    membershipActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPayment: false,
      plan: '',
      usePromotion: true,
      promotion: ''
    }
  },
  computed: {
    ...mapGetters('mentor', ['currentMentor']),
    studentName: function () {
      for (let i = 0; i < this.currentMentor.students.length; i++) {
        if (this.studentId === this.currentMentor.students[i].id) {
          return this.currentMentor.students[i].name
        }
      }
      return 'Invalid Name'
    }
  },
  methods: {
    membershipClose () {
      this.$emit('memebershipClose')
    },
    applyCode () {
      console.log(this.promotion)
    },
    toPayment () {
      console.log('To payment page')
      this.isPayment = true
    },
    toProcessPayment () {
      console.log('Process payment ... ...')
    }
  }
}
</script>

<style>
</style>
