<template>
  <router-link :to="`/notelist/${note._id}`" class="notecard rounded">
    <q-card>
      <q-item-section class="row">
        <q-item class="items-center">
          <div>
            <q-chip
              class="priority-chip q-ma-sm"
              v-if="`${note.color}` == 'green'"
              :label="`Non urgent`"
              :color="`green`"
              text-color="white"
            />
          </div>
          <div>
            <q-chip
              class="priority-chip q-ma-sm"
              v-if="`${note.color}` == 'orange'"
              :label="`Modéré`"
              :color="`orange`"
              text-color="white"
            />
          </div>
          <div>
            <q-chip
              class="priority-chip q-ma-sm"
              v-if="`${note.color}` == 'red'"
              :label="`Important`"
              :color="`red`"
              text-color="white"
            />
          </div>
<!--           <div>
            <span class="font-weight-bold">Participants &nbsp;</span
            ><span v-if="`${note.participants.length}` === '0'">aucun</span
            ><span v-if="`${note.participants.length}` != '0'">{{
              note.participants.length
            }}</span>
          </div> -->
        </q-item>
      </q-item-section>

      <q-separator />

      <q-item-section>
        <q-item class="items-center">
          <span class="text-weight-bold">Titre &nbsp;</span>
          {{ note.title }}

          <!--           <q-btn class="btn" color="primary" flat rounded>
            <q-icon name="more_vert" color="deep-purple-7" size="32px" />
          </q-btn> -->
        </q-item>
      </q-item-section>

      <q-separator />

      <q-item-section>
        <q-item class="items-center">
          <span class="text-weight-bold">Deadline &nbsp;</span>
          le
          {{ moment(`${note.deadline}`).format("ddd DD MMM YYYY") }},
          {{ moment(`${note.deadline}`).fromNow() }}
        </q-item>
      </q-item-section>
    </q-card>
  </router-link>
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