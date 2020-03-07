<template>
  <v-navigation-drawer app width="300" clipped v-model="progressSidebar">
    <div class="headline mb-2">
      Credit Progress
      <v-icon color="black" class="mb-1">mdi-progress-check</v-icon>
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