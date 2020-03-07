<template>
  <v-app-bar app clipped-left clipped-right color="indigo lighten-1">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleProgressSidebar" />
    <span class="title mr-5">
      <v-btn x-large text rounded>
        <h2>
          <router-link to="/" class="black--text" style="text-decoration: none;">QPlan</router-link>
        </h2>
      </v-btn>
    </span>

    <v-spacer />

    <v-autocomplete
      label="Search courses"
      ref="searchBar"
      rounded
      flat
      hide-details
      append-icon="search"
      clearable
      solo-inverted
      hide-no-data
      hint="Search by courses code, name, descriptions and professors "
    ></v-autocomplete>

    <router-link to="/search" style="text-decoration: none;">
      <v-btn outlined rounded large class="ma-2">Browse</v-btn>
    </router-link>

    <v-spacer />

    <v-btn icon>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>

    <v-divider vertical inset />

    <v-btn large  icon class="mr-n2">
      <v-icon color="blue-grey darken-4">mdi-home</v-icon>
    </v-btn>
    <v-btn large  icon>
      <v-icon color="blue-grey darken-4">mdi-progress-check</v-icon>
    </v-btn>

    <v-divider vertical inset />

    <v-btn large icon>
      <v-icon color="blue-grey darken-4">mdi-account-settings</v-icon>
    </v-btn>
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