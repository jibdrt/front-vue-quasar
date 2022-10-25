<style scoped>



</style>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-deep-dark-9" >
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

        </q-toolbar-title>
          
          <div v-if="store.isconnected">
          <q-badge color="green" label="Connecté" />
          <router-link to="/UserProfil">
          <q-btn flat round>
            <q-icon class="badge" name="account_circle"></q-icon>
          </q-btn>
          </router-link>
          </div>
          
          <q-badge v-if="store.isnotconnected" color="red" label="Déconnecté" />
         <q-btn v-if="store.isconnected" flat dense round icon="logout" aria-label="exit" @click="disconnect(); notifyLogout();" />

      </q-toolbar>



    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <!--<EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />-->

        <router-link to="/" v-if="store.isnotconnected">

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Se connecter</q-item-label>
              <q-item-label caption>Se connecter / créer un compte</q-item-label>
            </q-item-section>
          </q-item>

        </router-link>

        <router-link to="/AdminBoard" v-if="store.isconnected">
          <q-item clickable>
            <q-item-section avatar>
              <i class="fa-lg fa-solid fa-crown"></i>
            </q-item-section>

            <q-item-section>
              <q-item-label>Admin</q-item-label>
              <q-item-label caption>Accès à l'interface admin</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/UserProfil">

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Profil</q-item-label>
              <q-item-label caption>Profil utilisateur</q-item-label>
            </q-item-section>
          </q-item>


        </router-link>

        <router-link to="/NoteList">

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notes</q-item-label>
              <q-item-label caption>Liste des notes</q-item-label>
            </q-item-section>
          </q-item>


        </router-link>






      </q-list>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/stores';
import { useQuasar } from "quasar";



export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  data() {
    const store = useAuthStore();
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    return {
      leftDrawerOpen,
      store,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      notifyLogout() {
      $q.notify({
          color: "dark",
          message: "Successfully Logged out",
        });
      },
    }
  },

  methods: {
    disconnect(){
      this.store.logout();
      this.$router.push("/");
    }
  }



})
</script>


<style scoped>

      a{
        text-decoration: none
      }

      .q-item__section--avatar, .q-item__label:nth-child(1){
        color: #0081ff
      }

      .badge{
        color: white
      }

      .badge:focused{
        color: black;
      }
      
</style>