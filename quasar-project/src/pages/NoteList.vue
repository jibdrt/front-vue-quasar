<template>

    <q-page>
  <div>

     <addNotePopup />


      <q-card v-for="note in notes" v-bind:key="note" class="card flex">

        <q-item-section>

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
</div>

    </q-page>

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


</style>


<script>

import { defineComponent } from 'vue'
import axios from 'axios'
import  addNotePopup from '../components/addNotePopup.vue'


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
            textclear: ""
        };
    },
    methods: {
      

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

    },
    components: { addNotePopup }
})



</script>
