<template>
  <div>
    <q-card class="q-ma-md q-pa-md">
      <q-form>
        <q-input v-model="username" label="username" />
        <q-input v-model="email" label="email" />
        <q-btn @click="changeCredent()">Changer</q-btn>
      </q-form>
    </q-card>
  </div>
</template>




<script>
import { defineComponent } from "vue";
/* import { useAuthStore } from "stores/stores"; */
import axios from "axios";

export default defineComponent({
  name: "ChangeCredent",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  methods: {
    changeCredent() {
      axios
        .patch(
          "http://localhost:8080/api/profil/user/editprofile",
          {
            username: this.username,
            email: this.email,
          },
          {
            headers: {
              'x-access-token': localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => response.data)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>