<template>
  <q-page class="row">
    <q-card
      class="file-card q-ma-md"
      v-for="(file, idx) in files"
      :key="idx"
      @click="downloadWithAxios(file._id)"
    >
      <img
        class="file-img"
        :src="'http://localhost:8080/api/files/' + file._id"
      />

      <b>{{ file.name }}</b><br><br><br><br>
      index -> {{ idx }}
    </q-card>

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
    downloadWithAxios(id) {
      const idx = this.notes.findIndex((g) => g.id === id);
      axios({
        method: "get",
        url: "http://localhost:8080/api/files/" + id,
        responseType: "blob",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;

          fileLink.setAttribute("download", this.files[idx].name);

          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => console.log(err));
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