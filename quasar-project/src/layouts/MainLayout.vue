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

        </q-toolbar-title>
        

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
          Menu
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



      <router-link to="/NoteList">

            <q-item
              clickable
            >
              <q-item-section
                avatar
              >
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




export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  data() {

        const leftDrawerOpen = ref(false)

        return {
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


      .q-item__section--avatar
        color: #0081ff

      q-item
        color: #222222


</style>