<template>


  <div>
    <q-page>


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


      <q-card v-for="note in notes" v-bind:key="note" class="card flex">

        <q-item-section>

          <!--           <q-item>
            Category : {{ note.category }}
          </q-item> -->

          <q-item>
            Priority : {{ note.priority }}
          </q-item>
          <q-item>
            {{ note.title }}
          </q-item>

          <q-item style="word-break:break-all;">
            {{ note.content }}
          </q-item>

        </q-item-section>

        <div class="btn-container">
          <q-btn v-model="note.title" class="btn update" color="primary" glossy>
            <q-icon name="check" />
          </q-btn>
          <q-btn v-on:click="deleteNote(note.id);" class="btn delete" color="deep-orange" glossy>
            <q-icon name="delete" />
          </q-btn>
        </div>
      </q-card>
    </q-page>
  </div>



</template>


<style lang="sass" scoped>


.card
    height: 192px

.btn-container
    width: 80px
    margin-top: 32px

.delete, .update
    width: 48px
    height: 48px !important

ul
    list-style: none

.btn
  padding: 1px
  margin: 2px
  height: 24px


.datepicker-container
    display: flex
    margin: 0 20px 0 20px
.q-form
    background: white
    padding: 18px
    z-index: 9999


</style>


<script>

import { defineComponent } from 'vue'
import axios from 'axios'


export default defineComponent({
  name: "NoteList",
  mounted() {
    axios.get("http://localhost:8080/api/notes")
      .then((response) => (this.notes = response.data["hydra:member"]))
      .then(response => console.log(response));
  },
  data() {
    return {
      notes: [],
      note: "",
      title: "",
      content: "",
      begining: "",
      end: "",
      priority: "",
      isclicked: false
    };
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
    },


    deleteNote(id) {
      axios
        .delete("http://localhost:8080/api/notes/" + id)
        .then(() => {
          const idx = this.notes.findIndex(g => g.id === id);
          this.notes.splice(idx, 1);
        });
    },
    updateNote(id) {
      axios
        .put("http://localhost:8080/api/notes/" + id, {
          title: this.title
        })
        .then(response => response)
        .then(response => {
          const idx = this.notes.findIndex(g => g.id === id);
          this.notes[idx] = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

  }
})



</script>
