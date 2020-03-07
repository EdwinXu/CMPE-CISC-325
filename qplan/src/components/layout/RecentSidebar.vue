<template>
  <v-navigation-drawer app right width="300" clipped v-model="recentSidebar">Put recent stuff here</v-navigation-drawer>
</template>

<script>
export default {
  name: "RecentSidebar",
  data() {
    return {
      recentSidebar: null,
    };
  },
};
</script>

<style>
</style>