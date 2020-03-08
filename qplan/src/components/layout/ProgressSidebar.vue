<template>
  <v-navigation-drawer app width="300" clipped v-model="progressSidebar">
    <div class="headline mb-2">
      Credit Progress
      <v-icon color="black" class="mb-1">mdi-progress-check</v-icon>
    </div>

    <div class="subtitle-1">
      <b>Total Credits</b>
    </div>
    <ProgressBar />

    <v-divider class="mb-2 mt-3"></v-divider>

    <v-row class="mx-0">
      <b>Accreditation Units (AUs)</b>
    </v-row>

    <ProgressBar />

    <v-divider class="mb-2 mt-3"></v-divider>

    <v-row class="mx-0">
      <b>Additional Requirements</b>
    </v-row>

    <ProgressBar />

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

export default {
  name: "ProgressSidebar",
  components: { ProgressBar },
  data() {
    return {};
  },
  computed: {
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