import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: LocalStorage.getItem('accessToken')
  }),

  getters: {
    isconnected(state) {
      return state.jwt != null && state.jwt != "";
    },
    isnotconnected(state) {
      return state.jwt == null | state.jwt == "";
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
    }
  }
})
