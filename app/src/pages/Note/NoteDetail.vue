


<template>
  <q-page>
    {{ $route.params.id }}
    <div v-for="field in note" :key="field" class="q-ma-sm">
      <q-btn
        @click="$router.go(-1)"
        class="bg-primary q-ma-md"
        unelevated
        rounded
      >
        <q-icon name="arrow_back" class="text-white" />
      </q-btn>
      <q-card-section class="text-center text-h5 font-weight-bold">
        <q-chip
          v-if="`${field.color}` == 'red'"
          :label="`Important`"
          :color="`red`"
          class="text-white"
        />
        <q-chip
          v-if="`${field.color}` == 'orange'"
          :label="`Modéré`"
          :color="`orange`"
          class="text-white"
        />
        <q-chip
          v-if="`${field.color}` == 'green'"
          :label="`Non urgent`"
          :color="`green`"
          class="text-white"
        />

        <q-card-section class="text-center">
          <p contenteditable @keyup="updateContent($event, 'title')">
            {{ field.title }}
          </p>
        </q-card-section>
      </q-card-section>
      <q-card-section
        ><span class="text-weight-bold">Deadline</span> le
        {{ moment(`${field.deadline}`).format("ddd DD MMM YYYY") }},
        {{ moment(`${field.deadline}`).fromNow() }}</q-card-section
      >
      <q-separator />
      <q-card-section>
        <p
        contenteditable
        @input="updateContent($event, 'content')"
        >{{ field.content }}</p>
      </q-card-section>
      <q-separator />
      <q-card-section v-for="data in field.participants" :key="data">
        <span class="text-weight-bold">Participants</span>
        <div class="q-pa-md" v-for="data in field.participants" :key="data">
          {{ data.username }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        ><span class="text-weight-bold">Publié par</span>
        {{ field.creator.username }} le
        {{
          moment(`${field.created_at}`).format("ddd DD MMM YYYY")
        }}</q-card-section
      >
      <q-card-section>
        <span class="text-weight-bold">Mis à jour</span> le
        {{ moment(`${field.updated_at}`).format("ddd DD MMM YYYY") }}
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

export default {
  name: "NoteDetail",

  props: {
    Note: Object,
  },

  created: function () {
    this.moment = moment;
  },

  mounted() {
    axios
      .get(process.env.API_URL + `/api/notes/${this.id}`)
      .then((response) => (this.note = response.data));
  },

  data() {
    this.id = this.$route.params.id;
    return {
      note: {},
      title: "",
      content: "",
      deadline: "",
      creator: "",
    };
  },

  methods: {
    updateContent(e, contentType) {
      const inputText = e.target.innerText;
      axios
        .patch(process.env.API_URL + `/api/notes/${this.id}`, {
          title: this.title,
          content: this.content
        })
        .catch((error) => {
          console.log(error);
        });
      switch (contentType) {
        case "title":
          this.title = inputText;
          break;
        case "content":
          this.content = inputText;
          break;
        default:
          break;
      }
    },
  },
};
</script>
