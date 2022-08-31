import { defineStore } from 'pinia';
import axios from "axios";
import { LocalStorage } from 'quasar';

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [],
        storedjwt: LocalStorage.getItem('accessToken')
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
        createNote(note) {
            axios
                .post("http://localhost:8080/api/notes", note, {
                    headers: {
                        'x-access-token': this.storedjwt
                    }
                })
                .then((response) => {
                    this.notes.push(response.data);
                    console.log("pushed");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteNote(_id) {
            axios
                .delete(`http://localhost:8080/api/notes/${_id}`, {
                    headers: {
                        "x-access-token": this.storedjwt
                    },
                })
                .then((response) => {
                    const idx = this.notes.findIndex((g) => g._id === _id);
                    this.notes.splice(idx, 1);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
})
