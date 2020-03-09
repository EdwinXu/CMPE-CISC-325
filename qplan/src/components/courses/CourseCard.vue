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

            <v-btn icon small v-on:click="toggleStatus(course, 'saved');" v-on:click.stop v-on="on">
              <div v-if="course.status == 'saved'">
                <v-icon>mdi-bookmark</v-icon>
              </div>
              <div v-else>
                <v-icon>mdi-bookmark-outline</v-icon>
              </div>
            </v-btn>

            <template v-if="detailed" #extension>
              <v-subheader class="ml-n4">
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

          <v-btn icon v-on="{ ...tooltip, ...dialog }">
            <v-icon :color="(calendarConflict[0]) ? alertColor : ''">mdi-calendar</v-icon>
          </v-btn>

          <v-divider vertical inset class="mb-2 mr-1" />

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

          <v-btn icon small v-on:click="toggleStatus(course, 'saved');" v-on:click.stop v-on="on">
            <div v-if="course.status == 'saved'">
              <v-icon>mdi-bookmark</v-icon>
            </div>
            <div v-else>
              <v-icon>mdi-bookmark-outline</v-icon>
            </div>
          </v-btn>
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
export default {
  name: "CourseCard",
  props: {
    course: Object
  },
  methods: {
    addRecent: function(course) {
      this.$store.commit("addRecentlyViewed", course);
    }
  }
};
</script>