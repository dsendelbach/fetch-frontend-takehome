<template>
  <div>
    <v-layout align-center justify-center>
      <v-card width="600px" flat>
        <v-alert v-if="error" color="error" class="my-2" style="width: 100%">
          <div style="display: flex; justify-content: space-around;">
            <h3 style="color: white">
              Incorrect credentials! Please try again.
            </h3>
          </div>
        </v-alert>
        <v-card-text>
          <v-form>
            <v-text-field filled v-model="name" label="Name" type="text"></v-text-field>
            <v-text-field filled v-model="email" label="Email"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="name.length === 0 || email.length === 0 || !email.includes('@')" width="200px"
            color="yellow darken-2" @click="userLogin">Login</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  middleware: function (context) {
    if (context.store.state.auth.loggedIn)
      context.redirect('/')
  },
  data() {
    return {
      name: '',
      email: '',
      error: false,
    }
  },
  methods: {
    async userLogin() {
      try {
        let ok = await this.$store.dispatch('auth/login', { name: this.name, email: this.email })
        if(!ok) this.error = true;
      } catch (err) {
        this.error = true;
        console.log(err)
      }
    }
  }
}
</script>
