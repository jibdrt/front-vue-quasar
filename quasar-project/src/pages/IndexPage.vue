
<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="username"
            label="username"
            autocomplete="on"
          />
          <q-input
            square
            filled
            clearable
            v-model="password"
            type="password"
            label="password"
            autocomplete="on"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          @click="login()"
          color="light-blue"
          size="lg"
          class="full-width"
          label="Login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/stores';

export default defineComponent({
  name: "IndexPage",
  data() {
    const store = useAuthStore()
    return {
      username: "",
      password: "",
      store
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
          this.$router.push(url + "/UserList");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>


