


<template>
  <div style="text-align:center;">
    <q-btn @click="$router.go(-1)">BACK</q-btn>
    <h2>note detail</h2>
    <div>
    {{ $data.note }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
/* import { useNoteStore } from "stores/notes"; */

export default {
  name: "NoteDetail",

  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(`http://localhost:8080/api/notes/${this.id}`)
      .then((response) => (this.note = response.data))
      .then((response) => console.log(response));
  },

  data() {
/*     const notestore = useNoteStore(); */
    return {
      note: {},
      id: ""
/*       notestore */
    };
  },
};
</script>