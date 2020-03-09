<template>
  <div>
    <v-dialog width="1000">
      <template v-slot:activator="{ on } ">
        <v-card color="grey lighten-4" flat v-on="on" hover v-on:click="addRecent(course)">
          <v-toolbar dense extension-height="20" style="background-color: #f5f5f5">
            <v-toolbar-title class="d-inline-block text-truncate subtitle-1">
              <b>{{ course.courseCode }} - {{ course.name }}</b>
              <span v-if="detailed" class="ml-1">({{ course.semester }})</span>
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom nudge-bottom="-6" open-delay="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  small
                  v-on:click="toggleStatus(course, 'completed');"
                  v-on:click.stop
                  v-on="on"
                >
                  <div v-if="course.status == 'completed'">
                    <v-icon>mdi-check-circle</v-icon>
                  </div>
                  <div v-else>
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </div>
                </v-btn>
              </template>
              <span>Completed</span>
            </v-tooltip>

            <v-tooltip bottom nudge-bottom="-6" open-delay="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  small
                  v-on:click="toggleStatus(course, 'inProgress');"
                  v-on:click.stop
                  v-on="on"
                >
                  <div v-if="course.status == 'inProgress'">
                    <v-icon>mdi-timer-sand-full</v-icon>
                  </div>
                  <div v-else>
                    <v-icon>mdi-timer-sand-empty</v-icon>
                  </div>
                </v-btn>
              </template>
              <span>Currently Taking</span>
            </v-tooltip>

            <v-tooltip bottom nudge-bottom="-6" open-delay="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  small
                  v-on:click="toggleStatus(course, 'saved');"
                  v-on:click.stop
                  v-on="on"
                >
                  <div v-if="course.status == 'saved'">
                    <v-icon>mdi-bookmark</v-icon>
                  </div>
                  <div v-else>
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </div>
                </v-btn>
              </template>
              <span>Saved</span>
            </v-tooltip>
            <template v-if="detailed" #extension>
              <v-subheader class="ml-n4 mt-n5">
                {{ course.credits }} Credits |
                Lec:{{ course.lecture }}h -
                {{ (course.tutorial) ? " Y " : " N " }}Tut.
                {{ (course.lab) ? " Y " : " N " }}Lab |
                Math: {{ course.accreditationUnits.mathematics }}
                NS: {{ course.accreditationUnits.naturalSciences }}
                CS: {{ course.accreditationUnits.complementaryStudies }}
                ES: {{ course.accreditationUnits.engineeringSciences }}
                ED: {{ course.accreditationUnits.engineeringDesign }}
              </v-subheader>
            </template>
          </v-toolbar>
        </v-card>
      </template>
      <v-card>
        <v-card-title class="mb-n3">
          <b class="mr-1">{{ course.courseCode }} - {{ course.name }}</b>
          ({{ course.semester }})
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

          <v-divider vertical inset class="mb-2 mr-1" />

          <v-tooltip bottom nudge-bottom="-6" open-delay="500">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                small
                v-on:click="toggleStatus(course, 'completed');"
                v-on:click.stop
                v-on="on"
              >
                <div v-if="course.status == 'completed'">
                  <v-icon>mdi-check-circle</v-icon>
                </div>
                <div v-else>
                  <v-icon>mdi-check-circle-outline</v-icon>
                </div>
              </v-btn>
            </template>
            <span>Completed</span>
          </v-tooltip>

          <v-tooltip bottom nudge-bottom="-6" open-delay="500">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                small
                v-on:click="toggleStatus(course, 'inProgress');"
                v-on:click.stop
                v-on="on"
              >
                <div v-if="course.status == 'inProgress'">
                  <v-icon>mdi-timer-sand-full</v-icon>
                </div>
                <div v-else>
                  <v-icon>mdi-timer-sand-empty</v-icon>
                </div>
              </v-btn>
            </template>
            <span>Currently Taking</span>
          </v-tooltip>

          <v-tooltip bottom nudge-bottom="-6" open-delay="500">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                small
                v-on:click="toggleStatus(course, 'saved');"
                v-on:click.stop
                v-on="on"
              >
                <div v-if="course.status == 'saved'">
                  <v-icon>mdi-bookmark</v-icon>
                </div>
                <div v-else>
                  <v-icon>mdi-bookmark-outline</v-icon>
                </div>
              </v-btn>
            </template>
            <span>Saved</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{ course.credits }} Credits |
          Lec:{{ course.lecture }}h -
          {{ (course.tutorial) ? " Yes " : " No " }}Tut.
          {{ (course.lab) ? " Yes " : " No " }}Lab |
          Math: {{ course.accreditationUnits.mathematics }}
          NS: {{ course.accreditationUnits.naturalSciences }}
          CS: {{ course.accreditationUnits.complementaryStudies }}
          ES: {{ course.accreditationUnits.engineeringSciences }}
          ED: {{ course.accreditationUnits.engineeringDesign }}
        </v-card-text>

        <v-card-text>{{ course.description }}</v-card-text>
        <v-card-text>Professor: {{ course.professor }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import CourseCalendar from "@/components/courses/CourseCalendar";
import { mapState } from "vuex";

export default {
  name: "CourseCard",
  data: () => ({
    alertColor: "amber accent-4",
    chosenSemester: undefined
  }),
  components: {
    CourseCalendar
  },
  props: {
    course: Object,
    detailed: Boolean
  },
  methods: {
    toggleStatus: function(course, status) {
      this.$store.commit("toggleStatus", [course.id, status]);
      this.$store.commit("addRecentlyViewed", course);
    },
    addRecent: function(course) {
      this.$store.commit("addRecentlyViewed", course);
    }
  },
  computed: {
    ...mapState(["labelNames", "semesterMapping"])
  }
};
</script>