<template>
  <v-row>
    <v-progress-linear indeterminate color="yellow darken-2" v-if="!loaded"></v-progress-linear>
    <h3 v-if="dogs.length === 0 && loaded" class="my-2">No Friends Added Yet.</h3>
    <v-alert v-if="dogs.length !== 0" color="yellow darken-2" class="my-2" style="width: 100%">
      <div style="display: flex; justify-content: space-around;">
        <h3>
          Our patented technology allows us to match you with a dog that is best for you.
        </h3>
        <v-btn text @click="generateMatch">Generate Match</v-btn>
      </div>
    </v-alert>
    <v-col v-for="dog in dogs" :key="dog.id" cols="12" sm="6" md="4" lg="3">
      <DogCard :dog="dog" />
    </v-col>
  </v-row>
</template>
<script>
import { getDogs, generateMatch } from '/api/dogs.js'
export default {
  data: function () {
    return {
      loaded: false,
      dogs: []
    }
  },
  methods: {
    generateMatch: async function () {
      let ids = Object.keys(this.$store.state.favorites.saved)
      let {match} = await generateMatch(ids)
      this.$router.push(`dog/${match}?match=true`)
    },
  },
  mounted: async function () {
    let ids = Object.keys(this.$store.state.favorites.saved)
    this.dogs = await getDogs({ resultIds: ids })
    this.loaded = true;
  },
}
</script>
<style>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
