<template>
  <div>
    <q-card class="q-ma-md q-pa-md">
      <q-form>
        <q-input v-model="currentPassword" label="currentPassword" />
        <q-input v-model="newPassword" label="newPassword" />
        <q-input v-model="confirmNewPassword" label="confirmNewPassword" />
        <q-btn @click="changePassword()">Changer</q-btn>
      </q-form>
    </q-card>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "ChangePassword",
  data() {
    const store = useAuthStore();
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      store,
    };
  },
  methods: {
    changePassword() {
      this.store.changePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword,
      });
    },
  },
});
</script>