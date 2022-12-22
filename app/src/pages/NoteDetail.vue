


<template>
  <q-page>
    <q-btn @click="$router.go(-1)">BACK</q-btn>

    <q-card v-for="field in note" :key="field" class="q-ma-sm">
    <q-card-section>{{ field.title }}</q-card-section>
      <p>{{ field.priority }}</p>
      <p v-html="field.content"></p>
      <p>Créée par {{ field.creator.username }}</p>
      <p>
        Créée le {{ moment(`${field.created_at}`).format("ddd DD MMM YYYY") }}
      </p>
      <p>
        Mise à jour le
        {{ moment(`${field.updated_at}`).format("ddd DD MMM YYYY") }}
      </p>
      <p v-show="field.deadline != null">
        Deadline le {{ moment(`${field.deadline}`).format("ddd DD MMM YYYY") }}
      </p>
      <p v-show="field.deadline != null">
        {{ moment(`${field.deadline}`).fromNow() }}
      </p>
      <!-- <p>{{ field.participants }}</p> -->
      <div v-for="data in field.participants" :key="data">
        {{ data.username }}
      </div>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

export default {
  name: "NoteDetail",

  props: {
    Note: Object
  },

  created: function () {
    this.moment = moment;
  },

  mounted() {
    this.id = this.$route.params.id;

    axios
      .get(`http://localhost:8080/api/notes/${this.id}`)
      .then((response) => (this.note = response.data));
  },

  data() {
    return {
      id: this.$route.params.id,
      note: {},
      title: "",
      content: "",
      deadline: "",
      creator: "",
    };
  },
};
</script>
