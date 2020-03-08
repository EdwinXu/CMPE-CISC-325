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
    </v-toolbar>

    <div v-for="course in filteredCourses" :key="course.id" class="my-2 mx-2">
      <CourseCard :course="course" detailed />
    </div>
  </div>
</template>

<script>
import CourseCard from "../components/courses/CourseCard";
import { mapState } from "vuex";

export default {
  name: "Search",
  components: {
    CourseCard
  },
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
      disciplinePrefixMapping: {
        Chemical: ["APSC", "CHEE", "MICR"],
        Civil: ["APSC", "CIVL"],
        Computer: ["APSC", "ELEC", "CMPE", "SOFT"],
        Electrical: ["APSC", "ELEC", "CMPE"],
        "Eng. Chem": ["APSC", "CHEE", "MICR", "ENCH"],
        "Eng. Phys": ["APSC", "ENPH"],
        Geological: ["APSC", "GEOE", "GPHY"],
        Mathematics: ["APSC", "MTHE"],
        Mechanical: ["APSC", "MECH"],
        Mining: ["APSC", "MINE", "MNTC"]
      },
      hideComplete: true,
      selectedSemester: undefined,
      selectedCourseCode: undefined,
      selected00Level: undefined,
      selectedDiscpline: undefined,
      sortDecending: true,
      selectedSortButton: 0
    };
  },
  computed: {
    ...mapState(["courses"]),
    allPrefixes() {
      return this.$store.getters.allPrefixes;
    },
    filteredCourses() {
      var filters = this.filters;
      var array = this.courses;
      const filterKeys = Object.keys(filters);
      var filteredArray = array.filter(item => {
        // validates all filter criteria
        return filterKeys.every(key => {
          // ignores non-function predicates
          if (typeof filters[key] !== "function") return true;
          return filters[key](item[key]);
        });
      });
      return filteredArray.sort(
        this.compareValues(this.sortBy, this.sortDecending)
      );
    },
    filters() {
      return {
        semester: semester =>
          semester === this.selectedSemester ||
          this.selectedSemester === undefined,
        prefix: prefix =>
          (prefix === this.selectedCourseCode ||
            this.selectedCourseCode === undefined) &&
          (this.selectedDiscpline === undefined ||
            this.disciplinePrefixMapping[this.selectedDiscpline].includes(
              prefix
            )),
        id: id =>
          this.query === "" ||
          this.query === undefined ||
          id.toLowerCase().includes(this.query.toLowerCase()),
        code: code =>
          String(code).charAt(0) === String(this.selected00Level).charAt(0) ||
          this.selected00Level === undefined,
        status: status => !(status == "completed" && this.hideComplete)
      };
    }
  },
  methods: {
    compareValues(key, sortDescending) {
      return function innerSort(a, b) {
        const auKeys = [
          "mathematics",
          "naturalSciences",
          "complementaryStudies",
          "engineeringSciences",
          "engineeringDesign"
        ];
        var varA, varB;
        if (auKeys.includes(key)) {
          varA =
            typeof a["accreditationUnits"][key] === "string"
              ? a["accreditationUnits"][key].toUpperCase()
              : a["accreditationUnits"][key];
          varB =
            typeof b["accreditationUnits"][key] === "string"
              ? b["accreditationUnits"][key].toUpperCase()
              : b["accreditationUnits"][key];
        } else {
          varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
          varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
        }
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return sortDescending ? comparison * -1 : comparison;
      };
    }
  }
};
</script>

<style>
</style>