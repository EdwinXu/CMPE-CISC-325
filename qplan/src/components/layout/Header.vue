<template>
  <v-app-bar app clipped-left clipped-right color="indigo lighten-1">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleProgressSidebar" />
    <span class="title mr-5">
      <v-btn x-large text rounded>
        <h2>
          <router-link to="/" class="black--text" style="text-decoration: none;"> QPlan</router-link>
        </h2>
      </v-btn>
    </span>
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