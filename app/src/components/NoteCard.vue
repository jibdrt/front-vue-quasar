<template>
  <q-card @click="checkcolor()">
    <div class="check"></div>
    <q-item-section>
      <div class="row">
        <q-item>
          <q-chip v-if="`${note.color}` == 'green'" :label="`Non urgent`" :color="`green`" text-color="white" />
          <q-chip v-if="`${note.color}` == 'orange'" :label="`Modéré`" :color="`orange`" text-color="white" />
          <q-chip v-if="`${note.color}` == 'red'" :label="`Important`" :color="`red`" text-color="white" />
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
        <q-item v-if="note.participants.length > 0">Participants<span v-for="participant in note.participants" :key="participant">&nbsp;{{ participant.username }}&nbsp;</span></q-item>
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
        @click="deleteNote(note._id)"
        class="btn"
        color="red"
        flat
        rounded
      >
        <q-icon name="delete" color="deep-purple-7" size="32px" />
      </q-btn>
    </div>
  </q-card>
</template>



<script>
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";
import axios from "axios";
import moment from "moment";
import { ref } from "vue";
import "moment/locale/fr";

export default {
  name: "NoteCard",

  created: function () {
    this.moment = moment;
  },

  props: {
    note: Object,
  },

  data() {
    const store = useAuthStore();
    const notestore = useNoteStore();
    return {
      confirm: ref(false),
      notes: [],
      title: "",
      content: "",
      deadline: "",
      color: "",
      creator: "",
      participants: [],
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
};
</script>