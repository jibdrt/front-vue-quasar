<template>
  <q-page class="row">
    <q-page-sticky
      style="z-index: 999"
      position="bottom-right"
      :offset="[18, 80]"
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

 <div class="q-pa-md row items-start q-gutter-md">

      <NoteCard
        v-for="note in notestore.getNotes"
        :key="note._id"
        class="q-card q-ma-md"
        :note="note"
      />

 </div>
    <AddNotePopup :active="showModal" @close="showModal = false" />
  </q-page>
</template>




<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";
import axios from "axios";
import AddNotePopup from "../components/AddNotePopup";
import NoteCard from "../components/NoteCard";
import moment from "moment";
import { ref } from "vue";
import "moment/locale/fr";

export default defineComponent({
  components: { AddNotePopup, NoteCard },
  name: "NoteList",

  created: function () {
    this.moment = moment;
  },

  data() {
    const store = useAuthStore();
    const notestore = useNoteStore();
    return {
      confirm: ref(false),
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