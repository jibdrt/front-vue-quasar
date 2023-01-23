import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    freeusers: [],
    user: {},
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
      if (state.users.length === 0) {
        this.fetchUsers();
      }
      return state.users;
    },
    getUnprotected(state) {
      if (state.freeusers.length === 0) {
        this.fetchUnprotected();
      }
      return state.freeusers;
    },
    getThisUser(state) {
      if (state.user == 0) {
        this.fetchThisUser();
      }
      return state.user;
    },
  },

  actions: {
    login(token) {
      this.jwt = token;
      localStorage.setItem('accessToken', token);
    },
    logout() {
      this.jwt = null;
      localStorage.setItem('accessToken', '');
    },

    fetchThisUser() {
      axios
      .get(process.env.API_URL + '/api/profil/user', {
        headers: {
          "x-access-token": this.jwt,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((error) => {
        console.log(error);
      });
    },

    fetchUsers() {
      axios
        .get(process.env.API_URL + '/api/admin', {
          headers: {
            "x-access-token": this.jwt
          },
        })
        .then((response) => (this.users = response.data))
        .catch((error) => {
          if (error.response.status === 403) {
            console.log("utilisateur simple non autorisé");
          }
        });
    },

    fetchUnprotected() {
      axios
        .get(process.env.API_URL + '/api/allusers')
        .then((response) => (this.freeusers = response.data))
        .then((response) => console.log(response))
        .catch((error) => {
            console.log(error)
        });
    },

    createUser(user) {
      axios
        .post(process.env.API_URL + '/api/auth/signup', user)
        .then((response) => {
          this.users.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },

    changePassword(newPwd) {
      axios
        .patch(process.env.API_URL + '/api/profil/user/changepassword', newPwd, {
          headers: {
            "x-access-token": this.jwt
          },
        }
        )
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
        });
    },

    deleteUser(_id) {
      axios
        .delete(process.env.API_URL + `/api/profil/all/${_id}`, {
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
