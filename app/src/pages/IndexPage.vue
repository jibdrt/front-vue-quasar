
<template>
  <q-page class="justify-center items-center">
    <q-card class="mobile-forms">
      <q-card-section class="logo-tw__container">
        <img class="logo-tw" src="..\assets\logo.svg">
      </q-card-section>
      <q-card-section class="login-form">
        <div>Connexion</div>

          <q-input
            filled
            square
            clearable
            v-model="username"
            label="Nom d'utilisateur"
            autocomplete="on"
          >
          </q-input>
          <q-input
            v-model="password"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="Mot de passe"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn
          unelevated
          @click="login()"
          size="lg"
          class=" bg-secondary text-white form-btn"
          label="Connexion"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-xl">
        <router-link to="/register">
          <p>Pas de compte ? Créez en un</p>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";
import { useQuasar } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    const store = useAuthStore();
    const $q = useQuasar();
    return {
      username: "",
      password: "",
      store,
      isPwd: ref(true),
      notifySuccess(response) {
        $q.notify({
          type: "positive",
          message: response.data.message,
        });
      },
      notifyError(error) {
        $q.notify({
          type: "negative",
          message: error.response.data.message,
        });
      },
    };
  },

  methods: {
    login() {
      const url = "http://localhost:8080/api";
      axios
        .post(url + "/auth/signin", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.store.login(response.data.accessToken);
          this.$router.push(url + "/UserProfil");
          this.notifySuccess(response);
          console.log(response.data);
        })
        .catch((error) => {
          this.notifyError(error);
          console.log(error.response.data.message);
        });
    },
  },
});
</script>
