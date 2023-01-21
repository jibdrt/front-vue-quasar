import { defineStore } from 'pinia';
import axios from "axios";
import { LocalStorage } from 'quasar';

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [],
        jwt: LocalStorage.getItem('accessToken')
    }),

    getters: {

        getNotes(state) {
            if (state.notes === 0) {
                this.fetchNotes();
            }
            return state.notes;
        },

    },

    actions: {
        fetchNotes() {
            axios
                .get(process.env.API_URL + '/api/notes')
                .then(response => this.notes = response.data)
                .then((response) => console.log(response));
        },
        createNote(note) {
            axios
                .post(process.env.API_URL + '/api/notes', note, {
                    headers: {
                        'x-access-token': this.jwt
                    }
                })
                .then((response) => {
                    this.notes.push(response.data);
                    console.log("new note pushed");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteNote(_id) {
            axios
                .delete(process.env.API_URL + `/api/notes/${_id}`, {
                    headers: {
                        "x-access-token": this.store.jwt
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
