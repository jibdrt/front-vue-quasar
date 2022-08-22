


<template>
<div>
    <q-btn @click="$router.go(-1)">BACK</q-btn>

    <h2>category detail</h2>
<!--     <q-card> 
      id : {{ category.id }}<br>
      name : {{ category.name }}<br>
      color : {{ category.color }}<br>
      notes in this category : {{ category.notes }}
    </q-card> -->

    <q-card class="q-ma-xl">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{category.name}}</div>
        <div class="text-subtitle2">{{category.color}}</div>
        <div class="text-subtitle2">{{category.notes }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Voir les notes</q-btn>
      </q-card-actions>
    </q-card>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "CategoryDetail",

  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(`http://localhost:8080/api/categories/${this.id}`)
      .then((response) => (this.category = response.data))
      .then((response) => console.log(response));
  },

  data() {

    return {
      category: {},
      id: "",

    };
  },
};
</script>