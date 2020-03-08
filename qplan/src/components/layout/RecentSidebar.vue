<template>
  <v-navigation-drawer app right width="300" clipped v-model="recentSidebar">
    <span class="headline ml-1">Recent Courses</span>

    <div v-for="course in recentlyViewedCourses" :key="course.id" class="ma-1">
      <CourseCard :course="course" />
    </div>

  </v-navigation-drawer>
</template>

<script>
import CourseCard from "../courses/CourseCard";
import { mapState } from "vuex";

export default {
  name: "RecentSidebar",
  components: {
    CourseCard
  },
  data() {
    return {
      recentSidebar: null
    };
  },
  computed: {
    ...mapState(["recentlyViewedCourses"])
  }
};
</script>

<style>
</style>