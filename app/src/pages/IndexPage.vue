
<template>
  <q-page class="flex flex-center">
    <q-card square class="shadow-24">
      <q-card-section class="bg-dark">
        <h4 class="text-h5 text-white q-my-md">Connexion</h4>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-xl q-pb-lg">
          <div style="height: 56px !important;"></div>
          <q-input
            square
            
            clearable
            v-model="username"
            label="Username"
            autocomplete="on"
          >
            <template #preprend>
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
            <template #preprend>
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
          class="full-width bg-dark text-white"
          label="Connexion"
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

<style scoped>
.q-card{
  width: 300px;
}
</style>


