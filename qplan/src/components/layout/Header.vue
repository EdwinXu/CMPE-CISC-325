<template>
  <v-app-bar app clipped-left clipped-right color="indigo lighten-1">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleProgressSidebar" />QPlan
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleProgressSidebar() {
      this.$store.commit(
        "updateProgressSidebar",
        !this.$store.getters.showProgressSidebar
      );
    }
  }
};
</script>

<style scoped>
</style>