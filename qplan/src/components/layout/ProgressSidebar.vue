<template>
  <v-navigation-drawer app width="300" clipped v-model="progressSidebar">Put progress stuff here</v-navigation-drawer>
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