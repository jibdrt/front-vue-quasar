import { defineStore } from 'pinia';
import axios from "axios";

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [],
        categories: []
    }),

    getters: {

        getNotes(state) {
            if (state.notes.length == 0) {
                this.fetchNotes();
            }
            return state.notes;
        },

        getCategories(state) {
            if (state.categories.length == 0) {
                this.fetchCategories();
            }
            return state.categories;
        }
    },

    actions: {
        fetchNotes() {
            axios
                .get("http://localhost:8080/api/notes")
                .then(response => this.notes = response.data)
                .then((response) => console.log(response));
        },
        fetchCategories() {
            axios
                .get("http://localhost:8080/api/categories")
                .then(response => this.categories = response.data)
                .then((response) => console.log(response));
        },
        createNote(note) {
            axios
                .post("http://localhost:8080/api/notes", note)
                .then((response) => {
                    this.notes.push(response.data);
                    console.log("pushed");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
/*         createCategory(category) {
            axios
                .post("http://localhost:8080/api/categories", category)
                .then((response) => {
                    this.categories.push(response.data);
                    console.log("pushed");
                })
                .catch((error) => {
                    console.log(error);
                });
        }, */
        deleteNote(id) {
            axios.delete("http://localhost:8080/api/notes/:id").then(() => {
                const idx = this.notes.findIndex((g) => g.id === id);
                this.notes.splice(idx, 1);
            });
        }
    }
})
