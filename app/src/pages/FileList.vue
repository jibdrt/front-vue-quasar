<template>
  <q-page class="row">
    <div
      style="width: 100px; height: 120px; border: 2px red solid; margin: 8px"
      v-for="file in files"
      :key="file"
    >
      <q-btn @click="downloadWithAxios(file._id)">DOWNLOAD</q-btn>
      {{ file.name }}
    </div>

    <div class="q-pa-md">
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

export default defineComponent({
  name: "FileList",

  data() {
    return {
      files: [],
      file: {
        name: "",
      },
    };
  },

  methods: {
    upload() {
      return new Promise((resolve) => {
        // Take JWT token from store
        const token = localStorage.getItem("accessToken");
        resolve({
          url: "http://localhost:8080/api/files",
          method: "POST",
          headers: [{ name: "x-access-token", value: `${token}` }],
        });
      });
    },

    uploaded(info) {
      console.log(JSON.parse(info.xhr.response));
      this.files.push(JSON.parse(info.xhr.response));
    },

    forceFileDownload(response, id) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", id);
      document.body.appendChild(link);
      link.click();
    },
    downloadWithAxios(id) {
      axios({
        method: "get",
        url: "http://localhost:8080/api/files/" + id,
        responseType: "arraybuffer",
      })
        .then((response) => {
          const idx = this.files.findIndex((g) => g.id === id);
          this.forceFileDownload(response, this.files[8].name);
        })
        .catch(() => console.log("error"));
    },
  },

  mounted() {
    axios
      .get("http://localhost:8080/api/files")
      .then((response) => (this.files = response.data))
      .then((response) => console.log(response));
  },
});
</script>

<style>
</style>