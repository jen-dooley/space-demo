<template>
  <v-menu
    :id="id"
    :ref="id"
    v-model="menuOpen"
    transition="scale-transition"
    :close-on-content-click="!showButtons"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :value="formattedValue"
        @input="updateValue"
        readonly
        hide-details
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
      :value="value"
      @input="updateValue"
      no-title
      scrollable
      :min="min"
      :max="max"
      :readonly="readOnly"
    />
  </v-menu>
</template>

<script>
import { formatDate } from "../utilities/formatters";

export default {
  name: "DateInput",
  props: {
    value: { type: [String, Date], default: null }, // v-model
    id: {
      type: String,
      default: "dateInput",
    },
    label: {
      type: String,
    },
    showButtons: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    min: String,
    max: String,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    formattedValue() {
      if (this.value) {
        return formatDate(this.value, { inputFormat: "fromSQL" });
      }
      return undefined;
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped></style>
