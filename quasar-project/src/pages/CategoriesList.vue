<template>
  <q-page>
    <q-card
      class="q-pa-xl q-ma-xl"
      v-for="category in notestore.getCategories"
      v-bind:key="category"
    >
      <q-item>
        {{ category.name }}
      </q-item>
      <router-link :to="`/categories/${category.id}`">
        <q-btn class="btn" color="primary">
          <q-icon name="fullscreen" />
        </q-btn>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>
import { useNoteStore } from "stores/notes";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CategoriesList",
  data() {
    const notestore = useNoteStore();
    return {
      categories: [],
      category: {},
      notestore
    };
  }
});
</script>