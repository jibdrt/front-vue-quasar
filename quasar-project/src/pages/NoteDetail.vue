


<template>
  <div style="text-align: center">
    <q-btn @click="$router.go(-1)">BACK</q-btn>
    <h2>note detail</h2>

    {{ $data.note }}

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NoteDetail",

  mounted() {
    this.id = this.$route.params.id;
    /*     this.title = this.note.title;
    this.content = this.note.content;
    this.deadline = this.note.deadline;
    this.creator = this.note.creator;
    this.created = this.note.created_at;
    this.maj = this.note.updated_at; */
    axios
      .get(`http://localhost:8080/api/notes/${this.id}`)
      .then((response) => (this.note = response.data))
      .then(() =>
        console.log(
          this.note[0].title,
          "\n",
          this.note[0].content,
          "\n",
          this.note[0].deadline,
          "\n",
          this.note[0].creator,
          "\n",
          this.note[0].created_at,
          "\n",
          this.note[0].updated_at
        )
      );
  },

  data() {
    /*     const notestore = useNoteStore(); */
    return {
      note: {},
      id: this.$route.params.id,
      title: this.title,
      content: this.content,
      deadline: this.deadline
    };
  },
};
</script>