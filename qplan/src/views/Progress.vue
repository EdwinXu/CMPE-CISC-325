<template>
  <div>
    <v-expansion-panels class="mt-1">
      <v-expansion-panel>
        <CourseListsProgress
          list="Total Credits"
          :completed="coursesCompleted"
          :inProgress="coursesInProgress"
          :saved="coursesSaved"
          :properties="['credits']"
          :progressRequirement="{ name: 'Total Credits', value: creditRequirements, type: 'Credits' }"
          searchSort="credits"
        />
      </v-expansion-panel>
    </v-expansion-panels>

    <v-toolbar dense class="mt-2 mb-n1">
      <v-spacer />
      <v-toolbar-title>Accreditation Units (AUs)</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="requirement in auBaseRequirements" :key="requirement.name">
        <CourseListsProgress
          :list="requirement.name.substring(0, requirement.name.indexOf('('))"
          :completed="statusTypeProperties('completed', 'accreditationUnits', requirement.aus)"
          :inProgress="statusTypeProperties('inProgress', 'accreditationUnits', requirement.aus)"
          :saved="statusTypeProperties('saved', 'accreditationUnits', requirement.aus)"
          :properties="requirement.aus"
          propertyType="accreditationUnits"
          :progressRequirement="requirement"
          :searchSort="requirement.aus[0]"
        />
      </v-expansion-panel>
    </v-expansion-panels>

    <v-toolbar dense class="mt-2 mb-n1">
      <v-spacer />
      <v-toolbar-title>Additional Requirements</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="requirement in additionalRequirements"
        v-bind:key="requirement.name"
      >
        <CourseListsProgress
          :list="requirement.name"
          :completed="statusTypeProperties('completed', 'labels', requirement.labels)"
          :inProgress="statusTypeProperties('inProgress', 'labels', requirement.labels)"
          :saved="statusTypeProperties('saved', 'labels', requirement.labels)"
          :properties="requirement.labels"
          propertyType="labels"
          :progressRequirement="requirement"
          :searchLabels="requirement.labels.map(label => labelNames[label])"
        />
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import CourseListsProgress from "./../components/courses/CourseListsProgress.vue";

export default {
  name: "Progress",
  components: {
    CourseListsProgress
  },
  computed: {
    ...mapState(["graduationRequirements", "labelNames"]),
    ...mapGetters(["coursesCompleted", "coursesInProgress", "coursesSaved"]),
    auBaseRequirements: function() {
      return this.graduationRequirements["auBaseRequirements"];
    },
    additionalRequirements: function() {
      return this.graduationRequirements["additionalRequirements"];
    },
    creditRequirements: function() {
      return this.graduationRequirements["totalCredits"];
    }
  },
  methods: {
    statusTypeProperties: function(status, type, properties) {
      var courses, i, property;
      if (status === "completed") {
        courses = this.coursesCompleted;
      } else if (status === "inProgress") {
        courses = this.coursesInProgress;
      } else {
        courses = this.coursesSaved;
      }
      return courses.filter(function(course) {
        for (i in properties) {
          property = properties[i];
          if (course[type][property] != 0) {
            return true;
          }
        }
      });
    }
  }
};
</script>

<style>
</style>