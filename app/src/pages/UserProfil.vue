<template>
  <div>
    <q-card class="my-card" v-if="store.isconnected">
      <q-item-section v-for="user in store.getThisUser" :key="user">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">Utilisateur : {{ user[0].username }}</div>
          <div class="text-h6">mail : {{ user[0].email }}</div>
          <div class="text-h6">role : {{ user[0].roles[0].name }}</div>
          <div>
            {{ user[0].picture }}
          </div>
        </q-card-section>
        <q-card-section>
          <router-link to="/changepassword"
            ><q-btn>Changer mot de passe</q-btn></router-link
          >
          <router-link to="/editprofile"
            ><q-btn>Changer username/mail</q-btn></router-link
          >
        </q-card-section>
      </q-item-section>
    </q-card>

    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
      Vous n'êtes pas connecté. Connectez vous pour avoir accès à votre profil
    </q-card>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "UserProfil",

  data() {
    const store = useAuthStore();
    return {
      store,
    };
  },
});
</script>