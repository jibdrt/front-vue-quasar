import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
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
      const token = this.jwt;
      axios
        .get("http://localhost:8080/api/profil/admin", {
          headers: { "x-access-token": `${token}` },
        })
        .then((response) => (this.users = response.data))
        .then((response) => response)
        .catch((error) => {
          if (error.response.status === 403) {
            console.log("utilisateur simple non autorisé");
          }
        });
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
