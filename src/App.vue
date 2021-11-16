<template>
  <v-app>
    <v-main class="pattern-background primary darken-3">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col>
            <v-card>
              <!-- Pic of the day from the NASA API -->
              <awesome-astrology />
              <v-card-title class="d-flex justify-space-between"
                >Near Earth Asteroid Approaches
                <!-- This switch hooks into the theme and allows easy toggle -->
                <v-switch label="Dark Mode" v-model="$vuetify.theme.dark" />
              </v-card-title>
              <!-- Search form handles date logic -->
              <search-form v-model="searchForm" :loading="asteroidsLoading" />
              <!-- Asteroids table formats data -->
              <asteroid-table
                :asteroids="asteroids"
                :loading="asteroidsLoading"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AsteroidTable from "./components/AsteroidTable";
import SearchForm from "./components/SearchForm";
import { DateTime } from "luxon";
import AwesomeAstrology from "./components/AwesomeAstrology";

export default {
  name: "App",
  components: { AwesomeAstrology, AsteroidTable, SearchForm },
  data: () => ({
    searchForm: {
      start_date: undefined,
      end_date: undefined,
    },
    asteroidsLoading: true,
    asteroids: {},
  }),
  created() {
    // Check what user theme preference is
    this.initDarkMode();
  },
  mounted() {
    // Set the dates based on current date
    const now = DateTime.now().startOf("day");
    this.searchForm.start_date = now.minus({ days: 7 }).toSQLDate();
    this.searchForm.end_date = now.toSQLDate();

    // Retrieve default date range asteroids
    this.getAsteroids();
  },
  watch: {
    searchForm: { deep: true, handler: "getAsteroids" },
  },
  methods: {
    initDarkMode() {
      const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      darkMediaQuery.addEventListener("change", () => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      });

      if (darkMediaQuery.matches) {
        // need to set 0 sec timeout to set the dark mode after mounted event
        setTimeout(() => (this.$vuetify.theme.dark = true), 0);
      }
    },
    async getAsteroids() {
      this.asteroidsLoading = true;

      // Request asteroid data
      const { data } = await this.$axios.get("/neo/rest/v1/feed", {
        params: this.searchForm,
      });

      this.asteroids = data.near_earth_objects;
      this.asteroidsLoading = false;
    },
  },
};
</script>

<style scoped>
.pattern-background {
  background-repeat: repeat;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238ce5d1' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
