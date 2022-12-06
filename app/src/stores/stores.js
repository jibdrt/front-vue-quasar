import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    user: [],
    roles: [],
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
      if (state.user.length == 0) {
        this.fetchThisUser();
      }
      return state.user;
    },
    getRoles(state) {
      if (state.roles.length == 0) {
        this.fetchRoles();
      }
      return state.roles;
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

    fetchParticipants() {
      axios
        .get("http://localhost:8080/api/profil/all")
        .then((response) => (this.users = response.data))
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    },

    fetchRoles() {
      axios
        .get('http://localhost:8080/api/getroles')
        .then((response) => (this.roles = response.data))
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
        });
    },

    fetchUsers() {
      axios
        .get("http://localhost:8080/api/admin", {
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
        .get('http://localhost:8080/api/profil/user', {
          headers: {
            "x-access-token": this.jwt
          }
        })
        .then((response) => (this.user = response.data))
        .then((response) => response)
        .catch((error) => {
          console.log(error);
        })
    },

    createUser(user) {
      axios
        .post('http://localhost:8080/api/auth/signup', user)
        .then((response) => {
          this.users.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },

    changePassword(newPwd) {
      axios
        .patch('http://localhost:8080/api/profil/user/changepassword', newPwd, {
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
