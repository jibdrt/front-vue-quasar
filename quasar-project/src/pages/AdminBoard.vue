<template>
  <div>
    <q-card class="my-card" v-if="store.isconnected">
      <div v-for="user in users" :key="user">
        <q-card-section class="text-white bg-blue-4">
          <div class="text-h6">{{ user.username }}</div>
          <div class="text-subtitle2">{{ user.email }}</div>
        </q-card-section>
        <q-separator />
      </div>
    </q-card>

    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
      Connectez-vous en tant qu'admin pour avoir accès
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
      .get("http://localhost:8080/api/profil/admin", {
        headers: { "x-access-token": `${token}` },
      })
      .then((response) => (this.users = response.data))
      .then((response) => response)
        .catch(error => {
            if(error.response.status === 403) {
                console.log('utilisateur simple non autorisé')
            }
        })
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
      store
    };
  },
});
</script>