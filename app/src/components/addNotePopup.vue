
<template>
  <q-page-sticky
    v-show="active"
    class="col q-ma-md col q-card q-page-sticky"
    style="z-index: 999"
  >
    <div class="q-card">
      <q-form>
        <div class="q-pa-md q-gutter-sm">
          <q-toolbar style="display: flex; justify-content: space-between">
            <div class="row text-h5">Ajouter une note</div>
            <q-btn class="q-pa-sm" color="red" @click="$emit('close')"
              ><q-icon name="close" color="white"
            /></q-btn>
          </q-toolbar>
          <hr class="q-separator" />
          <q-input clearable v-model="title" label="Titre de votre note" />
          <q-editor v-model="content" label="Ajoutez du contenu" />
        </div>
        <q-card-section class="q-item-section">
          <q-btn flat outline>
            <q-icon name="event" />
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="deadline">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          Choisissez une date échéance
          {{ $data.deadline }}
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-select
              v-model="participants"
              :options="store.freeusers"
              option-label="username"
              label="Participants"
              multiple
            >
              <template #option="{ opt, selected, toggleOption }">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ opt.username }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle
                      :model-value="selected"
                      @update:model-value="toggleOption(opt)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-item class="q-pa-sm">Priorité</q-item>
            <q-radio v-model="color" val="green" label="Faible" color="green" />
            <q-radio
              v-model="color"
              val="orange"
              label="Modérée"
              color="orange"
            />
            <q-radio v-model="color" val="red" label="Haute" color="red" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn class="q-pa-sm" rounded color="green">
            <q-icon name="save" @click="createNote()" color="white" />
          </q-btn>
        </q-card-section>
      </q-form>
    </div>
  </q-page-sticky>
</template>



<script>
import { useNoteStore } from "../stores/notes";
import { useAuthStore } from "../stores/stores";

export default {
  name: "AddNotePopup",

  emits: ["close"],

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const notestore = useNoteStore();
    const store = useAuthStore();

    return {
      notes: [],
      note: {},
      title: "",
      content: "",
      deadline: "",
      color: "",
      participants: [],
      notestore,
      store,
    };
  },
  
  methods: {
    createNote() {
      this.notestore.createNote({
        title: this.title,
        content: this.content,
        deadline: this.deadline,
        participants: this.participants,
        color: this.color,
      });
    },
  },
};
</script>
