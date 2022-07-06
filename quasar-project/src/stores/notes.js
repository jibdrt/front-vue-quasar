import { defineStore } from 'pinia';
import axios from "axios";

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: []
    }),

    getters: {
        getNotes(state){
            if (state.notes.length == 0){
                this.fetchNotes();
            }
            return state.notes;
        }
    },

    actions: {
        fetchNotes() {
            axios
                .get("http://localhost:8080/api/notes")
                .then(response => this.notes = response.data["hydra:member"])
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
        deleteNote(id){
            axios.delete("http://localhost:8080/api/notes/" + id).then(() => {
                const idx = this.notes.findIndex((g) => g.id === id);
                this.notes.splice(idx, 1);
                });
        }
    }
})
