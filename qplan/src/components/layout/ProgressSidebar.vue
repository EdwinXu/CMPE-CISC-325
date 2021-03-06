<template>
  <v-navigation-drawer app width="300" clipped v-model="progressSidebar" class="ma-1 pr-1">
    <div class="headline mb-2">
      Credit Progress
      <v-icon color="black" class="mb-1">mdi-progress-check</v-icon>
    </div>

    <div style="text-align: center;">
      <b>Legend</b>
    </div>
    <v-row class="mt-n3">
      <v-col>
        <v-card rounded>
          <v-progress-linear height="25" value="100" striped color="indigo lighten-3">
            <span>Completed</span>
          </v-progress-linear>
        </v-card>
      </v-col>
      <v-col>
        <v-card rounded>
          <v-progress-linear buffer-value="100" height="25" striped color="indigo lighten-3">
            <span>Planned</span>
          </v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mb-2"></v-divider>

    <div class="subtitle-1">
      <b>Total Credits</b>
    </div>
    <ProgressBar
      :properties="Array('credits')"
      type="Credits"
      :requirement="graduationRequirements['totalCredits']"
    ></ProgressBar>
    <v-divider class="mb-2 mt-3"></v-divider>

    <v-row class="mx-0">
      <b>Accreditation Units (AUs)</b>
      <v-spacer />
      <v-btn icon small @click="showAccreditationUnits = !showAccreditationUnits">
        <v-icon v-if="showAccreditationUnits">mdi-chevron-up</v-icon>
        <v-icon v-else>mdi-chevron-down</v-icon>
      </v-btn>
    </v-row>

    <v-expand-transition>
      <div v-show="showAccreditationUnits">
        <div
          v-for="requirement in graduationRequirements['auBaseRequirements']"
          v-bind:key="requirement.name"
        >
          <div class="subtitle-1">{{ requirement.name }}</div>
          <ProgressBar
            :properties="requirement.aus"
            propertyType="accreditationUnits"
            :requirement="requirement.value"
            :type="requirement.type"
          ></ProgressBar>
        </div>
        <div
          v-for="requirement in graduationRequirements['auCombinedRequirements']"
          v-bind:key="requirement.name"
        >
          <div class="subtitle-1">{{ requirement.name }}</div>
          <ProgressBar
            :properties="requirement.aus"
            propertyType="accreditationUnits"
            :requirement="requirement.value"
            :type="requirement.type"
          ></ProgressBar>
        </div>
      </div>
    </v-expand-transition>

    <v-divider class="mb-2 mt-3"></v-divider>

    <v-row class="mx-0">
      <b>Additional Requirements</b>
      <v-spacer />
      <v-btn icon small @click="showAdditionalRequirements = !showAdditionalRequirements">
        <v-icon v-if="showAdditionalRequirements">mdi-chevron-up</v-icon>
        <v-icon v-else>mdi-chevron-down</v-icon>
      </v-btn>
    </v-row>

    <v-expand-transition>
      <div v-show="showAdditionalRequirements">
        <div
          v-for="requirement in graduationRequirements['additionalRequirements']"
          v-bind:key="requirement.name"
        >
          <div class="subtitle-1">{{ requirement.name }}</div>
          <ProgressBar
            :properties="requirement.labels"
            propertyType="labels"
            :type="requirement.type"
            :requirement="requirement.value"
          ></ProgressBar>
        </div>
      </div>
    </v-expand-transition>

    <div class="pt-3 mb-4 mx-1">
      <v-btn rounded block color="indigo lighten-1">
        <router-link to="/progress">
          Detailed Progress
          <v-icon>mdi-progress-check</v-icon>
        </router-link>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ProgressBar from "../ProgressBar.vue";
import { mapState } from "vuex";

export default {
  name: "ProgressSidebar",
  components: { ProgressBar },
  data() {
    return {
      showAccreditationUnits: true,
      showAdditionalRequirements: true
    };
  },
  computed: {
    ...mapState(["graduationRequirements"]),
    progressSidebar: {
      get() {
        return this.$store.getters.showProgressSidebar;
      },
      set(value) {
        return this.$store.commit("updateProgressSidebar", value);
      }
    }
  }
};
</script>

<style>
</style>