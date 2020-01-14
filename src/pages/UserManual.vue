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
            name="mentor"
            icon="people"
            label="Mentor"
          />
          <q-tab
            name="student"
            icon="face"
            label="Student"
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
          <q-tab-panel name="mentor">
            <q-card>
              <q-card-section
                class="text-blue text-h5"
                align="center"
              >
                Mentor User Manual
              </q-card-section>
              <q-card-section class="text-red">
                Step 1: Register
              </q-card-section>
              <q-card-section class="text-blue">
                You have to register with your valid email. Once you verify your email, you will be entitled ONE MONTH free membership for all your student.
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                Step 2: Add Student
              </q-card-section>
              <q-card-section class="text-blue">
                You maximum could have 3 non-member students. There is no limited to the number of paid students
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                Step 3: Management
              </q-card-section>
              <q-card-section class="text-blue">
                Add/Remove student; Add/Remeove/Change assignments; Update membership.
              </q-card-section>
              <q-separator />
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="student">
            <q-card>
              <q-card-section
                class="text-blue text-h5"
                align="center"
              >
                Student User Manual
              </q-card-section>
              <q-card-section class="text-red">
                Step 1: Login
              </q-card-section>
              <q-card-section class="text-blue">
                You could only get your user name and password from your mentor.
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                Step 2: Complete Assignment
              </q-card-section>
              <q-card-section class="text-blue">
                Complete all the assignment that your mentor assigned to you. You will get a sticker if you complete all the assignment with excellent score.
              </q-card-section>
              <q-separator />
              <q-card-section class="text-red">
                Step 3: Sticker and Star
              </q-card-section>
              <q-card-section class="text-blue">
                Get sticker when all the assignment correct rate above 90%; You got a star for every 30 stickers.
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
      tab: 'mentor'
    }
  }
}
</script>

<style>
</style>
