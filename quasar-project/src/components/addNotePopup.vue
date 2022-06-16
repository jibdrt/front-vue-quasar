
<template>
<div>
  <h1>Ok</h1>
</div>
</template>



<script>

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'addNotePopup',

  data() {

    return {
      notes: [],
      note: '',
      title: this.title,
      content: this.content,
      begining: this.begining,
      end: this.end,
      priority: this.priority,
      isclicked: false

    }
  },

  methods: {


    
  }
})


</script>



<style lang="sass" scoped>

.datepicker-container
    display: flex
    margin: 0 20px 0 20px
.q-form
    background: white
    padding: 18px
    z-index: 9999

</style>