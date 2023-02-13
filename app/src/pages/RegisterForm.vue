<template>
  <q-page class="justify-center items-center">
    <q-card square class="mobile-forms q-ma-xs">
      <q-card-section class="logo-tw__container">
        <img class="logo-tw" src="..\assets\logo-ruddr.png">
      </q-card-section>

      <q-card-section>
        <q-form class="register-form">
          <div>Création de compte</div>
          <q-input
            filled
            square
            clearable
            v-model="state.username"
            type="username"
            label="Nom d'utilisateur"
          >
          </q-input>

          <q-input
            filled
            square
            clearable
            v-model="state.email"
            type="email"
            label="Email"
          >
          </q-input>

          <q-input
            v-model="state.password"
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

          <q-input
            v-model="state.confirmpassword"
            filled
            :type="iscPwd ? 'password' : 'text'"
            label="Confirmation du mot de passe"
            v-if="state.password != ''"
          >
            <template v-slot:append>
              <q-icon
                :name="iscPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="iscPwd = !iscPwd"
              />
            </template>
          </q-input>
          <q-card-section>
            <div class="failed-notify" v-if="v$.username.$error">
              <q-icon name="cancel" color="negative"/>
              {{ validation.username.required.$message }}
            </div>
            <div class="failed-notify" v-if="v$.email.$error">
              <q-icon name="cancel" color="negative"/>
              {{ validation.email.required.$message }}
            </div>
            <div class="failed-notify" v-if="v$.password.$error">
              <q-icon name="cancel" color="negative"/>
              {{ validation.password.required.$message }}
            </div>
            <div class="failed-notify" v-if="v$.confirmpassword.$error">
              <q-icon name="cancel" color="negative"/>
              {{ validation.confirmpassword.required.$message }}
            </div>
          </q-card-section>
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn
          @click="register()"
          unelevated
          size="lg"
          class="bg-secondary text-white form-btn"
          label="Créer"
        />
      </q-card-actions>
      <q-card-section class="text-center">
        <router-link to="/">
          <p class="text-black">Se connecter</p>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "RegisterForm",
  data() {
    const state = reactive({
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(4) },
        confirmpassword: { required, sameAsPassword: sameAs(state.password) },
      };
    });

    const validation = {
      email: {
        required: helpers.withMessage(
          "Entrez une adresse mail valide",
          required
        ),
      },
      username: {
        required: helpers.withMessage(
          "Définissez un identifiant d'au moins 4 caractères",
          required
        ),
      },
      password: {
        required: helpers.withMessage(
          "Vous devez entrer un mot de passe d'au moins 4 caractères",
          required
        ),
      },
      confirmpassword: {
        required: helpers.withMessage(
          "Les mots de passe doivent correspondre",
          required
        ),
      },
    };

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
      validation,
      isPwd: ref(true),
      iscPwd: ref(true),
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
