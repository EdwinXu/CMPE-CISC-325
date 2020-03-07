<template>
  <v-navigation-drawer app width="300" clipped v-model="progressSidebar">
    <div class="headline mb-2">
      Credit Progress
      <v-icon color="black" class="mb-1">mdi-progress-check</v-icon>
    </div>
    PUT PROGRESS BARS HERE
    <div class="mx-1">
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
export default {
  name: "ProgressSidebar",
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