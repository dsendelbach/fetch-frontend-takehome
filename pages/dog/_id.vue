<template>
  <v-row>

    <v-progress-linear indeterminate color="yellow darken-2" v-if="!loaded"></v-progress-linear>
    <v-alert v-if="$route.query.match === 'true'" color="green darken-2" class="my-2" style="width: 100%">
      <div style="display: flex; justify-content: space-around;">
        <h3 style="color: white">
          Our algorithm determnined that {{dog.name}} is best fit for you!
        </h3>
      </div>
    </v-alert>
    <v-col cols="12" md="6">
      <v-responsive :aspect-ratio="1">
        <v-img :src="dog.img"></v-img>
      </v-responsive>
    </v-col>

    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>{{ dog.name }}</v-card-title>
        <v-card-title>{{ dog.breed }}</v-card-title>
        <v-card-subtitle>Located in: {{ dog.zip_code }}</v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="saveDog" :color="dogSaved ? 'success' : ''">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon @click="copy">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import { getDogs } from '/api/dogs.js'
export default {
  data: function () {
    return {
      dog: {},
      loaded: false,
    }
  },
  methods: {
    copy: function () {
      navigator.clipboard.writeText(window.location.origin + `/dog/${this.dog.id}`);
    },
    saveDog() {
      this.$store.commit('favorites/toggleSaved', this.dog.id)
    },
  },
  computed: {
    dogSaved: function () {
      return this.$store.state.favorites.saved[this.dog.id]
    },
  },
  mounted: async function () {
    this.dog = await getDogs({ resultIds: [this.$route.params.id] })
    this.dog = this.dog[0]
    this.loaded = true;
  },
}
</script>
