<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <!--<EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />-->


                <router-link to="/">

          <q-item
          clickable
          >
          <q-item-section
          avatar
          >
          <q-icon name="house" />
          </q-item-section>

          <q-item-section>
          <q-item-label>Home</q-item-label>
          <q-item-label caption>Go to homepage</q-item-label>
          </q-item-section>
          </q-item>

          </router-link>



      <router-link to="/RdvList">

            <q-item
              clickable
            >
              <q-item-section
                avatar
              >
                <q-icon name="today" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Rdvs List</q-item-label>
                <q-item-label caption>Go to rdv's list</q-item-label>
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
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios'


const linksList = [
  {
    title: 'Rdv list',
    caption: 'Display Rdv List',
    icon: 'today',
    path: 'https://quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
/*     EssentialLink */
  },

      mounted() {
      axios.get('http://localhost:8080/api/r_d_vs')
      .then((response) => (this.rdvs = response.data['hydra:member']))
      .then(response => console.log(response));
      },

  data() {

        const leftDrawerOpen = ref(false)

        return {
          essentialLinks: linksList,
          leftDrawerOpen,
          toggleLeftDrawer () {
            leftDrawerOpen.value = !leftDrawerOpen.value
            }
          }
        }

  
  
})
</script>


<style lang="sass" scoped>

      a
        text-decoration: none


</style>