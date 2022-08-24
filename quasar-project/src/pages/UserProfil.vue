<template>
  <div>
    <q-card class="my-card" v-if="store.isconnected">
      <q-item-section v-for="user in users" :key="user">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">{{ user.username }}</div>
          <div class="text-subtitle2">{{ user.email }}</div>
        </q-card-section>

<!--         <q-card-actions align="around">
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions> -->
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
    const token = localStorage.getItem("accessToken");
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
      },
      store,
    };
  },
});
</script>