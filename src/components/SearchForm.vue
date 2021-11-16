<template>
  <v-form :disabled="loading" class="px-4 mb-6">
    <v-row dense align="baseline">
      <v-col cols="6" sm="4">
        <date-input
          label="Start Date"
          v-model="searchForm.start_date"
          :min="minDate"
          :max="searchForm.end_date"
        />
      </v-col>
      <v-col cols="6" sm="4">
        <date-input
          label="End Date"
          v-model="searchForm.end_date"
          :min="searchForm.start_date"
          :max="maxDate"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import DateInput from "./DateInput";
import { DateTime } from "luxon";

export default {
  name: "SearchForm",
  components: {
    DateInput,
  },
  props: {
    value: Object,
    loading: Boolean,
  },
  computed: {
    searchForm: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    // Instead of using validation just prevent the user from selecting the wrong dates
    minDate() {
      return this.searchForm.end_date
        ? DateTime.fromSQL(this.searchForm.end_date)
            .minus({ days: 7 })
            .toFormat("yyyy-MM-dd")
        : undefined;
    },
    maxDate() {
      return this.searchForm.start_date
        ? DateTime.fromSQL(this.searchForm.start_date)
            .plus({ days: 7 })
            .toFormat("yyyy-MM-dd")
        : undefined;
    },
  },
};
</script>

<style scoped></style>
