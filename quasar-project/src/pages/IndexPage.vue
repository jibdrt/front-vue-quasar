<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="username"
            label="username"
          />
          <q-input
            square
            filled
            clearable
            v-model="password"
            type="password"
            label="password"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          @click="login()"
          color="light-blue"
          size="lg"
          class="full-width"
          label="Login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';


export default defineComponent({
  name: "IndexPage",
  data() {

    return {
      username: '',
      password: ''
    };
  },

  methods: {
    login() {
      axios
        .post("http://localhost:8080/api/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.token);
          console.log(response.data); 
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>





<!--  <q-item>
      {{ $data.date1 }}<br>{{ $data.date2 }}
    </q-item><br>
     <q-card>

      <q-btn label="Deadline" color="primary">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date1">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>

      </q-btn>

      <q-btn label="Deadline" color="primary">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date2" @click="dueDate()">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>

      </q-btn>

      <div id="deadline">

      </div>

    </q-card> 


     methods: {
    dueDate() {
      let date1 = this.date1;
      let date2 = this.date2;
      let obj1 = new Date(date1);
      let obj2 = new Date(date2);

      let diffDays = (obj2 - obj1) / (1000 * 60 * 60 * 24);

      document.getElementById("deadline").innerHTML +=
        diffDays + " jours restants";
    },
  },
  


      return {
      date1: "",
      date2: "",
    };
  
  
  -->