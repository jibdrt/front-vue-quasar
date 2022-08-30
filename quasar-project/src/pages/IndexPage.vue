
<template>
  <q-page class="flex flex-center">
    <q-card square  class="shadow-24" style="">
      <q-card-section class="bg-deep-purple-8">
        <h4 class="text-h5 text-white q-my-md">Connexion</h4>
        <div
          class="absolute-bottom-right q-pr-md"
          style="transform: translateY(50%)"
        ></div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-xl q-pb-lg">
          <q-input
            square
            
            clearable
            v-model="username"
            label="Username"
            autocomplete="on"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            square
            
            clearable
            v-model="password"
            type="password"
            label="Password"
            autocomplete="on"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          @click="login()"
          size="lg"
          class="full-width bg-deep-purple-8 text-white"
          label="Login"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-sm">
        <router-link to="/register">
          <p>Créer un compte</p>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "IndexPage",
  data() {
    const store = useAuthStore();
    return {
      username: "",
      password: "",
      store,
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>


