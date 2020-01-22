<template>
  <div class="row q-ma-md">
    <q-card
      align="left"
      style="width: 20%; height: 300px; max-width: 300px"
    >
      <q-card-section class="primary">
        <div
          class="text-h7 text-red"
          align="left"
        >
          See what our customers said:
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="text-blue">
        100% Said: "Very Useful"
      </q-card-section>
      <q-card-section class="text-blue">
        98% Said: "Saved Time"
      </q-card-section>
    </q-card>
    <q-card
      class="bg-gray text-black q-ml-md"
      align="center"
      style="width: 50%; height: 300px; max-width: 600px"
    >
      <q-card-section>
        <q-carousel
          ref="carousel"
          v-model="slide"
          swipeable
          animated
          autoplay
          infinite
          height="250px"
        >
          <q-carousel-slide
            name="1"
          >
            This is the first Comment
          </q-carousel-slide>
          <q-carousel-slide
            :name="2"
          >
            This is the second Comment
          </q-carousel-slide>
          <q-carousel-slide
            :name="3"
          >
            This is the third Comment
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-card>
    <q-card
      class="bg-gray text-black q-ml-md"
      align="center"
      style="width: 30%; height: 300px; max-width: 400px"
    >
      <q-card-section>
        <q-editor
          v-model="editor"
          toolbar-text-color="white"
          toolbar-toggle-color="yellow-8"
          toolbar-bg="primary"
          :toolbar="[
            ['bold', 'italic', 'underline']
          ]"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          no-caps
          label="Add Comment"
          color="primary"
          @click="addComment()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script type="text/javascript">
import { ADD_COMMENT_MUTATION } from '../../graphql/mutations'
// import { READ_COMMENT_QUERY } from '../../graphql/queries'

export default {
  name: 'Comment',

  data () {
    return {
      slide: 1,
      editor: ''
    }
  },
  created () {
  },
  destroyed () {
  },
  methods: {
    addComment () {
      console.log('sending comment - ', this.editor.length)
      // send message
      this.$apollo
        .mutate({
          mutation: ADD_COMMENT_MUTATION,
          variables: {
            id: 0,
            text: this.editor
          }
        })
        .then(response => {
          if (response.data.addComment.ok) {
            this.editor = ''
          } else {
            this.alertMsg = 'Add message failed'
            this.alert = true
          }
        })
        .catch(error => {
          this.alertMsg = 'Please contact your admistrator.'
          this.alert = true
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
