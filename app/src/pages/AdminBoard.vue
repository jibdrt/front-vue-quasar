<template>
  <div>
    <!--     <q-table  class="table-grid">
      <q-tr v-for="user in store.getUsers" :key="user">
        <q-td>
          {{ user.username }}
        </q-td>
        <q-td>
          {{ user.email }}
        </q-td>
        <q-td>
          <q-btn @click="deleteUser(user._id)" flat rounded>
            <i class="fa fa-lg fa-trash"></i>
          </q-btn>
        </q-td>
      </q-tr>
    </q-table> -->

    <q-list v-if="store.isconnected" bordered separator class="col">
      <q-item clickable v-ripple v-for="user in store.getUsers" :key="user">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>{{ user.username }}</q-item-section>
        <q-item-section>{{ user.email }}</q-item-section>
        <q-item-section></q-item-section>
        <!-- <q-item-section> {{ user.notes.length }} notes </q-item-section> -->
        <q-item-section>
          <router-link
            :to="`/adminboard/${user._id}`"
            style="text-decoration: none; color: inherit"
          >
            <q-btn flat rounded>
              <q-icon name="edit"></q-icon>
            </q-btn>
          </router-link>
        </q-item-section>
        <!-- <q-item-section>{{ user.roles }}</q-item-section> -->
        <q-item-section>
          <div>
            <q-btn @click="deleteUser(user._id)" flat rounded>
              <i class="fa fa-lg fa-trash"></i>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
      Connectez-vous en tant qu'admin pour avoir accès
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
      users: [],
      user: {
        username: "",
        email: "",
        roles: "",
      },
      store,
    };
  },
  methods: {
    deleteUser(_id) {
      this.store.deleteUser(_id);
    },
  },
});
</script>

<style scoped>
.table-grid {
  display: flex;
}

.fa-trash {
  color: red;
}
</style>