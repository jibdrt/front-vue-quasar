<template>
  <q-page>

        <div v-for="field in user" :key="field">

          {{ field.roles[0].name }}
          {{ field.username }}
          {{ field.email }}
          {{ field.postedNotes.length }}
          {{ field.postedFiles.length }}

        </div>

  </q-page>
</template>


<script>
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";
import axios from "axios";

export default {

  props: {
    User: Object
  },

  mounted() {
    this.id = this.$route.params.id;
    axios
    .get(`http://localhost:8080/api/admin/${this.id}`)
    .then((response) => {
      (this.user = response.data)
      console.log(response.data);
    });
  },

  data() {
    const notestore = useNoteStore();
    const store = useAuthStore();
    return {
      id: this.$route.params.id,
      notestore,
      store,
      user: {},
      username: ""
    };
  },
};
</script>