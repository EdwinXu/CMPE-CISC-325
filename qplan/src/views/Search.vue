<template>
  <div class="elevation-4 mx-2">
    <v-row dense class="mb-n6 mt-n2">
      <v-col>
        <v-overflow-btn
          v-model="selectedSemester"
          :items="semesterOptions"
          clearable
          label="Semester"
        ></v-overflow-btn>
      </v-col>
      <v-col>
        <v-overflow-btn
          v-model="selectedCourseCode"
          :items="allPrefixes"
          clearable
          label="Course Prefix"
        ></v-overflow-btn>
      </v-col>
      <v-col>
        <v-overflow-btn v-model="selected00Level" :items="all00Levels" clearable label="00's Level"></v-overflow-btn>
      </v-col>
      <v-col>
        <v-overflow-btn
          v-model="selectedDiscpline"
          :items="validDisciplines"
          clearable
          label="Discipline"
        ></v-overflow-btn>
      </v-col>
    </v-row>
    <v-chip-group show-arrows class="mb-n1 pl-2">
      <v-chip
        v-if="selectedSemester != undefined"
        close
        @click:close="selectedSemester = undefined"
      >Semester: {{ selectedSemester }}</v-chip>
      <v-chip
        v-if="selectedCourseCode != undefined"
        close
        @click:close="selectedCourseCode = undefined"
      >Prefix: {{ selectedCourseCode }}</v-chip>
      <v-chip
        v-if="selected00Level != undefined"
        close
        @click:close="selected00Level = undefined"
      >00's Level: {{ selected00Level }}</v-chip>
      <v-chip
        v-if="selectedDiscpline != undefined"
        close
        @click:close="selectedDiscpline = undefined"
      >Discipline: {{ selectedDiscpline }}</v-chip>
      <v-chip
        v-for="(filter, index) in chipFilters"
        :key="filter"
        close
        @click:close="removeAdditionalFilter(index)"
      >{{ filter }}</v-chip>
      <v-spacer />
      <v-switch v-model="hideComplete" label="Hide Completed" class="mt-1 mb-n4 mr-2"></v-switch>
    </v-chip-group>

    <v-toolbar dense color="grey lighten-5">
      <v-spacer />
      <span class="body-2 font-italic font-weight-bold">SORT</span>:
      <v-btn-toggle v-model="selectedSortButton" mandatory dense group tile color="primary">
        <v-btn>Prefix</v-btn>
        <v-btn>Name</v-btn>
        <v-btn>Credits</v-btn>
        <v-btn>Math</v-btn>
        <v-btn>NS</v-btn>
        <v-btn>CS</v-btn>
        <v-btn>ES</v-btn>
        <v-btn>ED</v-btn>
      </v-btn-toggle>
      <v-divider vertical inset></v-divider>
      <div class="pl-1">
        <v-btn text max-width="39" min-width="39">
          <v-icon @click="sortDecending = false" v-if="sortDecending">mdi-sort-descending</v-icon>
          <v-icon @click="sortDecending = true" v-else>mdi-sort-ascending</v-icon>
        </v-btn>
      </div>
    </v-toolbar>SHOW COURSES HERE
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      semesterOptions: ["Fall/Winter", "Fall", "Winter", "Summer"],
      all00Levels: ["100", "200", "300", "400"],
      validDisciplines: [
        "Chemical",
        "Civil",
        "Computer",
        "Electrical",
        "Eng. Chem",
        "Eng. Phys",
        "Geological",
        "Mathematics",
        "Mechanical",
        "Mining"
      ],
      hideComplete: true,
      selectedSemester: undefined,
      selectedCourseCode: undefined,
      selected00Level: undefined,
      selectedDiscpline: undefined,
      sortDecending: true,
      selectedSortButton: 0,
    };
  },
  computed: {
    ...mapState(["courses"]),
    allPrefixes() {
      return this.$store.getters.allPrefixes;
    }
  }
};
</script>

<style>
</style>