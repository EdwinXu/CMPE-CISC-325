<template>
  <div>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="headline">Completed Courses</v-expansion-panel-header>
        <CourseList :courses="coursesCompleted" />
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="headline">Completed Courses</v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="headline">Completed Courses</v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import CourseList from "../components/courses/CourseList";
  import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    CourseList
  },
  computed: {
    ...mapGetters([
      "coursesCompleted"
    ])
  }
};
</script>
