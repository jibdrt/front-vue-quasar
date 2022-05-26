<template>

<q-page>


<q-form
      @reset="onReset"
      class="q-gutter-md q-pa-md"
    >
      <q-input
        filled
        v-model="utilisateur"
        label="Utilisateur"
      />
      <q-input
        filled
        v-model="calendrier"
        label="calendrier"
      />
    <q-btn icon="event" round color="primary">
      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
        <q-date v-model="date">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>


    </q-btn>
      <q-input
        filled
        v-model="objet"
        label="objet"
      />
      <q-input
        filled
        v-model="detail"
        label="detail"
      />

      <div>
        <q-btn v-on:click="createRdv();" label="Add new" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>


      <q-card v-for="rdv in rdvs" v-bind:key="rdv" class="card flex q-pa-xl">

        <q-item-section>
        <q-item>
        {{ rdv.date }}
        </q-item>
        <q-item>
        {{ rdv.objet }}
        </q-item>
        </q-item-section>


        <q-btn class="btn" color="primary" glossy>
                <q-icon name="check" />
        </q-btn>
        <q-btn class="btn" color="deep-orange" glossy>
                <q-icon name="delete" />
        </q-btn>
      </q-card>

</q-page>

</template>


<style lang="sass" scoped>

.card
    display:flex
    height: 192px
  
ul
    list-style: none

.btn
  padding: 1px
  margin: 2px
  height: 24px


</style>


<script>

import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent ({
    name: 'RdvList',

            mounted() {
            axios.get('http://localhost:8080/api/r_d_vs')
            .then((response) => (this.rdvs = response.data['hydra:member']))
            .then(response => console.log(response));
            },

    data() {
        
        return {
          rdvs: [],
          rdv: "",
          utilisateur: "",
          calendrier: "",
          date: "",
          objet: "",
          detail: ""
        }
    },

        methods: {
                createRdv(){
                axios
                .post('http://localhost:8080/api/r_d_vs', {
                    utilisateur: [this.utilisateur],
                    calendrier: this.calendrier,
                    date: this.date,
                    objet: this.objet,
                    detail: this.detail
                })
                    .then((response) => {
                    this.rdvs.push(response.data)
                    })

                    .catch((error) => {
                    console.log(error);
                    });
                },

                onReset () {
                    this.utilisateur = ""
                    this.calendrier = ""
                    this.date = ""
                    this.objet = ""
                    this.detail = ""
                }

            }



})
</script>
