<template>
  <div>
    <v-card class="mb-2" rounded>
      <v-progress-linear
        :buffer-value="plannedPercent"
        height="25"
        :value="completePercent"
        striped
        color="indigo lighten-3"
      >
        <span
          v-if="!hideValue"
        >{{ Math.round((valuePlanned + valueComplete) * 10) / 10 }} / {{ requirement }} {{ type }}</span>
      </v-progress-linear>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    properties: Array,
    propertyType: String,
    requirement: Number,
    type: String,
    hideValue: Boolean,
    color: String
  },
  computed: {
    plannedPercent: function() {
      return (
        (this.valuePlanned / this.requirement) * 100 +
        (this.valueComplete / this.requirement) * 100
      );
    },
    completePercent: function() {
      return (this.valueComplete / this.requirement) * 100;
    },
    valueComplete: function() {
      return this.$store.getters.sumCompletedProperties(
        this.propertyType,
        this.properties
      );
    },
    valuePlanned: function() {
      return (
        this.$store.getters.sumInProgressProperties(
          this.propertyType,
          this.properties
        ) +
        this.$store.getters.sumSavedProperties(
          this.propertyType,
          this.properties
        )
      );
    },
  }
};
</script>


<style>
</style>