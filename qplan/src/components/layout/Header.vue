<template>
  <v-app-bar app clipped-left clipped-right color="indigo lighten-1">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleProgressSidebar" />
    <span class="title mr-5">
      <v-btn x-large text rounded>
        <h2>
          <router-link to="/">QPlan</router-link>
        </h2>
      </v-btn>
    </span>

    <v-spacer />

    <v-autocomplete
      label="Search courses"
      ref="searchBar"
      :items="allSearchOptions"
      rounded
      flat
      hide-details
      append-icon="search"
      clearable
      solo-inverted
      hide-no-data
      hint="Search by courses code or name"
      @input="searchCourses($event)"
      @keyup.enter="searchCourses($event.target.value)"
      @click:append="searchCourses($event.target.value)"
    ></v-autocomplete>

    <router-link to="/search">
      <v-btn outlined rounded large class="ma-2">Browse</v-btn>
    </router-link>

    <v-spacer />

    <template>
      <v-dialog>
        <template v-slot:activator="{ on: dialog }">
          <v-tooltip bottom nudge-bottom="-2" open-delay="300">
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...dialog }">
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
            </template>
            <span>Class Schedule</span>
          </v-tooltip>
        </template>
        <CourseCalendar></CourseCalendar>
      </v-dialog>
    </template>

    <v-divider vertical inset />

    <v-btn large icon class="mr-n2">
      <router-link to="/">
        <v-icon color="blue-grey darken-4">mdi-home</v-icon>
      </router-link>
    </v-btn>

    <v-btn icon large>
      <router-link to="/progress">
        <v-icon color="blue-grey darken-4">mdi-progress-check</v-icon>
      </router-link>
    </v-btn>

    <v-divider vertical inset />

    <v-btn large icon>
      <v-icon color="blue-grey darken-4">mdi-account-settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import CourseCalendar from "@/components/courses/CourseCalendar";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    CourseCalendar
  },
  methods: {
    toggleProgressSidebar() {
      this.$store.commit(
        "updateProgressSidebar",
        !this.$store.getters.showProgressSidebar
      );
    },
    searchCourses: function(searchQuery) {
      if (searchQuery !== undefined) {
        this.$refs.searchBar.blur();
        this.$router.push({
          path: "/search",
          query: { query: searchQuery }
        });
      }
    }
  },
  computed: {
    ...mapGetters(["allSearchOptions"])
  }
};
</script>

<style scoped>
</style>