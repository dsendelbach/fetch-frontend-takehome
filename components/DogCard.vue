<template>
  <v-card @click="$router.push(`/dog/${dog.id}`)">
    <v-img :src="dog.img" height="200px">
    </v-img>
    <v-card-title>
      {{ dog.name }}
      <v-spacer></v-spacer>
      Age: {{ dog.age }}
    </v-card-title>

    <v-card-subtitle>{{ dog.breed }}</v-card-subtitle>
    <v-card-actions>

      {{ dog.zip_code }}
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="saveDog" :color="dogSaved ? 'success' : ''">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click.stop="copy">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>


  </v-card>
</template>
<script>
export default {
  name: "DogCard",
  props: ['dog'],
  computed: {
    dogSaved: function () {
      return this.$store.state.favorites.saved[this.dog.id]
    },
  },
  methods: {
    copy: function () {
      navigator.clipboard.writeText(window.location.origin + `/dog/${this.dog.id}`);
    },
    saveDog() {
      this.$store.commit('favorites/toggleSaved', this.dog.id)
    },
  }
}
</script>
