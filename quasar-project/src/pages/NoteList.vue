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

          <q-item>
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
            @click="deleteNote(note._id)"
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
    <addNotePopup :toggle="isclicked" />
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
import addNotePopup from "../components/addNotePopup.vue";
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";

export default defineComponent({
  components: { addNotePopup },
  name: "NoteList",

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
      note: {
        title: "",
        content: "",
        deadline: "",
      },
      isclicked: false,
      store,
      notestore,
    };
  },

  methods: {
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