import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    user: {
      username: '',
      email: '',
    },
    jwt: LocalStorage.getItem('accessToken')
  }),

  getters: {
    isconnected(state) {
      return state.jwt != null && state.jwt != "";
    },
    isnotconnected(state) {
      return state.jwt == null | state.jwt == "";
    },
    getUsers(state) {
      if (state.users.length == 0) {
        this.fetchUsers();
      }
      return state.users;
    },
    getThisUser(state) {
      this.fetchThisUser(this.user);
      return state.username;
    }
  },
  actions: {
    login(token) {
      this.jwt = token;
      localStorage.setItem("accessToken", token);
    },
    logout() {
      this.jwt = null;
      localStorage.setItem("accessToken", "");
    },

    fetchUsers() {
      axios
        .get("http://localhost:8080/api/profil/admin", {
          headers: {
            "x-access-token": this.jwt
          },
        })
        .then((response) => (this.users = response.data))
        .then((response) => response)
        .catch((error) => {
          if (error.response.status === 403) {
            console.log("utilisateur simple non autorisé");
          }
        });
    },
    fetchThisUser() {
      axios
        .get(`http://localhost:8080/api/profil/all/${this.id}`, {
          headers: {
            "x-access-token": this.jwt
          }
        })
        .then((response) => (this.user = response.data))
        .then((response) => console.log(response));
    },

    deleteUser(_id) {
      axios
        .delete(`http://localhost:8080/api/profil/all/${_id}`, {
          headers: {
            "x-access-token": this.jwt
          },
        })
        .then((response) => {
          const idx = this.users.findIndex((g) => g._id === _id);
          this.users.splice(idx, 1);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
})
