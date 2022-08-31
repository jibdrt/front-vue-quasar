
<template>
  <q-page-sticky
    v-show="active"
    class="col q-ma-md col q-card q-page-sticky"
    style="z-index: 999"
  >
    <div class="q-card">
      <q-form>
        <div class="q-pa-md q-gutter-sm">
          <q-toolbar>
            <div class="row text-h5">Ajouter une nouvelle note</div>
            <q-btn @click="$emit('close')" flat rounded
              ><i class="fas fa-circle fa-window-close" style="color: red"></i
            ></q-btn>
          </q-toolbar>
          <hr class="q-separator" />
          <q-input clearable v-model="title" label="Titre de votre note" />
          <q-input
            v-model="content"
            clearable
            type="textarea"
            color="primary"
            label="Ajoutez du contenu"
          />
        </div>

        <q-card-section class="q-item-section">
          <q-btn flat outline>
            <i class="fas fa-calendar-alt"></i>
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="deadline">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          Choisissez une date butoire
          {{ $data.deadline }}
        </q-card-section>
        <q-card-section>
          <q-btn class="q-pa-sm" rounded>
            <i
              @click="createNote()"
              style="color: green; font-size: 32px"
              class="fas fa-check"
            ></i>
          </q-btn>
        </q-card-section>
      </q-form>
    </div>
  </q-page-sticky>
</template>



<script>
import { useNoteStore } from "../stores/notes";

export default {
  name: "addNotePopup",

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const notestore = useNoteStore();
    return {
      notes: [],
      note: {},
      title: "",
      content: "",
      deadline: "",
      notestore,
    };
  },
  methods: {
    createNote() {
      this.notestore.createNote({
        title: this.title,
        content: this.content,
        deadline: this.deadline,
      });
    },
  },
};
</script>



<style scoped>
</style>