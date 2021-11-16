<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="formattedAsteroids"
      :loading="loading"
      :expanded.sync="expanded"
      sort-by="approachDate"
      sort-desc
      show-expand
      single-expand
    >
      <!-- Format date in the template so that the sorting still works correctly -->
      <template #item.approachDate="{ item }">
        {{ item.approachDate | formatDate }}
      </template>
      <template #item.name="{ item }">
        <!-- Originally tried to link to JPL here but the link wasnt a public page -->
        <span>{{ item.name }}</span>
        <!-- Subtle but effective way to bring attention to small detail -->
        <v-tooltip v-if="item.is_potentially_hazardous_asteroid" right>
          <template #activator="{ on, attrs }">
            <v-icon
              v-text="'mdi-alert-circle'"
              color="error darken-1"
              small
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <span>This asteroid is potentially hazardous!</span>
        </v-tooltip>
      </template>
      <!-- Format numbers in the template so that the sorting still works correctly -->
      <template #item.diameter.min="{ item }">
        {{ item.diameter.min | formatNumber }} -
        {{ item.diameter.max | formatNumber }}
      </template>
      <!-- Format numbers in the template so that the sorting still works correctly -->
      <template #item.missedBy="{ item }">
        {{ item.missedBy | formatNumber }}
      </template>
      <!-- Expanded slot JSON -->
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-2">
          <pre
            class="grey rounded pa-2"
            :class="$vuetify.theme.dark ? 'darken-3' : 'lighten-3'"
            style="font-size: 12px"
            >{{ item.originalStructure }}</pre
          >
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { formatDate, formatNumber } from "@/utilities/formatters";

export default {
  name: "AsteroidTable",
  props: {
    asteroids: Object,
    loading: Boolean,
  },
  data: () => ({
    expanded: [],
    // Table formatting info
    headers: [
      {
        text: "Approach Date",
        value: "approachDate",
      },
      { text: "Name", value: "name" },
      { text: "Magnitude", value: "absolute_magnitude_h" },
      {
        text: "Diameter (Feet)",
        value: "diameter.min",
      },
      {
        text: "Missed By (Miles)",
        value: "missedBy",
      },
      { text: "", value: "data-table-expand" },
    ],
  }),
  computed: {
    // Flatted and format the API data so the table can use it
    formattedAsteroids() {
      return Object.entries(this.asteroids)
        .map(([key, daysAsteroids]) => {
          return daysAsteroids.map((asteroid, index) => ({
            ...asteroid,
            approachDate:
              asteroid.close_approach_data[0].epoch_date_close_approach,
            diameter: {
              min: asteroid.estimated_diameter.feet.estimated_diameter_min,
              max: asteroid.estimated_diameter.feet.estimated_diameter_max,
            },
            missedBy: asteroid.close_approach_data[0].miss_distance.miles,
            originalStructure: this.asteroids[key][index],
          }));
        })
        .flat();
    },
  },
  filters: {
    formatDate,
    formatNumber,
  },
};
</script>

<style scoped></style>
