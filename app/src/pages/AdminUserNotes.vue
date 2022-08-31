<template>
  <q-page>
    <q-page class="row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-card rounded class="shadow-24">
            <q-card-section
              class="text-h6"
              v-for="field in store.getUser"
              :key="field.username"
            >
              {{ field.username }}
            </q-card-section>
            <q-card-section
              class="text-h6"
              v-for="field in store.getUser"
              :key="field.email"
            >
              {{ field.email }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page>
</template>


<script>
import { useAuthStore } from "stores/stores";
import { useNoteStore } from "stores/notes";

export default {
  data() {
    const notestore = useNoteStore();
    const store = useAuthStore();
    return {
      id: this.$route.params.id,
      user: {
        username: "",
        notes: [],
      },
      notestore,
      store,
    };
  },
};
</script>