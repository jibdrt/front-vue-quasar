<template>

<div>

    <q-card v-for="user in users" class="card flex q-pa-xl" :key="user
    ">

        <q-item>
            {{ user.username }}
        </q-item>
        <q-item>
            {{ user.firstname }}
        </q-item>
        <q-item>
            {{ user.lastname }}
        </q-item>
        <q-item>
            {{ user.email }}
        </q-item>
        <q-item>
            {{ user.phone }}
        </q-item>

    </q-card>

</div>

</template>



<script>



import { defineComponent } from 'vue'
import axios from 'axios'


export default defineComponent({
    name: "UserList",

    mounted() {
        axios.get("http://localhost:8080/api/me")
            .then((response) => (this.users = response.data["hydra:member"]))
            .then(response => console.log(response));
    },

    data() {
        return {
            users: [],
            user: "",
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            color: ""
        }
    }
})



</script>