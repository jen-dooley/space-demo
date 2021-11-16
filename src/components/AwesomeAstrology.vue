<template>
  <v-hover v-if="!!picOfTheDay" v-slot="{ hover }">
    <v-img
      :lazy-src="picOfTheDay.url"
      :src="picOfTheDay.hdurl"
      :alt="`${picOfTheDay.title} - ${picOfTheDay.copyright}`"
      :aspect-ratio="3"
      class="d-flex align-end"
    >
      <v-expand-transition>
        <v-card v-if="hover" tile class="v-card--reveal" style="opacity: 75%">
          <v-card-title>
            {{ picOfTheDay.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ picOfTheDay.copyright }}
          </v-card-subtitle>
          <v-card-text>
            {{ picOfTheDay.explanation }}
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </v-img>
  </v-hover>
</template>

<script>
export default {
  name: "AwesomeAstrology",
  data: () => ({
    picOfTheDay: undefined,
  }),
  mounted() {
    this.getAwesomeAstrology();
  },
  methods: {
    async getAwesomeAstrology() {
      const { data } = await this.$axios.get("/planetary/apod");
      this.picOfTheDay = data;
    },
  },
};
</script>
