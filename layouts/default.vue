<template>
  <v-app>
    <v-app-bar flat color="#2C1037" app>
      <v-container class="pa-0 fill-height">

        <v-btn v-if="loggedIn" to="/" text plain style="text-transform: none;">
          <v-toolbar-title style="color: white">Best Friend Search</v-toolbar-title>
        </v-btn>

        <v-btn v-else to="/" text plain style="text-transform: none;">
          <v-toolbar-title style="color: white">Login</v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>
        <template v-if="loggedIn">
          <v-btn icon v-if="dogCount > 0" to="/favorites">
            <v-badge color="red accent-4" :content="dogCount" transition="slide-x-transition">
              <v-icon color="white">
                mdi-heart
              </v-icon>
            </v-badge>
          </v-btn>
          <v-icon v-else color="white">
            mdi-heart
          </v-icon>
          <v-btn class="ml-4" @click="lo">Logout</v-btn>
        </template>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: function () {
    return {}
  },
  methods: {
    lo: async function () {
      await this.$store.dispatch('auth/logout')
    },
  },
  computed: {

    loggedIn: function () {
      return this.$store.state.auth.loggedIn;
    },
    dogCount: function () {
      return Object.values(this.$store.state.favorites.saved).filter(v => v).length
    },
  },
}
</script>
