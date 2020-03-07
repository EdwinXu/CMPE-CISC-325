<template>
  <v-navigation-drawer app right width="300" clipped v-model="recentSidebar">
    <span class="headline ml-1">Recent Courses</span>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RecentSidebar",
  data() {
    return {
      recentSidebar: null
    };
  }
};
</script>

<style>
</style>