<template>
  <div>
    PUT TOTAL CREDITS BAR HERE
    <v-toolbar dense class="mt-2 mb-n1">
      <v-spacer />
      <v-toolbar-title>Accreditation Units (AUs)</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="requirement in auBaseRequirements"
        :key="requirement.name"
      >{{ requirement.name }}</v-expansion-panel>
    </v-expansion-panels>

    <v-toolbar dense class="mt-2 mb-n1">
      <v-spacer />
      <v-toolbar-title>Additional Requirements</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="requirement in additionalRequirements"
        v-bind:key="requirement.name"
      >{{ requirement.name }}</v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Progress",
  computed: {
    ...mapState(["graduationRequirements"]),
    auBaseRequirements: function() {
      return this.graduationRequirements["auBaseRequirements"];
    },
    additionalRequirements: function() {
      return this.graduationRequirements["additionalRequirements"];
    }
  }
};
</script>

<style>
</style>