


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="desktop-drawer"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> </q-toolbar-title>

        <div v-if="store.isconnected">
          <q-badge color="green" label="Connecté" />
          <router-link to="/UserProfil">
            <q-btn flat round color="primary">
              <q-icon class="badge" name="account_circle" />
            </q-btn>
          </router-link>
        </div>

        <q-badge v-if="store.isnotconnected" color="red" label="Déconnecté" />
        <q-btn
          v-if="store.isconnected"
          flat
          dense
          round
          icon="logout"
          aria-label="exit"
          @click="
            disconnect();
            notifyLogout();
          "
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>


        <router-link to="/" v-if="store.isnotconnected">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Se connecter</q-item-label>
              <q-item-label caption
                >Se connecter / créer un compte</q-item-label
              >
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/AdminBoard" v-if="store.isconnected">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Admin</q-item-label>
              <q-item-label caption>Accès à l'interface admin</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/UserProfil" v-if="store.isconnected">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="account_circle" />
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
              <q-icon name="note_alt" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notes</q-item-label>
              <q-item-label caption>Liste des notes</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/FileList" v-if="store.isconnected">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="add_to_drive" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Fichiers</q-item-label>
              <q-item-label caption>Zone de stockage</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="fixed mobile-tab">
      <q-tabs class="bg-primary text-white shadow-2">
        <router-link to="/AdminBoard" v-if="store.isconnected">
          <q-tab name="board" icon="admin_panel_settings" label="Admin" />
        </router-link>

        <router-link to="/" v-if="store.isnotconnected">
          <q-tab name="login" icon="admin_panel_settings" label="Connexion" />
        </router-link>

        <router-link to="/UserProfil" v-if="store.isconnected">
          <q-tab name="profil" icon="account_circle" label="Profil" />
        </router-link>

        <router-link to="/NoteList">
          <q-tab name="notes" icon="note_alt" label="Notes" />
        </router-link>

        <router-link to="/FileList" v-if="store.isconnected">
          <q-tab name="files" icon="add_to_drive" label="Fichiers" />
        </router-link>
      </q-tabs>
    </div>
  </q-layout>
</template>


<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "stores/stores";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {},

  data() {
    const store = useAuthStore();
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    return {
      leftDrawerOpen,
      store,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      notifyLogout() {
        $q.notify({
          type: "positive",
          message: "Déconnecté",
        });
      },
      user: {},
    };
  },

  methods: {
    disconnect() {
      this.store.logout();
      this.$router.push("/");
    },
  },
});
</script>


<style scoped>
a {
  text-decoration: none;
}

.q-item__section--avatar,
.q-item__label:nth-child(1) {
  color: #0081ff;
}

.badge {
  color: white;
}

.badge:focused {
  color: black;
}
</style>