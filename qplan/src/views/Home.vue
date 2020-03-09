<template>
  <div>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="headline">Completed Courses</v-expansion-panel-header>
        <CourseList :courses="coursesCompleted" />
      </v-expansion-panel>
      <v-expansion-panel>
        <CourseListsHome
                list="Current Courses"
                :fall="coursesSemesterStatus('Fall', 'inProgress')"
                :winter="coursesSemesterStatus('Winter', 'inProgress')"
                :year="coursesSemesterStatus('Fall/Winter', 'inProgress')"
                :summer="coursesSemesterStatus('Summer', 'inProgress')"
        />
      </v-expansion-panel>
      <v-expansion-panel>
        <CourseListsHome
                list="Saved For Later"
                :fall="coursesSemesterStatus('Fall', 'saved')"
                :winter="coursesSemesterStatus('Winter', 'saved')"
                :year="coursesSemesterStatus('Fall/Winter', 'saved')"
                :summer="coursesSemesterStatus('Summer', 'saved')"
        />
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import CourseList from "../components/courses/CourseList";
  import CourseListsHome from "../components/courses/CourseListsHome";
  import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      panel: [1,2]
    };
  },
  components: {
    CourseList,
    CourseListsHome
  },
  computed: {
    ...mapGetters([
      "coursesCompleted",
      "coursesSemesterStatus"
    ])
  }
};
</script>
