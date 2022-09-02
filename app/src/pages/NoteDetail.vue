


<template>
  <div>
    <q-btn @click="$router.go(-1)">BACK</q-btn>

    <q-page class="row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-card square class="shadow-24">
            <q-card-section class="bg-deep-purple-7">
              <h4 class="text-h5 text-white q-my-md" v-for="field in note"
              :key="field.title">{{ field.title }}</h4>
            </q-card-section>
            <q-card-section
              class="text-h6"
              v-for="field in note"
              :key="field.color"
            >
              <q-chip
                :color="`${field.color}`"
                text-color="white"
                icon="warning"
                :label="`Priorité`"
              />
            </q-card-section>
<!--             <q-card-section
              class="text-h6"
              v-for="field in note"
              :key="field.title"
            >
              Titre : {{ field.title }}
            </q-card-section> -->
            <q-card-section
              v-for="field in note"
              :key="field.content"
              v-html="field.content"
            >
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

<style scoped>
.q-chip {
  position: absolute;
  top: -50%;
}
</style>