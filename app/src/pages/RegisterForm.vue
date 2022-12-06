<template>
  <q-page class="row justify-center items-center" style="">
    <div class="column">
      <div class="row">
        <q-card square class="shadow-24" style="">
          <q-card-section class="bg-dark">
            <h4 class="text-h5 text-white q-my-md">Créer un compte</h4>
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
                <template #preprend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <span class="failed-notify" v-if="v$.email.$error">
                {{ validation.email.required.$message }}
              </span>
              <q-input
                square
                clearable
                v-model="state.username"
                type="username"
                label="Username"
              >
                <template #preprend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <span class="failed-notify" v-if="v$.username.$error">
                {{ v$.username.$errors[0].$message }}
              </span>
              <!-- <q-card-section v-if="v$.minLength.$error">{{ v$.minLength.$errors[0].$message }}</q-card-section> -->
              <q-input
                square
                clearable
                v-model="state.password"
                type="password"
                label="Password"
              >
                <template #preprend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <span class="failed-notify" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </span>
              <!-- //////////////////////////////todo confirm password -->

              <!--<q-input
                square
                clearable
                v-model="state.password.confirm"
                type="password"
                label="confirm"
              >
                <template #preprend>
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
              class="full-width text-white bg-dark"
              label="Créer"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <router-link to="/">
              <p class="text-grey-6">Se connecter</p>
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
import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
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

    const validation = {
      email: {
        required: helpers.withMessage(
          "Le champ email ne peut pas être vide",
          required
        ),
        email: helpers.withMessage(
          "L'adresse doit être une adresse email valide",
          email
        ),
      },
    };

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
      validation,
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
.q-card {
  width: 300px;
}
</style>