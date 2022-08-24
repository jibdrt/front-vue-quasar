<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

        </q-toolbar-title>
          
          <div v-if="store.isconnected">
          <q-badge color="green" label="Connecté" />
          <q-btn flat rounded>
            <q-icon name="account_circle"></q-icon>
          </q-btn>
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


        <router-link to="/">

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Log in</q-item-label>
              <q-item-label caption>Register and login</q-item-label>
            </q-item-section>
          </q-item>

        </router-link>

        <router-link to="/UserProfil">

          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Profile</q-item-label>
              <q-item-label caption>Display user informations</q-item-label>
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
              <q-item-label caption>Display all notes</q-item-label>
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
          color: "purple",
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


<style lang="sass" scoped>

      a
        text-decoration: none


      .q-item__section--avatar
        color: #0081ff

      q-item
        color: #222222


</style>