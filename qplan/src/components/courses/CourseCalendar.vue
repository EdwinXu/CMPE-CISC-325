<template>
  <v-calendar
    type="custom-daily"
    :short-weekdays="false"
    start="2029-01-01"
    end="2029-01-05"
    first-interval="8"
    interval-minutes="60"
    interval-count="13"
    now="2001-01-01 01:01:01"
    :event-color="calendarEventColor"
    :events="calendarEvents"
    :day-format="calendarDateFormat"
  />
</template>

<script>
export default {
  name: "CourseCalendar",
  props: {
    course: Object
  },
  methods: {
    calendarEventColor: function(event) {
      if (this.course !== undefined) {
        if (event.name === this.course.courseCode + " " + this.course.name) {
          return "blue darken-3";
        }
      }
      return "blue lighten-3";
    },
    calendarDateFormat() {
      return "";
    }
  },
  computed: {
    calendarEvents() {
      var coursesInProgress = this.$store.getters.coursesInProgress;
      if (
        this.course !== undefined &&
        coursesInProgress.indexOf(this.course) === -1
      ) {
        coursesInProgress.push(this.course);
      }

      var events = [];
      var i, j, course, times;
      for (i in coursesInProgress) {
        course = coursesInProgress[i];
        for (j in course.schedule) {
          times = course.schedule[j];
          events.push({
            name: course.courseCode + " " + course.name,
            start: times[0],
            end: times[1]
          });
        }
      }
      return events;
    }
  }
};
</script>

<style>
</style>