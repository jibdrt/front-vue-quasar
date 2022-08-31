<template>
  <div>
    <q-card class="my-card" v-if="store.isconnected">
      <q-item-section v-for="user in users" :key="user">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">Connecté en tant que : {{ user.username }}</div>
          <div class="text-h6">mail : {{ user.email }}</div>
          <div class="text-h6">role : {{ user.roles }}</div>
          <div class="text-h6">notes postées : {{ user.notes.length }}</div>
        </q-card-section>
      </q-item-section>
    </q-card>

    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
      Vous n'êtes pas connecté. Connectez vous pour avoir accès à votre profil
    </q-card>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "UserProfil",

  mounted() {
    const token = this.store.jwt;
    axios
      .get("http://localhost:8080/api/profil/user", {
        headers: { "x-access-token": `${token}` },
      })
      .then((response) => (this.users = response.data))
      .then((response) => response);
  },

  data() {
    const store = useAuthStore();
    return {
      users: [],
      user: {
        username: "",
        email: "",
        roles: "",
        notes: []
      },
      store,
    };
  },
});
</script>