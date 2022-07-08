<template>
  <q-page>
    
    <q-btn
      @click="isclicked = !isclicked"
      class="q-ma-md q-pa-md"
      color="green"
      rounded
    >
      <q-icon name="add" />

      <q-popup-proxy v-show="isclicked">
        <q-form class="q-gutter-md q-pa-md addnote-form">
          
          <q-input filled v-model="title" label="title" />
          <q-input filled v-model="content" label="content" />

          <q-item>
            <q-input
              v-model.number="priority"
              filled
              label="priority"
              style="max-width: 200px"
            />
            <div class="datepicker-container">
              <q-btn label="Begining" color="primary">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="begining">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>

              <q-item>
                {{ $data.begining }}
              </q-item>

              <q-btn label="Deadline" color="primary">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="end">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
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
            <q-btn @click="createNote()" color="primary" label="Create">
            </q-btn>

            <q-btn
              @click="onReset()"
              label="Reset"
              type="reset"
              color="primary"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-popup-proxy>
    </q-btn>

    <q-card v-for="note in notestore.getNotes" v-bind:key="note" class="card flex q-ma-xl">
      <q-item-section>
        
        <!--<q-item>
            Category : {{ note.category }}
          </q-item> -->

        <q-item> Priority : {{ note.priority }} </q-item>

        <q-item>
          {{ note.title }}
          <q-popup-edit>
            <q-input v-model="title" autofocus />
            <q-input v-model="content" v autofocus />
            <q-btn @click="editNote(note.id)"><q-icon name="check" /></q-btn>
          </q-popup-edit>
        </q-item>

        <q-item style="word-break: break-all">
          {{ note.content }}
        </q-item>
      </q-item-section>

      <div class="btn-container">
        
        <router-link :to="`/notelist/${note.id}`">
        <q-btn class="btn update" color="primary">
          <q-icon name="fullscreen" />
        </q-btn>
        </router-link>


        <q-btn
          @click="deleteNote(note.id)"
          class="btn delete"
          color="red"
        >
          <q-icon name="delete" />
        </q-btn>
      </div>
    </q-card>
  </q-page>
</template>


<style scoped>
.card{
  height: 192px;
}

.btn-container{
  width: 80px;
  margin-top: 32px;
}

.btn-container a{
  text-decoration: none;
}

.delete, .update{
  width: 48px;
  height: 48px !important;
}

ul{
  list-style: none;
  }

.btn{
  padding: 1px;
  margin: 2px;
  height: 24px;
}

.datepicker-container{
  display: flex;
  margin: 0 20px 0 20px;
}

.q-form{
  background: white;
  padding: 18px;
  z-index: 9999;
}

</style>


<script>
import { defineComponent } from "vue";
import axios from "axios";
/* import addNotePopup from "../components/addNotePopup.vue"; */
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";

export default defineComponent({
  /*   components: { addNotePopup }, */
  name: "NoteList",
  /*   mounted() {
    this.notestore.fetchNotes();
  }, */
  
  data() {
    const store = useAuthStore();
    const notestore = useNoteStore();





    return {
      notes: [],
      note: {},
      title: "",
      content: "",
      begining: "",
      end: "",
      priority: "",
      isclicked: false,
      store,
      notestore
    };
  },
  methods: {
    createNote() {
      this.notestore
        .createNote({
          title: this.title,
          content: this.content,
          priority: this.priority,
          begining: this.begining,
          end: this.end,
        })
    },
    onReset() {
      console.log("reset press sur component parent");
        (this.title = ""),
        (this.content = ""),
        (this.priority = ""),
        (this.begining = ""),
        (this.end = "");
    },

    deleteNote(id) {
      this.notestore.deleteNote(id);
    },
    editNote(id) {
      axios
        .put("http://localhost:8080/api/notes/" + id, {
          title: this.title,
          content: this.content
/*           priority: this.priority */
        })
        .then(response => response)
        .then(response => {
          const idx = this.notes.findIndex(g => g.id === id)
          this.notes[idx] = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>