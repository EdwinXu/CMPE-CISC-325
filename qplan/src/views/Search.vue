<template>
  <div class="elevation-4 mx-2">
    <v-row dense>
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
    </v-chip-group>
    SHOW COURSES HERE
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
      selectedDiscpline: undefined
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