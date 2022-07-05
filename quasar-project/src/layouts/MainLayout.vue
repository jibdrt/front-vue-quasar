<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

        </q-toolbar-title>


         <q-btn v-if="store.isconnected" flat dense round icon="logout" aria-label="exit" @click="disconnect" />

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

        <router-link to="/UserList">

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
              <q-item-label caption>Go to notes list</q-item-label>
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




export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  data() {
    const store = useAuthStore();
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      store
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