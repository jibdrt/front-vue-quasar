


<template>
  <div style="text-aq-card-sectiongn: center">
    <q-btn @click="$router.go(-1)">BACK</q-btn>

    <q-page class="row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-card square class="shadow-24">
            <q-card-section class="bg-blue-5">
              <h4 class="text-h5 text-white q-my-md">Note detail</h4>
              <div
                class="absolute-bottom-right q-pr-md"
                style="transform: translateY(50%)"
              ></div>
            </q-card-section>
            <q-card-section class="text-h6" v-for="field in note" :key="field.title">
              {{ field.title }}
            </q-card-section>
            <q-card-section v-for="field in note" :key="field.content">
              {{ field.content }}
            </q-card-section>
            <q-card-section v-for="field in note" :key="field.deadline">
              deadline : {{ field.deadline }}
            </q-card-section>
            <q-card-section v-for="field in note" :key="field.creator">
              creator id : {{ field.creator }}
            </q-card-section>
            <q-card-section v-for="field in note" :key="field.created_at">
              créée le : {{ field.created_at }}
            </q-card-section>
            <q-card-section v-for="field in note" :key="field.updated_at">
              mise à jour : {{ field.updated_at }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NoteDetail",

  mounted() {
    this.id = this.$route.params.id;

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
    return {
      id: this.$route.params.id,
      note: {},
      title: "",
      content: "",
      deadline: "",
    };
  },
};
</script>