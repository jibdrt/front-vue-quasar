<template>

  <q-page class="row">
    <div
      class="file-card"
      v-for="(file, idx) in files"
      :key="idx"
      @click="downloadWithAxios(file._id)"
    >
      <img
        class="file-img"
        :src="'http://localhost:8080/api/files/' + file._id"
      />

    </div>

    <div class="uploader-container q-pa-md absolute">
      <div class="q-gutter-sm row items-start">
        <q-uploader
          url="http://localhost:8080/api/files"
          label="Déposer un fichier"
          multiple
          :factory="upload"
          @uploaded="uploaded"
          style="max-width: 300px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useAuthStore } from "stores/stores";

export default defineComponent({
  name: "FileList",

  data() {
    const store = useAuthStore();
    return {
      files: [],
      file: {
        name: "",
      },
      store,
    };
  },

  methods: {
    upload() {
      return new Promise((resolve) => {
        // Take JWT token from store
        const token = localStorage.getItem("accessToken");
        resolve({
          url: process.env.API_URL + "/api/files",
          method: "POST",
          headers: [{ name: "x-access-token", value: `${token}` }],
        });
      });
    },

    uploaded(info) {
      console.log(JSON.parse(info.xhr.response));
      this.files.push(JSON.parse(info.xhr.response));
    },

    downloadWithAxios(id) {
      /* const idx = this.files.findIndex((g) => g.id === id); */
      axios({
        method: "get",
        url: process.env.API_URL + "/api/files/" + id,
        responseType: "blob",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;

          fileLink.setAttribute("download", this.files[1].name);

          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    axios
      .get(process.env.API_URL + "/api/files", {
        headers: {
          "x-access-token": this.store.jwt,
        },
      })
      .then((response) => (this.files = response.data))
      .then((response) => console.log(response));
  },
});
</script>

<style scoped>
.file-img {
  width: auto;
  height: auto;
  border: 1px blue solid;
  margin: 16px;
  width: 90px;
  height: 90px;
}
.file-card {
  cursor: pointer;
  width: 120px;
  height: 120px;
}
.uploader-container {
  bottom: 0px;
}
</style>