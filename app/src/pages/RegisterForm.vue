<template>
  <q-page class="row justify-center items-center" style="">
    <div class="column">
      <div class="row">
        <q-card square class="shadow-24" style="">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Créer un compte</h4>
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
                v-model="state.email"
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
                v-model="state.username"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <!-- <q-card-section v-if="v$.minLength.$error">{{ v$.minLength.$errors[0].$message }}</q-card-section> -->
              <q-input
                square
                clearable
                v-model="state.password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <!--               <q-input
                square
                clearable
                v-model="state.password.confirm"
                type="password"
                label="confirm"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input> -->
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              @click="register()"
              unelevated
              size="lg"
              color="deep-purple-7"
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
    <div class="failed-notify" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
    <div class="failed-notify" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default defineComponent({
  name: "RegisterForm",
  data() {
    const state = reactive({
      email: "",
      username: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(4) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  methods: {
    register() {
      const url = "http://localhost:8080/api";

      this.v$.$validate(); // checks inputs

      if (!this.v$.$error) {
        //perform signup if no errors
        axios
          .post(url + "/auth/signup", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
          })
          .then((response) => {
            this.$router.push(url + "/");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // do nothing
      }
    },
  },
});
</script>

<style scoped>
.failed-notify {
  padding: 0 16px;
  min-height: 48px;
  color: white;
  background: #f44336 !important;
  box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
  border-radius: 4px;
  position: absolute;
  bottom: 32px;
  display: flex;
  align-items: center;
}
</style>