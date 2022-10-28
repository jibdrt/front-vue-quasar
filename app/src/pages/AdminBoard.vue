<template>
  <div>

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

    <q-page-sticky
      style="z-index: 999"
      position="bottom-right"
      :offset="[18, 80]"
    >
      <q-btn @click="visibleForm = !visibleForm">
        <q-icon name="add" />
      </q-btn>
    </q-page-sticky>

    <q-card class="q-ma-xl">
      <q-form v-if="visibleForm">
        <q-input v-model="username" label="username" />
        <q-input v-model="email" label="email" />
        <q-input v-model="password" label="password" />

        <q-select v-model="roles" :options="roles in store.roles" label="role" />

        <q-btn class="q-pa-sm" rounded color="green">
          <q-icon name="save" @click="register()" color="white" />
        </q-btn>
      </q-form>
    </q-card>

    <q-card v-if="store.isnotconnected" class="q-pa-xl q-ma-xl">
      Connectez-vous en tant qu'admin pour avoir accès
    </q-card>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";
import axios from "axios";
export default defineComponent({
  name: "UserProfil",

  data() {
    const store = useAuthStore();
    const roles = store.roles;
    return {
      users: [],
      user: {},
      username: "",
      email: "",
      password: "",
      roles,
      store,
      visibleForm: false,
    };
  },
  methods: {
    register() {
      const url = "http://localhost:8080/api";

      axios
        .post(url + "/auth/signup", {
          username: this.username,
          password: this.password,
          email: this.email,
          roles: this.roles,
        })
        .then((response) => {
          /*             this.$router.push(url + "/"); */
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(_id) {
      this.store.deleteUser(_id);
    },
  },
});
</script>
