<template>
  <div>
    <q-page v-if="store.isconnected">
      <q-card>
        <q-card-section class="row justify-center">
          <q-avatar class="picture-container">
            <img
              class="profil-picture"
              :src="'http://localhost:8080/api/profil/picture/' + user.picture"
            />
          </q-avatar>
          <q-btn class="edit-picture">
            <q-icon name="edit" rounded />
          </q-btn>
        </q-card-section>
        <q-card-section class="text-center">
          <q-card-section class="text-h5">
            {{ user.username }}
          </q-card-section>
          <q-card-section>
            {{ user.email }}
          </q-card-section>
          <q-card-section>
            {{ user.involvement }}
            </q-card-section>
          <router-link to="/editprofile"><q-btn>username</q-btn></router-link>
          <router-link to="/editprofile"><q-btn>pwd</q-btn></router-link>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>



<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";
import axios from "axios";

export default defineComponent({
  name: "UserProfil",

  mounted() {
    axios
      .get("http://localhost:8080/api/profil/user", {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((response) => (this.user = response.data))
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  },

  data() {
    const store = useAuthStore();
    return {
      store,
      user: {
        picture: "",
      },
    };
  },
});
</script>


<style scoped>
.picture-container {
  width: 200px;
  height: 200px;
}
.edit-picture{
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>