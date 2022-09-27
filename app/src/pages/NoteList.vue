<template>
  <q-page class="row">
    <q-page-sticky
      style="z-index: 999"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="store.isconnected"
        @click="showModal = true"
        class="q-pa-md"
        color="deep-purple-7"
        rounded
      >
        <q-icon name="add" />
      </q-btn>
    </q-page-sticky>

    <div class="col">
      <q-card
        v-for="note in notestore.getNotes"
        :key="note._id"
        class="card flex notecard"
      >
        <q-item-section>
          <div class="row">
            <q-item>
              <q-chip
                :color="`${note.color}`"
                text-color="white"
                icon="warning"
                :label="`Priorité`"
              />
            </q-item>
            <q-item style="align-items: center">
              <span style="font-weight: bold">Deadline &nbsp;</span>
              le
              {{ moment(`${note.deadline}`).format("ddd DD MMM YYYY") }},
              {{ moment(`${note.deadline}`).fromNow() }}
            </q-item>
          </div>

          <q-item style="font-weight: bold">
            {{ note.title }}
          </q-item>

          <q-item v-html="note.content" class="notecontent"></q-item>

          <q-item> Postée par {{ note.creator.username }}</q-item>

          <q-item-section>
            <p v-if="note.participants.length > 0">Participants</p>
            <q-item v-for="participant in note.participants" :key="participant">
              <div v-for="username in participant" :key="username">
                {{ username }}
              </div>
            </q-item>
          </q-item-section>
        </q-item-section>

        <div class="btn-container">
          <router-link :to="`/notelist/${note._id}`">
            <q-btn class="btn" color="primary" flat rounded>
              <q-icon name="more_vert" color="deep-purple-7" size="32px" />
            </q-btn>
          </router-link>

          <q-btn
            v-if="store.isconnected"
            @click="confirmDelete(note._id)"
            class="btn"
            color="red"
            flat
            rounded
          >
            <q-icon name="delete" color="deep-purple-7" size="32px" />
          </q-btn>
        </div>
      </q-card>
    </div>
    <AddNotePopup :active="showModal" @close="showModal = false" />
  </q-page>
</template>


<style scoped>
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

.q-form {
  background: white;
  padding: 18px;
  z-index: 999;
}

.notecard {
  height: auto !important;
  padding: 20px 0px 20px 0px;
  margin: 2px 0px 1px 0px;
}

.notecontent {
  display: block;
  word-break: break-all;
}
</style>


<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";
/* import { useQuasar } from "quasar"; */
import axios from "axios";
import AddNotePopup from "../components/AddNotePopup";
import moment from "moment";
import "moment/locale/fr";

export default defineComponent({
  components: { AddNotePopup },
  name: "NoteList",

  created: function () {
    this.moment = moment;
  },

  data() {
    const store = useAuthStore();
    const notestore = useNoteStore();

    return {
      notes: [],
      note: {
        title: "",
        content: "",
        deadline: "",
        color: "",
        creator: "",
        participants: [],
      },
      showModal: false,
      store,
      notestore,
    };
  },

  methods: {
    confirmDelete(_id) {
      quasar
        .dialog({
          title: "Confirm",
          message: "Would you like to confirm deletion?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteNote(_id);
        });
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