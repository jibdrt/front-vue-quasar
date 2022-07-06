<template>
  <div>
    <q-card class="q-pa-xl q-ma-xl" v-if="store.isconnected">
    <q-item>
        User profile
    </q-item>
      <td>
        <tr>
          id :
          {{ user.id }}
        </tr>
        <tr>
          username :
          {{ user.username }}
        </tr>
        <tr>
          {{ user.roles }}
        </tr>
      </td>
    </q-card>


    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
        Vous n'êtes pas connecté.
        Connectez vous pour avoir accès à votre profil
    </q-card>


  </div>
</template>



<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "UserList",

  mounted() {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8080/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => (this.user = response.data))
      .then((response) => console.log(response));
  },

  data() {
    const store = useAuthStore();
    return {
      users: [],
      user: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      color: "",
      store,
    };
  },
});
</script>