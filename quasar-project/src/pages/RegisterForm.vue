<template>
  <q-page class="row justify-center items-center" style="">
    <div class="column">
      <div class="row">
        <q-card square class="shadow-24" style="">
          <q-card-section class="bg-blue-5">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
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
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Username"
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
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              @click="register()"
              unelevated
              size="lg"
              color="green-5"
              class="full-width text-white"
              label="Créer"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <router-link to="/">
              <p class="text-grey-6">Return to login</p>
            </router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    register() {
      const url = "http://localhost:8080/api";
      axios
        .post(url + "/auth/signup", {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then((response) => {
          this.$router.push(url + "/");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
