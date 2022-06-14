
<template>
  <div>
    <q-item>
      <q-btn @click="isclicked = !isclicked" color="green" rounded>
        <q-icon name="add" />
        <q-popup-proxy transition-show="scale" transition-hide="scale" v-show="isclicked">

          <q-form @reset="onReset" class="q-gutter-md q-pa-md addnote-form">



            <q-input filled v-model="title" label="title" />
            <q-input filled v-model="content" label="content" />

            <q-item>
              <q-input v-model.number="priority" filled label="priority" style="max-width: 200px" />
              <div class="datepicker-container">

                <q-btn label="Begining" color="primary">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="begining">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat v-close-popup />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>

                <q-item>
                  {{ $data.begining }}
                </q-item>


                <q-btn label="Deadline" color="primary">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="end">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat v-close-popup />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
                <q-item>
                  {{ $data.end }}
                </q-item>
              </div>
            </q-item>
            <div>
              <q-btn v-on:click="createNote(); onReset();" color="primary" label="Create">
              </q-btn>

              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>

          </q-form>
        </q-popup-proxy>
      </q-btn>
    </q-item>
  </div>
</template>



<script>

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'createNotePopupVue',

  data() {

    return {
      notes: [],
      note: '',
      title: this.title,
      content: this.content,
      begining: this.begining,
      end: this.end,
      priority: this.priority,
      textclear: '',
      isclicked: false

    }
  },

  methods: {


    createNote() {
      axios
        .post("http://localhost:8080/api/notes", {
          title: this.title,
          content: this.content,
          priority: this.priority,
          begining: this.begining,
          end: this.end
        })
        .then((response) => {
          this.notes.push(response.data);
          console.log('coucou');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReset() {
        this.title = "",
        this.content = "",
        this.priority = "";
        this.begining = "",
        this.end = "",
        this.priority = "";
    }
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