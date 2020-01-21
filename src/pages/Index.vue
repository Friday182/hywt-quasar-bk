<template>
  <q-page class="flex-center">
    <div class="q-pa-md">
      <q-carousel
        ref="carousel"
        v-model="slide"
        swipeable
        animated
        :autoplay="autoplay"
        infinite
        thumbnails
        height="600px"
      >
        <q-carousel-slide
          :name="1"
          :img-src=" 'statics/slide1.jpg' "
        />
        <q-carousel-slide
          :name="2"
          :img-src=" 'statics/slide2.jpg' "
        />
        <q-carousel-slide
          :name="3"
          :img-src=" 'statics/slide3.jpg' "
        />
        <q-carousel-slide
          :name="4"
        >
          <q-card>
            <q-card-section class="text-red">
              Q: What I could get with free account?
            </q-card-section>
            <q-card-section class="text-blue">
              A: You are able to access ALL the meterials in our system. It is about 300 tasks with 200k questions.
              And you could use the most functions of our system, such as assign the assigments to your students,
              check their task results, see performance, manage stickers etc.
            </q-card-section>
            <q-separator />
            <q-card-section class="text-red">
              Q: What is the memebership for?
            </q-card-section>
            <q-card-section class="text-blue">
              A: Membership allows AI assistant to manage all the daily work for you. It includes
              analyze of study at runtime to find out the strenth and weakness of your student; assigning assignments based on analyze result;
              automatically revise strategy; periodically test; generate monthly report to show you everything you need to know etc.
            </q-card-section>
            <q-separator />
            <q-card-section class="text-red">
              Q: Do I need memebership?
            </q-card-section>
            <q-card-section class="text-blue">
              A: Many of our customers are non-membership users and they are happy to work with our system.
              The memebership is only for those parents who have no much time to manage the student's daily work. The only purpose of AI assistant is
              to save the time, that's all.
              Remember that you will get 30 days trail membership once you verified your email address.
            </q-card-section>
            <q-separator />
            <q-card-section class="text-red">
              Q: Do I need to do anything if I got membership?
            </q-card-section>
            <q-card-section class="text-blue">
              A: The only thing is ask your students to finish their assignment everyday.
            </q-card-section>
            <q-separator />
            <q-card-section class="text-red">
              Q: At what age or grade the child could start to use your system?
            </q-card-section>
            <q-card-section class="text-blue">
              A: They can start at any time. AI assistant could assign the proper tasks for your children based on their abilities.
              Not by age or grade, this is the one of the core ideas of our system.
            </q-card-section>
          </q-card>
        </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            position="top-right"
            :offset="[18, 18]"
            class="text-white"
            style="background: rgba(0, 0, 0, .3); padding: 4px 8px 4px 0; border-radius: 4px"
          >
            <q-toggle
              v-model="autoplay"
              dense
              dark
              color="orange"
              label="Auto Play"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <div>
      <q-separator />
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    // 'comment': require('components/common/Comment.vue').default
  },
  data () {
    return {
      slide: 1,
      windowHeight: '',
      autoplay: true
    }
  },
  created () {
    this.windowHeight = window.innerHeight + 'px'
  }
}
</script>

<style>
</style>
