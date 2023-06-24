<template>
  <div style="overflow: hidden;">
    <div style="overflow: hidden; height: calc(100vh - 160px)">
      <v-row style="height: 100%">
        <v-col cols="12" md="3">
          <v-card class="mt-2">
            <v-card-title>Sort</v-card-title>
            <v-list color="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Breed
                  </v-list-item-title>
                  <v-select @change="page = 0" dense :items="['Acending', 'Decending']" v-model="sortBreed" filled></v-select>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class="mt-2">
            <v-card-title>Filters</v-card-title>
            <v-list color="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Breed
                  </v-list-item-title>
                  <v-autocomplete @change="page = 0" v-model="breedsSelection" :items="breeds" clearable deletable-chips dense filled
                    multiple rounded small-chips></v-autocomplete>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Age: {{ ageRange[0] + '-' + ageRange[1] }}
                  </v-list-item-title>
                  <v-range-slider @change="page = 0" v-model="ageRange" max="30" min="0"></v-range-slider>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-card>

          <v-card class="mt-2">
            <v-btn text style="width: 100%" @click="reset">Reset Filters</v-btn>
          </v-card>
        </v-col>

        <v-col class="mt-5" cols="12" md="9" style="overflow-y: auto; height: 100%">
          <v-sheet class="mt-2" rounded="lg">
            <v-row>

              <v-progress-linear indeterminate color="yellow darken-2" v-if="!loaded"></v-progress-linear>
              <h1 v-else-if="dogs.length === 0">No Results Found</h1>
              <v-col v-for="dog in dogs" :key="dog.id" cols="12" sm="6" md="4" lg="3">
                <DogCard :dog="dog" />
              </v-col>
            </v-row>
          </v-sheet>

        </v-col>

      </v-row>
    </div>

    <v-row>
      <v-col cols="12" md="3">
      </v-col>
      <v-col class="mt-5" cols="12" md="9">
        <div style="height: 50px; width: 100%; background-color: white;">
          <v-pagination v-model="page" :total-visible="6" :length="pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAllBreeds, getDogs, getDogIds } from '/api/dogs.js'
export default {
  middleware: function (context) {
    if (!context.store.state?.auth?.loggedIn)
      context.redirect('/login')
  },
  name: 'IndexPage',
  beforeMount: function () {
    try {
      if (this.$route.query.ageMin)
        this.ageRange[0] = parseInt(this.$route.query.ageMin)
      if (this.$route.query.ageMax)
        this.ageRange[1] = parseInt(this.$route.query.ageMax)
      if (this.$route.query.sort)
        this.sortBreed = this.$route.query.sort === 'breed:asc' ? 'Acending' : 'Decending'
      if (this.$route.query.breeds?.length > 0)
        this.breedsSelection = this.$route.query.breeds
      if (this.$route.query.from)
        this.page = parseInt(this.$route.query.from) / 25;
    } catch (e) {
      console.log(e)
      console.log("error")
    }
  },
  mounted: async function () {
    try {
      this.breeds = await getAllBreeds();
      this.fetchDogs();
    }
    catch (e) {
      console.log(e)
    }
  },
  data: function () {
    return {
      loaded: false,
      page: 0,
      pageCount: 0,
      sortBreed: 'Acending',
      breeds: [],
      breedsSelection: [],
      ageRange: [0, 100],
      dogs: []
    }
  },
  watch: {
    sortBreed() {
      this.handleFilterDebounce();
    },
    page() {
      this.handleFilterDebounce();
    },
    breedsSelection() {
      this.handleFilterDebounce();
    },
    ageRange() {
      this.handleFilterDebounce();
    },
  },
  methods: {
    reset: function () {
      this.page = 0;
      this.sortBreed = 'Acending';
      this.breedsSelection = [];
      this.ageRange = [0,100];
    },
    handleFilterDebounce: function () {
      if (this.timeout)
        clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fetchDogs();
      }, 100); // delay
    },
    fetchDogs: async function () {
      let query = {
        size: 25,
        ageMin: this.ageRange[0],
        ageMax: this.ageRange[1],
        from: (this.page * 25),
        sort: this.sortBreed === 'Acending' ? 'breed:asc' : 'breed:desc'
      }
      if (this.breedsSelection.length > 0)
        query.breeds = this.breedsSelection
      this.$router.push({ query });
      const { resultIds, next, total } = await getDogIds(query)
      this.dogIds = resultIds;
      this.pageCount = Math.floor(total / 25) - 1;
      this.dogs = await getDogs({ resultIds })
      this.loaded = true;
    },
    logout: async function () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  }
}
</script>
