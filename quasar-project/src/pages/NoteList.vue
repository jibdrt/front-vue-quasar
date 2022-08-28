<template>
  <q-page class="row">
    <q-page-sticky
      style="z-index: 999"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="store.isconnected"
        @click="isclicked = !isclicked"
        class="q-pa-md"
        color="green"
        rounded
      >
        <q-icon name="add" />
      </q-btn>
    </q-page-sticky>

    <div class="col">
      <q-card
        v-for="note in notestore.getNotes"
        v-bind:key="note"
        class="card flex"
      >
        <q-item-section>
          <q-item>{{ note.deadline }} </q-item>

          <q-item>
            {{ note.title }}
          </q-item>

          <q-item style="word-break: break-all">
            {{ note.content }}
          </q-item>
        </q-item-section>

        <div class="btn-container">
          <router-link :to="`/notelist/${note._id}`">
            <q-btn class="btn" color="primary" flat rounded>
              <i class="fa fa-xl fa-info-circle"></i>
            </q-btn>
          </router-link>

          <q-btn
            v-if="store.isconnected"
            @click="deleteNote(note._id);"
            class="btn"
            color="red"
            flat
            rounded
          >
            <i class="fa fa-trash fa-xl"></i>
          </q-btn>
        </div>
      </q-card>
    </div>
    <q-page-sticky
      v-show="isclicked"
      class="col q-ma-md col q-card q-page-sticky"
      style="z-index: 999"
    >
      <div class="q-card">
        <q-form>
          <div class="q-pa-md q-gutter-sm">
            <q-toolbar>
              <div class="row text-h5">Ajouter une nouvelle note</div>
              <q-btn @click="isclicked = !isclicked" flat rounded
                ><i class="fas fa-circle fa-window-close" style="color: red"></i
              ></q-btn>
            </q-toolbar>
            <hr class="q-separator" />
            <q-input clearable v-model="title" label="Titre de votre note" />
            <q-input
              v-model="content"
              clearable
              type="textarea"
              color="primary"
              label="Ajoutez du contenu"
            />
          </div>

          <q-card-section class="q-item-section">
            <q-btn flat outline>
              <i class="fas fa-calendar-alt"></i>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="deadline">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
            Choisissez une date butoire
            {{ $data.deadline }}
          </q-card-section>
          <q-card-section>
            <q-btn flat rounded>
              <i
                @click="createNote()"
                style="color: purple; font-size: 32px"
                class="fas fa-save"
              ></i>
            </q-btn>
          </q-card-section>
        </q-form>
      </div>
    </q-page-sticky>
  </q-page>
</template>


<style scoped>
.card {
  height: 192px;
}

.btn-container {
  width: 80px;
  margin-top: 32px;
}

.btn-container a {
  text-decoration: none;
}

.delete,
.update {
  width: 48px;
  height: 48px !important;
}

ul {
  list-style: none;
}

.btn {
  padding: 1px;
  margin: 2px;
  height: 24px;
}

.datepicker-container {
  display: flex;
  margin: 0 20px 0 20px;
}

.q-form {
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
/*     const $q = useQuasar();

    function confirmDeletion() {
      $q.dialog({
        title: 'Confirm',
        message: 'Would you like to confirm the deletion',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('>>>> OK')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    } */


    return {
      notes: [],
      note: {},
      title: "",
      content: "",
      deadline: "",
      isclicked: false,
      store,
      notestore
    };
  },

  methods: {
    createNote() {
      this.notestore.createNote({
        title: this.title,
        content: this.content,
        deadline: this.deadline,
      });
    },

    onReset() {
      console.log("reset press sur component parent");
      (this.title = ""), (this.content = ""), (this.deadline = "");
    },

    deleteNote(_id) {
      this.notestore.deleteNote(_id);
    },

    editNote(id) {
      axios
        .put("http://localhost:8080/api/notes/" + id, {
          title: this.title,
          content: this.content,
          deadline: this.deadline,
        })
        .then((response) => response)
        .then((response) => {
          const idx = this.notes.findIndex((g) => g.id === id);
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