


<template>
  <q-page>
    <div v-for="field in note" :key="field" class="q-ma-sm">
      <q-btn
        @click="$router.go(-1)"
        class="bg-primary q-ma-md"
        unelevated
        rounded
      >
        <q-icon name="arrow_back" class="text-white" />
      </q-btn>
      <q-card-section class="text-center text-h3 font-weight-bold">
        <q-chip
          v-if="`${field.color}` == 'red'"
          :label="`Important`"
          :color="`red`"
          class="text-white"
        />
        <q-card-section class="text-center">{{ field.title }}</q-card-section>
      </q-card-section>
      <q-card-section
        ><span class="text-weight-bold">Deadline</span> le
        {{moment(`${field.deadline}`).format("ddd DD MMM YYYY")}}, {{ moment(`${field.deadline}`).fromNow() }}</q-card-section
      >
      <q-separator />
      <q-card-section v-html="field.content"></q-card-section>
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
      <p v-show="field.deadline != null"></p>
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
    this.id = this.$route.params.id;
    axios
      .get(process.env.API_URL + `/api/notes/${this.id}`)
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
