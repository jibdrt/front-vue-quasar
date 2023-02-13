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
        </q-card-section>
        <q-card-section class="text-center">
          <q-card-section class="text-h5">
            {{ user.username }}
          </q-card-section>
          <q-card-section>
            {{ user.email }}
          </q-card-section>
          
          <q-card-section class="justify-center flex" style="column-gap: 20px;">
            <router-link to="/editprofile"
              ><q-btn class="form-btn bg-secondary text-white" unelevated
                >Modifier l'identifiant</q-btn
              ></router-link
            >
            <router-link to="/editprofile"
              ><q-btn class="form-btn bg-secondary text-white" unelevated
                >Modifier le mot de passe</q-btn
              ></router-link
            >
          </q-card-section>
          <q-card-section>
            <q-uploader
              :url="'http://localhost:8080/api/profil/picture/' + user.picture"
              label="Mettre à jour la photo de profil"
              :factory="upload"
              @uploaded="uploaded"
              style="max-width: 300px"
            />
          </q-card-section>
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
        pictures: [],
      },
    };
  },
  methods: {
    upload() {
      return new Promise((resolve) => {
        // Take JWT token from store
        const token = localStorage.getItem("accessToken");
        resolve({
          url: "http://localhost:8080/api/profil/picture/",
          method: "POST",
          headers: [{ name: "x-access-token", value: `${token}` }],
        });
      });
    },
    uploaded(info) {
      console.log(JSON.parse(info.xhr.response));
      this.picture.push(JSON.parse(info.xhr.response));
    },
  },
});
</script>


<style scoped>
.picture-container {
  width: 200px;
  height: 200px;
}
.edit-picture {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>