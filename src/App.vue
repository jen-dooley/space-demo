<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col>
            <v-card>
              <v-card-title>Near Earth Asteroid Approaches</v-card-title>
              <search-form v-model="searchForm" :loading="asteroidsLoading" />
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

export default {
  name: "App",
  components: { AsteroidTable, SearchForm },
  data: () => ({
    searchForm: {
      start_date: undefined,
      end_date: undefined,
    },
    asteroidsLoading: true,
    asteroids: {},
  }),
  mounted() {
    const now = DateTime.now().startOf("day");
    this.searchForm.start_date = now.minus({ days: 7 }).toSQLDate();
    this.searchForm.end_date = now.toSQLDate();

    this.getAsteroids();
  },
  watch: {
    searchForm: { deep: true, handler: "getAsteroids" },
  },
  methods: {
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
